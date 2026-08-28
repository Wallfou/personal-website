"use client";

import { useEffect, useRef } from "react";

const SHIP_W = 14;
const SHIP_H = 20;
/** clearance kept between the ship and the corner blocks */
const MARGIN = 28;
/** px per second - a full crossing of the hero takes well over a minute */
const SPEED = 14;
/** radians per second the bow can swing, so course changes arc rather than snap */
const TURN = 0.4;

/**
 * A small ship, seen from above, that holds a constant slow speed and steers
 * toward the pointer. It never speeds up or stops: only its heading changes,
 * so it arcs around and comes back rather than parking on the cursor.
 *
 * Its bounds are measured from the corner blocks at runtime, so the layout
 * drives the ship rather than the other way round.
 */
export default function HeroDrifter() {
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ship = shipRef.current;
    const section = ship?.parentElement;
    if (!ship || !section) return;

    // it exists to track a cursor, so it stays hidden on touch input and for
    // anyone who has asked for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let bounds: { left: number; right: number; top: number; bottom: number } | null =
      null;
    let x = 0;
    let y = 0;
    let heading = -Math.PI / 2;
    let cursor: { x: number; y: number } | null = null;
    let frame = 0;
    let last = performance.now();

    const measure = () => {
      const top = section.querySelector("[data-hero-top]");
      const bottom = section.querySelector("[data-hero-bottom]");
      if (!top || !bottom) return;

      const s = section.getBoundingClientRect();
      const t = top.getBoundingClientRect();
      const b = bottom.getBoundingClientRect();
      const style = getComputedStyle(section);
      const halfW = SHIP_W / 2;
      const halfH = SHIP_H / 2;

      const next = {
        left: parseFloat(style.paddingLeft) + halfW,
        right: s.width - parseFloat(style.paddingRight) - halfW,
        top: t.bottom - s.top + MARGIN + halfH,
        bottom: b.top - s.top - MARGIN - halfH,
      };

      // on narrow screens the corner blocks stack and leave no gap to sail in
      const usable =
        next.bottom - next.top > SHIP_H * 2 && next.right - next.left > SHIP_W * 4;
      bounds = usable ? next : null;
      ship.style.opacity = usable ? "1" : "0";

      if (usable && x === 0 && y === 0) {
        x = (next.left + next.right) / 2;
        y = (next.top + next.bottom) / 2;
      }
    };

    const clamp = (v: number, lo: number, hi: number) =>
      v < lo ? lo : v > hi ? hi : v;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      // a backgrounded tab hands back a huge delta; cap it so nothing lurches
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!bounds) return;

      let aimX: number;
      let aimY: number;
      if (cursor) {
        aimX = cursor.x;
        aimY = cursor.y;
      } else {
        // with no pointer it circles a slowly wandering point near the middle
        const t = now / 1000;
        aimX = (bounds.left + bounds.right) / 2 + Math.sin(t * 0.11) * 90;
        aimY = (bounds.top + bounds.bottom) / 2 + Math.cos(t * 0.08) * 60;
      }

      // turn toward the target by at most TURN radians a second, taking the
      // shorter way round
      const desired = Math.atan2(aimY - y, aimX - x);
      const delta = Math.atan2(
        Math.sin(desired - heading),
        Math.cos(desired - heading),
      );
      const swing = TURN * dt;
      heading += clamp(delta, -swing, swing);

      // speed is constant; clamping per axis lets it slide along an edge
      // instead of stalling against it
      x = clamp(x + Math.cos(heading) * SPEED * dt, bounds.left, bounds.right);
      y = clamp(y + Math.sin(heading) * SPEED * dt, bounds.top, bounds.bottom);

      // the hull is drawn pointing up, so the bow leads by a quarter turn
      ship.style.transform =
        `translate3d(${x - SHIP_W / 2}px, ${y - SHIP_H / 2}px, 0)` +
        ` rotate(${heading + Math.PI / 2}rad)`;
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
      ref={shipRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 opacity-0"
      style={{ width: SHIP_W, height: SHIP_H, willChange: "transform" }}
    >
      <svg viewBox="0 0 14 20" width={SHIP_W} height={SHIP_H} fill="var(--accent)">
        {/* hull from above: pointed bow, widest amidships, flat transom */}
        <path d="M7 0 C10.4 5.4 11.6 11.4 10.9 16.4 L10.6 20 H3.4 L3.1 16.4 C2.4 11.4 3.6 5.4 7 0 Z" />
      </svg>
    </div>
  );
}
