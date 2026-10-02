"use client";

import React from "react";

const PALETTE = ["rgba(13,170,233,0.85)", "rgba(59,110,255,0.75)", "rgba(3,37,225,0.65)"];

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor(x: number, y: number, dx: number, dy: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.directionX = dx;
    this.directionY = dy;
    this.size = size;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mouse: { x: number | null; y: number | null; radius: number }) {
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size) {
        const fx = dx / distance;
        const fy = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= fx * force * 5;
        this.y -= fy * force * 5;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

// Ported 1:1 from the Aether Flow prototype: a mouse-reactive particle mesh
// painted straight onto canvas rather than a component tree, so it's kept as
// vanilla canvas/rAF code instead of individually rendered React nodes.
function ParticleNetwork() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    function init() {
      particles = [];
      const count = (canvas!.height * canvas!.width) / 9000;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas!.width - size * 4) + size * 2;
        const y = Math.random() * (canvas!.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function resizeCanvas() {
      canvas!.width = wrap!.clientWidth;
      canvas!.height = wrap!.clientHeight;
      init();
    }
    window.addEventListener("resize", resizeCanvas);

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist =
            (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);
          if (dist < (canvas!.width / 7) * (canvas!.height / 7)) {
            const opacityValue = 1 - dist / 20000;
            let isNearMouse = false;
            if (mouse.x !== null) {
              const dxm = particles[a].x - mouse.x;
              const dym = particles[a].y - (mouse.y as number);
              isNearMouse = Math.sqrt(dxm * dxm + dym * dym) < mouse.radius;
            }
            ctx!.strokeStyle = isNearMouse
              ? "rgba(255,255,255," + opacityValue + ")"
              : "rgba(13,170,233," + opacityValue * 0.55 + ")";
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    function frame() {
      animationFrameId = requestAnimationFrame(frame);
      ctx!.fillStyle = "#060F26";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) particles[i].update(canvas!, ctx!, mouse);
      connect();
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleMouseOut() {
      mouse.x = null;
      mouse.y = null;
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    resizeCanvas();
    if (reducedMotion) {
      ctx.fillStyle = "#060F26";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let j = 0; j < particles.length; j++) particles[j].draw(ctx);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}

export default ParticleNetwork;
