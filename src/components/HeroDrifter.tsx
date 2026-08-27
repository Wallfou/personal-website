"use client";

import { useEffect, useRef } from "react";

const SIZE = 10;
/** clearance kept between the dot and the corner blocks */
const MARGIN = 28;
/** per-frame fraction of the remaining distance - low enough to read as drift */
const EASE = 0.018;

/**
 * A dot that wanders the empty middle of the hero and leans slowly toward the
 * cursor. Its bounds are measured from the corner blocks themselves, so the
 * layout drives the dot rather than the other way round.
 */
export default function HeroDrifter() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const section = dot?.parentElement;
    if (!dot || !section) return;

    // the dot exists to track a cursor, so it stays hidden on touch input and
    // for anyone who has asked for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let bounds: { left: number; right: number; top: number; bottom: number } | null =
      null;
    let x = 0;
    let y = 0;
    let cursor: { x: number; y: number } | null = null;
    let frame = 0;

    const measure = () => {
      const top = section.querySelector("[data-hero-top]");
      const bottom = section.querySelector("[data-hero-bottom]");
      if (!top || !bottom) return;

      const s = section.getBoundingClientRect();
      const t = top.getBoundingClientRect();
      const b = bottom.getBoundingClientRect();
      const style = getComputedStyle(section);
      const half = SIZE / 2;

      const next = {
        left: parseFloat(style.paddingLeft) + half,
        right: s.width - parseFloat(style.paddingRight) - half,
        top: t.bottom - s.top + MARGIN + half,
        bottom: b.top - s.top - MARGIN - half,
      };

      // on narrow screens the corner blocks stack and leave no gap to roam in
      const usable = next.bottom - next.top > SIZE * 4 && next.right - next.left > SIZE * 4;
      bounds = usable ? next : null;
      dot.style.opacity = usable ? "1" : "0";

      if (usable && x === 0 && y === 0) {
        x = (next.left + next.right) / 2;
        y = (next.top + next.bottom) / 2;
      }
    };

    const clamp = (v: number, lo: number, hi: number) =>
      v < lo ? lo : v > hi ? hi : v;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!bounds) return;

      const midX = (bounds.left + bounds.right) / 2;
      const midY = (bounds.top + bounds.bottom) / 2;

      // a slow, non-repeating wander keeps it alive when the cursor is still
      const t = performance.now() / 1000;
      const driftX = Math.sin(t * 0.21) * 34 + Math.sin(t * 0.09) * 18;
      const driftY = Math.cos(t * 0.17) * 24 + Math.cos(t * 0.07) * 12;

      const targetX = clamp((cursor?.x ?? midX) + driftX, bounds.left, bounds.right);
      const targetY = clamp((cursor?.y ?? midY) + driftY, bounds.top, bounds.bottom);

      x += (targetX - x) * EASE;
      y += (targetY - y) * EASE;

      dot.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      const s = section.getBoundingClientRect();
      cursor = { x: event.clientX - s.left, y: event.clientY - s.top };
    };

    measure();
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 rounded-full bg-[var(--accent)] opacity-0"
      style={{ width: SIZE, height: SIZE, willChange: "transform" }}
    />
  );
}
