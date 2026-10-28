"use client";

import { useEffect, useRef } from "react";

const GAP = 26; // px between dots
const RADIUS = 180; // pointer influence, px
const CREAM = "#efeae1";
const AMBER = "#f5a524";

// A slow-drifting dot matrix behind the hero, like a live scatter plot.
// Dots near the pointer swell and turn amber. Draws one still frame when
// reduced motion is preferred, and pauses while off screen.
export default function DataField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let onScreen = true;

    function draw(ms) {
      const t = ms / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.15;
      pointer.y += (pointer.ty - pointer.y) * 0.15;
      pointer.strength += (pointer.target - pointer.strength) * 0.08;

      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / GAP);
      const rows = Math.ceil(height / GAP);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * GAP + GAP / 2;
          const y = j * GAP + GAP / 2;
          // Two drifting sine fields make a smooth 0..1 "terrain".
          const wave =
            (Math.sin(i * 0.21 + t * 0.6) * Math.cos(j * 0.27 - t * 0.45) +
              Math.sin((i - j) * 0.08 + t * 0.3)) /
            2;
          const v = (wave + 1) / 2;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const near = pointer.strength * Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / RADIUS);
          const size = 1 + v * 1.5 + near * 2.6;
          ctx.globalAlpha = Math.min(1, 0.06 + v * v * 0.42 + near * 0.8);
          ctx.fillStyle = near > 0.04 ? AMBER : CREAM;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    }

    function frame(ms) {
      draw(ms);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(0);
    }

    function onPointerMove(e) {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      // Coming back from idle: jump there instead of sweeping across the field.
      if (pointer.strength < 0.01) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.target = 1;
    }

    function onPointerLeave() {
      pointer.target = 0;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
