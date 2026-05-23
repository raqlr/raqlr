import { useRef, useEffect } from "react";
import { asciiData } from "../assets/asciiData";

export default function AsciiPortrait({ size = 400, color = "#64ffda" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Pick the pre-baked size closest to the canvas size
    const sizeKey  = W <= 220 ? 220 : W <= 280 ? 280 : 400;
    // Give each particle its own current position and velocity
    const particles = asciiData[sizeKey].map(p => ({
      ...p, cx: p.x, cy: p.y, vx: 0, vy: 0
    }));

    const FORCE    = 80;   // how hard the mouse pushes
    const RADIUS   = 60;   // how far the push reaches (px)
    const FRICTION = 0.88; // lower = more bouncy, higher = settles fast

    const mouse = { x: -9999, y: -9999 };

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * (W / r.width);
      mouse.y = (e.clientY - r.top)  * (H / r.height);
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf;
    function loop() {
      ctx.clearRect(0, 0, W, H);
      ctx.font          = "7px monospace";
      ctx.textBaseline  = "top";
      ctx.fillStyle     = color;

      for (const p of particles) {
        // 1. Mouse repulsion
        const dx   = p.cx - mouse.x;
        const dy   = p.cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0.5) {
          const force = FORCE / dist;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // 2. Spring back toward home position
        p.vx += (p.x - p.cx) * 0.08;
        p.vy += (p.y - p.cy) * 0.08;

        // 3. Friction slows it down so it doesn't bounce forever
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // 4. Move
        p.cx += p.vx;
        p.cy += p.vy;

        // 5. Draw
        ctx.globalAlpha = p.alpha;
        ctx.fillText(p.char, p.cx, p.cy);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width: "100%", maxWidth: size }}
    />
  );
}