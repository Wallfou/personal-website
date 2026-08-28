"use client";

import { useEffect, useRef } from "react";

const SHIP_W = 28;
const SHIP_H = 40;
/** clearance kept between the ship and the corner blocks */
const MARGIN = 28;
/** px per second - a full crossing of the hero still takes about a minute */
const SPEED = 22;
/** radians per second the bow can swing, so course changes arc rather than snap */
const TURN = 0.4;

/** a short pier jutting from the left margin, where the boat starts */
const DOCK_W = 84;
const DOCK_H = 12;

/** transverse ripples dropped at the stern */
const WAKE_COUNT = 16;
const WAKE_SPAWN_MS = 460;
const WAKE_LIFE_MS = 3600;
const WAKE_W = 18;
const WAKE_H = 2;

type Ripple = { x: number; y: number; angle: number; born: number };

/**
 * A small ship, seen from above, that holds a constant slow speed and steers
 * toward the pointer. It never speeds up or stops: only its heading changes,
 * so it arcs around and comes back rather than parking on the cursor.
 *
 * Behind it, a line of transverse ripples is dropped at the stern and left in
 * place to spread and fade, which reads as a wake without drawing water.
 *
 * Bounds are measured from the corner blocks at runtime, so the layout drives
 * the ship rather than the other way round.
 */
export default function HeroDrifter() {
  const shipRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const wakeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ship = shipRef.current;
    const section = ship?.parentElement;
    if (!ship || !section) return;

    // it exists to track a cursor, so it stays hidden on touch input and for
    // anyone who has asked for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    type Rect = { left: number; right: number; top: number; bottom: number };
    let bounds: Rect | null = null;
    let dock: Rect | null = null;
    // the hull is treated as a circle of this radius, so no part of it can
    // reach the pier however the boat is turned
    const HULL_R = Math.hypot(SHIP_W, SHIP_H) / 2;
    let x = 0;
    let y = 0;
    let heading = -Math.PI / 2;
    let cursor: { x: number; y: number } | null = null;
    let frame = 0;
    let last = performance.now();
    let lastSpawn = 0;
    let nextRipple = 0;
    const ripples: (Ripple | null)[] = Array(WAKE_COUNT).fill(null);

    const measure = () => {
      const top = section.querySelector("[data-hero-top]");
      const bottom = section.querySelector("[data-hero-bottom]");
      if (!top || !bottom) return;

      const s = section.getBoundingClientRect();
      const t = top.getBoundingClientRect();
      const b = bottom.getBoundingClientRect();
      const style = getComputedStyle(section);
      // the hull rotates, so inset by its circumscribed radius rather than by
      // width and height - otherwise a corner pokes out on the diagonal
      const r = HULL_R;

      const next = {
        left: parseFloat(style.paddingLeft) + r,
        right: s.width - parseFloat(style.paddingRight) - r,
        top: t.bottom - s.top + MARGIN + r,
        bottom: b.top - s.top - MARGIN - r,
      };

      // on narrow screens the corner blocks stack and leave no gap to sail in
      const usable = next.bottom - next.top > SHIP_H && next.right - next.left > SHIP_W * 2;
      bounds = usable ? next : null;
      ship.style.opacity = usable ? "1" : "0";

      if (!usable) {
        dock = null;
        if (dockRef.current) dockRef.current.style.opacity = "0";
        return;
      }

      // the pier sits against the left margin, halfway down the free band
      const padLeft = parseFloat(style.paddingLeft);
      const midY = (next.top + next.bottom) / 2;
      dock = {
        left: padLeft,
        right: padLeft + DOCK_W,
        top: midY - DOCK_H / 2,
        bottom: midY + DOCK_H / 2,
      };

      const dockEl = dockRef.current;
      if (dockEl) {
        dockEl.style.opacity = "1";
        dockEl.style.transform = `translate3d(${dock.left}px, ${dock.top}px, 0)`;
      }

      // start moored off the end of the pier, bow pointing out to open water
      if (x === 0 && y === 0) {
        x = clamp(dock.right + HULL_R, next.left, next.right);
        y = midY;
        heading = 0;
      }
    };

    const clamp = (v: number, lo: number, hi: number) =>
      v < lo ? lo : v > hi ? hi : v;

    /**
     * Push the hull clear of the pier. The dock is grown by the hull radius and
     * the centre is ejected along whichever side it is closest to escaping, so
     * the boat slides around the pier rather than stopping dead or passing
     * through it.
     */
    const clearDock = () => {
      if (!dock) return;
      const l = dock.left - HULL_R;
      const r = dock.right + HULL_R;
      const t = dock.top - HULL_R;
      const b = dock.bottom + HULL_R;
      if (x <= l || x >= r || y <= t || y >= b) return;

      const out = Math.min(x - l, r - x, y - t, b - y);
      if (out === x - l) x = l;
      else if (out === r - x) x = r;
      else if (out === y - t) y = t;
      else y = b;
    };

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
      clearDock();

      // the hull is drawn pointing up, so the bow leads by a quarter turn
      ship.style.transform =
        `translate3d(${x - SHIP_W / 2}px, ${y - SHIP_H / 2}px, 0)` +
        ` rotate(${heading + Math.PI / 2}rad)`;

      if (now - lastSpawn >= WAKE_SPAWN_MS) {
        lastSpawn = now;
        ripples[nextRipple] = {
          x: x - Math.cos(heading) * (SHIP_H / 2),
          y: y - Math.sin(heading) * (SHIP_H / 2),
          angle: heading,
          born: now,
        };
        nextRipple = (nextRipple + 1) % WAKE_COUNT;
      }

      for (let i = 0; i < WAKE_COUNT; i++) {
        const el = wakeRefs.current[i];
        const r = ripples[i];
        if (!el) continue;
        if (!r) {
          el.style.opacity = "0";
          continue;
        }
        const age = (now - r.born) / WAKE_LIFE_MS;
        if (age >= 1) {
          ripples[i] = null;
          el.style.opacity = "0";
          continue;
        }
        // ripples sit across the track, spreading and thinning as they age
        el.style.opacity = String(0.34 * (1 - age) ** 1.6);
        el.style.transform =
          `translate3d(${r.x - WAKE_W / 2}px, ${r.y - WAKE_H / 2}px, 0)` +
          ` rotate(${r.angle + Math.PI / 2}rad) scaleX(${0.55 + age * 1.9})`;
      }
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
    <>
      <div
        ref={dockRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 opacity-0"
        style={{
          width: DOCK_W,
          height: DOCK_H,
          backgroundColor: "#c4c4c4",
          willChange: "transform",
        }}
      />
      {Array.from({ length: WAKE_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            wakeRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 rounded-full bg-[var(--accent)] opacity-0"
          style={{
            width: WAKE_W,
            height: WAKE_H,
            willChange: "transform, opacity",
          }}
        />
      ))}
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
    </>
  );
}
