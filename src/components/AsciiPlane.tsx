"use client";

import { useEffect, useRef } from "react";
import { AsciiCanvas, buildPlane, multiply, rotateX, rotateZ } from "@/lib/ascii3d";

// projection scale per row of the grid. Tying it to the row count keeps the
// scene the same size in world units whatever the box measures, so the plane
// scales with the box and its turning circle always fits the oval.
const SCALE_PER_ROW = 1.3;
// the plane spans 2 units nose to tail and wingtip to wingtip before scaling
const PLANE_SCALE = 0.42;
// world units per second; a lap takes about 9 seconds
const SPEED = 0.85;
// the plane swings up to ~17% wide of the oval through the curves
const OVERSHOOT = 1.2;
// how hard the plane rolls into a turn; ~0.3 tops out near 35 degrees
const BANK = 0.3;
// how far ahead along the oval (in radians) the plane aims
const LEAD = 0.5;
const TRAIL_LENGTH = 50;
const FRAME_MS = 1000 / 30;

type Flight = {
  x: number;
  y: number;
  heading: number;
  bank: number;
  trail: Array<[number, number]>;
};

/**
 * An ASCII airplane that flies laps around an invisible oval filling this
 * element, banking into the curves and leaving a dotted trail.
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
    let time = 0;

    // the oval the plane laps, inset so a wingtip never leaves the grid even
    // at the widest point of a turn
    const oval = (c: AsciiCanvas) => {
      const margin = PLANE_SCALE + 0.05;
      return {
        rx: Math.max(0.3, (c.halfWidth - margin) / OVERSHOOT),
        ry: Math.max(0.3, (c.halfHeight - margin) / OVERSHOOT),
      };
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
        // start on the right edge, heading up, so it laps counterclockwise
        flight = { x: oval(canvas).rx, y: 0, heading: Math.PI / 2, bank: 0, trail: [] };
      }
    };

    const step = (dt: number) => {
      if (!canvas || !flight) return;
      const { rx, ry } = oval(canvas);
      const f = flight;

      // aim at a point a little further around the oval, breathing in and out
      // slightly so the laps don't look mechanical
      const angle = Math.atan2(f.y / ry, f.x / rx) + LEAD;
      const breathe = 1 + 0.06 * Math.sin(time * 0.7);
      const tx = rx * breathe * Math.cos(angle);
      const ty = ry * breathe * Math.sin(angle);

      let delta = Math.atan2(ty - f.y, tx - f.x) - f.heading;
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      const turn = Math.max(-2.4, Math.min(2.4, delta * 3));

      f.heading += turn * dt;
      f.x += Math.cos(f.heading) * SPEED * dt;
      f.y += Math.sin(f.heading) * SPEED * dt;
      f.bank += (-turn * BANK - f.bank) * Math.min(1, dt * 5);

      // the trail starts at the tail
      const tail = PLANE_SCALE * 0.9;
      f.trail.push([f.x - Math.cos(f.heading) * tail, f.y - Math.sin(f.heading) * tail]);
      if (f.trail.length > TRAIL_LENGTH) f.trail.shift();
    };

    const render = () => {
      if (!canvas || !flight) {
        pre.textContent = "";
        return;
      }
      const f = flight;
      canvas.clear();
      canvas.draw(plane, multiply(rotateZ(f.heading), rotateX(f.bank)), f.x, f.y, PLANE_SCALE);
      // every other trail point, skipping the few hidden under the tail
      f.trail.forEach(([x, y], i) => {
        if (i < f.trail.length - 3 && i % 2 === 0) canvas!.mark(x, y, ".");
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
      time += dt;
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
      className={`select-none overflow-hidden whitespace-pre font-mono text-[11px] leading-[13px] text-[#3a3a3a] ${className}`}
    />
  );
}
