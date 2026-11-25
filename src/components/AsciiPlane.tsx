"use client";

import { useEffect, useRef } from "react";
import { AsciiCanvas, buildPlane, multiply, rotateX, rotateZ, transform } from "@/lib/ascii3d";

// projection scale per row of the grid. Tying it to the row count keeps the
// scene the same size in world units whatever the box measures, so the plane
// scales with the box and its turns stay the same sharpness.
const SCALE_PER_ROW = 1.3;
// the plane spans 2 units nose to tail and wingtip to wingtip before scaling
const PLANE_SCALE = 0.46;
// world units per second; a full figure eight takes about 15 seconds
const SPEED = 0.85;
// the figure eight can be at most this many times wider than it is tall; any
// longer and the ends of its loops become hairpin turns
const MAX_PATH_ASPECT = 4.5;
// how hard the plane rolls into a turn, and the most it will ever roll
const BANK = 0.3;
const MAX_BANK = 0.75; // ~43 degrees
// the camera looks down on the flight path at a slight angle, so the
// fuselage and tail fin read as 3D rather than a flat top-down outline
const VIEW = rotateX(0.45);
// that tilt puts the lower half of the path, and a banked plane's lower
// wingtip, nearer the camera, so they draw up to ~20% larger
const PERSPECTIVE = 1.2;
const TRAIL_LENGTH = 50;
const FRAME_MS = 1000 / 30;
const TAU = Math.PI * 2;
// the tallest point of a unit lemniscate, used to normalize its height
const LEMNISCATE_PEAK = Math.SQRT2 / 4;

/**
 * A point on a horizontal figure eight (lemniscate of Bernoulli) that spans
 * +-a across and +-b up and down. One pass of t over [0, 2pi) goes
 * counterclockwise around the right loop and clockwise around the left.
 */
function figureEight(t: number, a: number, b: number): [number, number] {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return [(a * c) / d, (b * s * c) / (d * LEMNISCATE_PEAK)];
}

type Flight = {
  t: number; // where along the figure eight the plane is
  heading: number;
  bank: number;
  trail: Array<[number, number]>;
};

/**
 * An ASCII airplane that flies a figure eight filling this element, banking
 * into each loop, rolling level through the crossing, and leaving a dotted
 * trail. The scene scales with the element's height, so a bigger element
 * means a bigger plane.
 */
export default function AsciiPlane({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = ref.current;
    if (!pre) return;

    const plane = buildPlane();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let canvas: AsciiCanvas | null = null;
    let flight: Flight | null = null;

    // the figure eight's size, inset so a wingtip never leaves the grid
    const pathSize = (c: AsciiCanvas) => {
      const margin = PLANE_SCALE + 0.12;
      const b = Math.max(0.3, (c.halfHeight - margin) / PERSPECTIVE);
      const a = Math.min(Math.max(0.3, (c.halfWidth - margin) / PERSPECTIVE), b * MAX_PATH_ASPECT);
      return { a, b };
    };

    const positionAt = (t: number): [number, number] => {
      const { a, b } = pathSize(canvas!);
      return figureEight(t, a, b);
    };

    const headingAt = (t: number) => {
      const [x0, y0] = positionAt(t);
      const [x1, y1] = positionAt(t + 1e-3);
      return Math.atan2(y1 - y0, x1 - x0);
    };

    const resize = () => {
      const probe = document.createElement("span");
      probe.textContent = "M".repeat(20);
      pre.replaceChildren(probe);
      const charWidth = probe.getBoundingClientRect().width / 20;
      const lineHeight = parseFloat(getComputedStyle(pre).lineHeight);
      pre.replaceChildren();

      const cols = Math.floor(pre.clientWidth / charWidth);
      const rows = Math.floor(pre.clientHeight / lineHeight);
      if (!charWidth || cols < 20 || rows < 8) {
        canvas = null;
        return;
      }
      const ky = rows * SCALE_PER_ROW;
      canvas = new AsciiCanvas(cols, rows, ky, (ky * lineHeight) / charWidth);
      if (!flight) {
        // start at the right end of the eight; a still frame (for reduced
        // motion) is shown a little way into the right loop instead
        const t = reduceMotion ? 0.35 : 0;
        flight = { t, heading: headingAt(t), bank: 0, trail: [] };
      }
    };

    const step = (dt: number) => {
      if (!canvas || !flight) return;
      const f = flight;

      // advance along the curve at a steady speed, whatever its local stretch
      const [x0, y0] = positionAt(f.t);
      const [x1, y1] = positionAt(f.t + 1e-3);
      const unitsPerT = Math.hypot(x1 - x0, y1 - y0) / 1e-3;
      f.t = (f.t + (SPEED * dt) / unitsPerT) % TAU;

      // bank in proportion to how fast the heading is swinging round
      const heading = headingAt(f.t);
      let turn = heading - f.heading;
      turn = Math.atan2(Math.sin(turn), Math.cos(turn)) / dt;
      f.heading = heading;
      const targetBank = Math.max(-MAX_BANK, Math.min(MAX_BANK, -turn * BANK));
      f.bank += (targetBank - f.bank) * Math.min(1, dt * 5);

      // the trail starts at the tail
      const [x, y] = positionAt(f.t);
      const tail = PLANE_SCALE * 0.9;
      f.trail.push([x - Math.cos(heading) * tail, y - Math.sin(heading) * tail]);
      if (f.trail.length > TRAIL_LENGTH) f.trail.shift();
    };

    const render = () => {
      if (!canvas || !flight) {
        pre.textContent = "";
        return;
      }
      const f = flight;
      canvas.clear();
      const attitude = multiply(VIEW, multiply(rotateZ(f.heading), rotateX(f.bank)));
      const [x, y] = positionAt(f.t);
      canvas.draw(plane, attitude, transform(VIEW, [x, y, 0]), PLANE_SCALE);
      // every other trail point, skipping the few hidden under the tail
      f.trail.forEach(([x, y], i) => {
        if (i < f.trail.length - 3 && i % 2 === 0) canvas!.mark(transform(VIEW, [x, y, 0]), ".");
      });
      pre.textContent = canvas.toString();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render();
    });
    resizeObserver.observe(pre);

    // visitors who ask for less motion get a single still frame
    if (reduceMotion) return () => resizeObserver.disconnect();

    // pause while the hero is scrolled out of view
    let visible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(pre);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const elapsed = now - last;
      if (!visible) {
        last = now;
        return;
      }
      if (elapsed < FRAME_MS) return;
      last = now;
      const dt = Math.min(0.1, elapsed / 1000);
      step(dt);
      render();
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={`select-none overflow-hidden whitespace-pre font-mono text-[8px] leading-[9px] text-[#2a2a2a] ${className}`}
    />
  );
}
