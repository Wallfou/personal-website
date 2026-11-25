/**
 * A tiny ASCII 3D renderer. Shapes are clouds of surface points (each with a
 * normal). Every frame the points are rotated, projected onto a character
 * grid with a depth buffer, and shaded by how directly they face a fixed
 * light: brighter surfaces get denser characters.
 */

export type Mat3 = readonly number[]; // 3x3, row-major
type Vec3 = [number, number, number];
type Emit = (x: number, y: number, z: number, nx: number, ny: number, nz: number) => void;

const SHADES = ".,-~:;=!*#$@";
const CAMERA_DISTANCE = 3.2;

function normalize([x, y, z]: Vec3): Vec3 {
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// up and to the left, slightly toward the viewer
const LIGHT = normalize([-0.35, 0.7, -0.62]);

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

function collect(fill: (emit: Emit) => void): Float32Array {
  const out: number[] = [];
  fill((x, y, z, nx, ny, nz) => out.push(x, y, z, nx, ny, nz));
  return new Float32Array(out);
}

/** Samples a parametric surface over u in [0, 1] and v in [0, vMax]. */
function surface(
  emit: Emit,
  f: (u: number, v: number) => Vec3,
  uSteps: number,
  vSteps: number,
  vMax: number,
) {
  const e = 1e-3;
  for (let i = 0; i <= uSteps; i++) {
    const u = i / uSteps;
    for (let j = 0; j <= vSteps; j++) {
      const v = (vMax * j) / vSteps;
      const p = f(u, v);
      const pu = f(u + e, v);
      const pv = f(u, v + e);
      const n = normalize(
        cross([pu[0] - p[0], pu[1] - p[1], pu[2] - p[2]], [pv[0] - p[0], pv[1] - p[1], pv[2] - p[2]]),
      );
      emit(p[0], p[1], p[2], n[0], n[1], n[2]);
    }
  }
}

/** Samples the six faces of an axis-aligned box. */
function box(emit: Emit, center: Vec3, half: Vec3, step: number) {
  for (let axis = 0; axis < 3; axis++) {
    for (const sign of [-1, 1]) {
      const u = (axis + 1) % 3;
      const v = (axis + 2) % 3;
      const uSteps = Math.max(1, Math.ceil((2 * half[u]) / step));
      const vSteps = Math.max(1, Math.ceil((2 * half[v]) / step));
      for (let i = 0; i <= uSteps; i++) {
        for (let j = 0; j <= vSteps; j++) {
          const p: Vec3 = [center[0], center[1], center[2]];
          const n: Vec3 = [0, 0, 0];
          p[axis] += sign * half[axis];
          n[axis] = sign;
          p[u] += -half[u] + (2 * half[u] * i) / uSteps;
          p[v] += -half[v] + (2 * half[v] * j) / vSteps;
          emit(p[0], p[1], p[2], n[0], n[1], n[2]);
        }
      }
    }
  }
}

/**
 * A small airplane seen from above: nose points along +x, wings span y,
 * and the tail fin rises toward the viewer (-z).
 */
export function buildPlane(): Float32Array {
  return collect((emit) => {
    // fuselage: a tube that tapers to a point at both ends, fuller toward the nose
    surface(
      emit,
      (u, v) => {
        const r = 0.13 * Math.pow(Math.max(0, Math.sin(Math.PI * u)), 0.45) * (0.6 + 0.4 * u);
        return [-0.95 + 1.9 * u, r * Math.cos(v), r * Math.sin(v)];
      },
      120,
      22,
      Math.PI * 2,
    );
    box(emit, [0.05, 0, 0], [0.17, 1, 0.025], 0.03); // main wings
    box(emit, [-0.8, 0, 0], [0.1, 0.36, 0.02], 0.03); // tailplane
    box(emit, [-0.82, 0, -0.15], [0.1, 0.02, 0.15], 0.03); // tail fin
  });
}

/** A character grid with a depth buffer that shapes are drawn into. */
export class AsciiCanvas {
  readonly cols: number;
  readonly rows: number;
  private readonly kx: number;
  private readonly ky: number;
  private readonly depth: Float32Array;
  private readonly cells: Uint8Array;
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
    this.depth = new Float32Array(cols * rows);
    this.cells = new Uint8Array(cols * rows);
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
    this.cells.fill(32);
  }

  /** Draws a point cloud rotated by `m`, scaled, then moved to (ox, oy). */
  draw(points: Float32Array, m: Mat3, ox: number, oy: number, scale: number) {
    const [m0, m1, m2, m3, m4, m5, m6, m7, m8] = m;
    for (let i = 0; i < points.length; i += 6) {
      const x = points[i] * scale;
      const y = points[i + 1] * scale;
      const z = points[i + 2] * scale;
      const X = m0 * x + m1 * y + m2 * z + ox;
      const Y = m3 * x + m4 * y + m5 * z + oy;
      const Z = m6 * x + m7 * y + m8 * z + CAMERA_DISTANCE;
      if (Z < 0.3) continue;

      const d = 1 / Z;
      const col = Math.floor(this.cols / 2 + this.kx * d * X);
      const row = Math.floor(this.rows / 2 - this.ky * d * Y);
      if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) continue;
      const k = row * this.cols + col;
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
      const light = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
      this.depth[k] = d;
      this.cells[k] = light > 0 ? SHADES.charCodeAt(Math.min(11, Math.floor(light * 12))) : 46;
    }
  }

  /** Puts a single character at (x, y), behind anything already drawn there. */
  mark(x: number, y: number, ch: string) {
    const d = 1 / (CAMERA_DISTANCE + 0.25);
    const col = Math.floor(this.cols / 2 + this.kx * d * x);
    const row = Math.floor(this.rows / 2 - this.ky * d * y);
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return;
    const k = row * this.cols + col;
    if (d <= this.depth[k]) return;
    this.depth[k] = d;
    this.cells[k] = ch.charCodeAt(0);
  }

  toString() {
    const lines: string[] = [];
    for (let r = 0; r < this.rows; r++) {
      lines.push(this.decoder.decode(this.cells.subarray(r * this.cols, (r + 1) * this.cols)));
    }
    return lines.join("\n");
  }
}
