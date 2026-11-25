/**
 * A tiny ASCII 3D renderer. Shapes are clouds of surface points, each with a
 * normal and an albedo (how much light the surface reflects). Every frame the
 * points are rotated and projected onto a character grid with a depth buffer.
 *
 * Each character cell is sampled as a small grid of sub-cells, so edges that
 * only partly cover a cell come out as lighter characters (anti-aliasing).
 * Shading is "ink on paper": the page is white and characters are dark, so
 * shadowed surfaces get dense characters and lit ones get sparse ones.
 */

export type Mat3 = readonly number[]; // 3x3, row-major
type Vec3 = [number, number, number];
type Emit = (x: number, y: number, z: number, nx: number, ny: number, nz: number, albedo?: number) => void;

/** Characters ordered from least to most ink. */
const INK = ".,:;-~=+*ox#%@";
const CAMERA_DISTANCE = 3.2;
// sub-cells per character: 2 across, 4 down, which makes them roughly square
const SUB_X = 2;
const SUB_Y = 4;
const STRIDE = 7;
const AMBIENT = 0.12;
// even a fully lit surface leaves a faint mark, so the silhouette never vanishes
const MIN_INK = 0.18;
// below 1, deepens the midtones so small type doesn't read as a pale smudge
const INK_GAMMA = 0.75;

function normalize([x, y, z]: Vec3): Vec3 {
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// up and to the left, toward the viewer
const LIGHT = normalize([-0.5, 0.6, -0.62]);

export function rotateX(a: number): Mat3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [1, 0, 0, 0, c, -s, 0, s, c];
}

export function rotateZ(a: number): Mat3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

export function multiply(a: Mat3, b: Mat3): Mat3 {
  const out: number[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out.push(a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j]);
    }
  }
  return out;
}

export function transform(m: Mat3, [x, y, z]: Vec3): Vec3 {
  return [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z,
  ];
}

function collect(fill: (emit: Emit) => void): Float32Array {
  const out: number[] = [];
  fill((x, y, z, nx, ny, nz, albedo = 1) => out.push(x, y, z, nx, ny, nz, albedo));
  return new Float32Array(out);
}

/** Samples a parametric surface over u, v in [0, 1], deriving normals numerically. */
function surface(
  emit: Emit,
  f: (u: number, v: number) => Vec3,
  uSteps: number,
  vSteps: number,
  albedo: (p: Vec3, n: Vec3) => number = () => 1,
) {
  const e = 1e-4;
  for (let i = 0; i <= uSteps; i++) {
    const u = i / uSteps;
    for (let j = 0; j <= vSteps; j++) {
      const v = j / vSteps;
      const p = f(u, v);
      const pu = f(Math.min(1, u + e), v);
      const pv = f(u, Math.min(1, v + e));
      const du = u + e > 1 ? -1 : 1;
      const dv = v + e > 1 ? -1 : 1;
      const n = normalize(
        cross(
          [(pu[0] - p[0]) * du, (pu[1] - p[1]) * du, (pu[2] - p[2]) * du],
          [(pv[0] - p[0]) * dv, (pv[1] - p[1]) * dv, (pv[2] - p[2]) * dv],
        ),
      );
      emit(p[0], p[1], p[2], n[0], n[1], n[2], albedo(p, n));
    }
  }
}

type Planform = {
  rootLead: number; // x of the leading edge where the surface meets the body
  rootTrail: number;
  tipLead: number; // x of the leading edge at the tip
  tipTrail: number;
  span: number; // distance from root to tip
  rootThickness: number;
  tipThickness: number;
};

/**
 * Samples a tapered, swept lifting surface (wing, tailplane, or fin) with an
 * airfoil cross-section: rounded on top, flatter underneath. `place` maps
 * (chordwise x, spanwise distance, thickness offset) into model space.
 */
function airfoil(
  emit: Emit,
  w: Planform,
  place: (x: number, s: number, t: number) => Vec3,
  chordSteps: number,
  spanSteps: number,
) {
  for (const side of [-1, 1]) {
    surface(
      emit,
      (u, v) => {
        const lead = lerp(w.rootLead, w.tipLead, v);
        const trail = lerp(w.rootTrail, w.tipTrail, v);
        const bulge = Math.pow(Math.sin(Math.PI * u), 0.6) * lerp(w.rootThickness, w.tipThickness, v);
        return place(lerp(lead, trail, u), v * w.span, side < 0 ? -bulge : bulge * 0.35);
      },
      chordSteps,
      spanSteps,
    );
  }
}

/**
 * A small airliner. Nose points along +x, wings span y, and "up" (the top of
 * the plane, where the tail fin rises) is -z, toward the viewer.
 */
export function buildPlane(): Float32Array {
  return collect((emit) => {
    // fuselage: rounded nose, straight cabin, tail cone sweeping up to the fin
    surface(
      emit,
      (u, v) => {
        const x = -1 + 2 * u;
        let r = 0.115;
        let lift = 0;
        if (x > 0.55) {
          const t = (x - 0.55) / 0.45;
          r *= Math.sqrt(Math.max(0, 1 - t * t));
        } else if (x < -0.35) {
          const t = (-0.35 - x) / 0.65;
          r *= 1 - 0.78 * t;
          lift = -0.05 * t;
        }
        const a = v * Math.PI * 2;
        return [x, r * Math.cos(a), lift + r * Math.sin(a)];
      },
      110,
      36,
      // dark windshield across the top of the nose
      ([x, y], n) => (x > 0.62 && x < 0.8 && n[2] < -0.3 && Math.abs(y) < 0.09 ? 0.45 : 1),
    );

    // main wings: swept back, tapering, with a little dihedral toward the tips
    for (const side of [-1, 1]) {
      airfoil(
        emit,
        { rootLead: 0.25, rootTrail: -0.2, tipLead: -0.1, tipTrail: -0.24, span: 1, rootThickness: 0.045, tipThickness: 0.018 },
        (x, s, t) => [x, side * s, -0.06 * s + t],
        24,
        44,
      );
    }

    // tailplane, sitting on the upswept tail cone
    for (const side of [-1, 1]) {
      airfoil(
        emit,
        { rootLead: -0.66, rootTrail: -0.92, tipLead: -0.84, tipTrail: -0.95, span: 0.36, rootThickness: 0.02, tipThickness: 0.01 },
        (x, s, t) => [x, side * s, -0.04 - 0.02 * s + t],
        12,
        16,
      );
    }

    // vertical fin, rising toward the viewer
    airfoil(
      emit,
      { rootLead: -0.6, rootTrail: -0.96, tipLead: -0.86, tipTrail: -0.98, span: 0.3, rootThickness: 0.025, tipThickness: 0.012 },
      (x, s, t) => [x, t, -0.06 - s],
      14,
      14,
    );

    // engines hanging under each wing, poking out ahead of the leading edge
    for (const side of [-1, 1]) {
      surface(
        emit,
        (u, v) => {
          const x = -0.06 + 0.36 * u;
          const r = 0.055 * (x < 0.04 ? 0.7 + 0.3 * ((x + 0.06) / 0.1) : 1);
          const a = v * Math.PI * 2;
          return [x, side * 0.42 + r * Math.cos(a), 0.075 + r * Math.sin(a)];
        },
        28,
        20,
      );
    }
  });
}

/** A character grid with a sub-cell depth buffer that shapes are drawn into. */
export class AsciiCanvas {
  readonly cols: number;
  readonly rows: number;
  private readonly kx: number;
  private readonly ky: number;
  private readonly subCols: number;
  private readonly subRows: number;
  private readonly depth: Float32Array;
  private readonly ink: Float32Array;
  private readonly overlay: Uint8Array;
  private readonly line: Uint8Array;
  private readonly decoder = new TextDecoder();

  /**
   * `ky` is the projection scale in rows; `kx` is the same scale in columns,
   * corrected for characters being taller than they are wide.
   */
  constructor(cols: number, rows: number, ky: number, kx: number) {
    this.cols = cols;
    this.rows = rows;
    this.ky = ky;
    this.kx = kx;
    this.subCols = cols * SUB_X;
    this.subRows = rows * SUB_Y;
    this.depth = new Float32Array(this.subCols * this.subRows);
    this.ink = new Float32Array(this.subCols * this.subRows);
    this.overlay = new Uint8Array(cols * rows);
    this.line = new Uint8Array(cols);
  }

  /** Half the visible width at the object plane, in world units. */
  get halfWidth() {
    return ((this.cols / 2) * CAMERA_DISTANCE) / this.kx;
  }

  /** Half the visible height at the object plane, in world units. */
  get halfHeight() {
    return ((this.rows / 2) * CAMERA_DISTANCE) / this.ky;
  }

  clear() {
    this.depth.fill(0);
    this.ink.fill(0);
    this.overlay.fill(0);
  }

  /** Draws a point cloud rotated by `m`, scaled, then moved by `offset`. */
  draw(points: Float32Array, m: Mat3, offset: Vec3, scale: number) {
    const [m0, m1, m2, m3, m4, m5, m6, m7, m8] = m;
    const sx = this.kx * SUB_X;
    const sy = this.ky * SUB_Y;
    for (let i = 0; i < points.length; i += STRIDE) {
      const x = points[i] * scale;
      const y = points[i + 1] * scale;
      const z = points[i + 2] * scale;
      const X = m0 * x + m1 * y + m2 * z + offset[0];
      const Y = m3 * x + m4 * y + m5 * z + offset[1];
      const Z = m6 * x + m7 * y + m8 * z + offset[2] + CAMERA_DISTANCE;
      if (Z < 0.3) continue;

      const d = 1 / Z;
      const col = Math.floor(this.subCols / 2 + sx * d * X);
      const row = Math.floor(this.subRows / 2 - sy * d * Y);
      if (col < 0 || col >= this.subCols || row < 0 || row >= this.subRows) continue;
      const k = row * this.subCols + col;
      if (d <= this.depth[k]) continue;

      let nx = m0 * points[i + 3] + m1 * points[i + 4] + m2 * points[i + 5];
      let ny = m3 * points[i + 3] + m4 * points[i + 4] + m5 * points[i + 5];
      let nz = m6 * points[i + 3] + m7 * points[i + 4] + m8 * points[i + 5];
      // light whichever side of the surface faces the camera
      if (nx * X + ny * Y + nz * Z > 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const diffuse = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
      const shade = (AMBIENT + (1 - AMBIENT) * diffuse) * points[i + 6];
      this.depth[k] = d;
      this.ink[k] = Math.max(MIN_INK, 1 - shade);
    }
  }

  /** Puts a single character at a point, behind anything already drawn there. */
  mark([x, y, z]: Vec3, ch: string) {
    const Z = z + CAMERA_DISTANCE;
    if (Z < 0.3) return;
    const d = 1 / Z;
    const col = Math.floor(this.cols / 2 + this.kx * d * x);
    const row = Math.floor(this.rows / 2 - this.ky * d * y);
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return;
    this.overlay[row * this.cols + col] = ch.charCodeAt(0);
  }

  toString() {
    const lines: string[] = [];
    const samples = SUB_X * SUB_Y;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        // average ink over the cell's sub-cells; uncovered ones count as paper
        let sum = 0;
        for (let j = 0; j < SUB_Y; j++) {
          const base = (r * SUB_Y + j) * this.subCols + c * SUB_X;
          for (let i = 0; i < SUB_X; i++) sum += this.ink[base + i];
        }
        const value = Math.pow(sum / samples, INK_GAMMA);
        this.line[c] =
          value < 0.03
            ? this.overlay[r * this.cols + c] || 32
            : INK.charCodeAt(Math.min(INK.length - 1, Math.floor(value * INK.length)));
      }
      lines.push(this.decoder.decode(this.line));
    }
    return lines.join("\n");
  }
}
