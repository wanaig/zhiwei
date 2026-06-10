"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ServicesHero() {
  const t = useTranslations("services");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      // Draw orbital circles
      const centerX = width * 0.7;
      const centerY = height * 0.5;

      for (let i = 0; i < 4; i++) {
        const radius = 60 + i * 50;
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.06 - i * 0.01})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting dots
        for (let j = 0; j < 3; j++) {
          const angle = time * (0.5 - i * 0.1) + (j * Math.PI * 2) / 3;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const size = 3 + Math.sin(time + j) * 1;

          ctx.beginPath();
          ctx.fillStyle = `rgba(200, 80, 100, ${0.3 + Math.sin(time + j) * 0.1})`;
          ctx.arc(x, y, Math.max(0.1, size), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw service icons (abstract shapes)
      const services = [
        { x: 0.15, y: 0.3, shape: "circle" },
        { x: 0.25, y: 0.7, shape: "square" },
        { x: 0.35, y: 0.4, shape: "triangle" },
        { x: 0.45, y: 0.6, shape: "diamond" },
        { x: 0.55, y: 0.35, shape: "hexagon" },
        { x: 0.65, y: 0.65, shape: "star" },
      ];

      services.forEach(({ x, y, shape }, i) => {
        const px = width * x + Math.sin(time + i * 0.5) * 15;
        const py = height * y + Math.cos(time + i * 0.7) * 10;
        const size = 12 + Math.sin(time + i) * 3;

        ctx.fillStyle = `rgba(200, 50, 70, ${0.08 + Math.sin(time + i) * 0.03})`;
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.15 + Math.sin(time + i) * 0.05})`;
        ctx.lineWidth = 1;

        ctx.beginPath();
        if (shape === "circle") {
          ctx.arc(px, py, size, 0, Math.PI * 2);
        } else if (shape === "square") {
          ctx.rect(px - size, py - size, size * 2, size * 2);
        } else if (shape === "triangle") {
          ctx.moveTo(px, py - size);
          ctx.lineTo(px + size, py + size);
          ctx.lineTo(px - size, py + size);
          ctx.closePath();
        } else if (shape === "diamond") {
          ctx.moveTo(px, py - size);
          ctx.lineTo(px + size, py);
          ctx.lineTo(px, py + size);
          ctx.lineTo(px - size, py);
          ctx.closePath();
        } else if (shape === "hexagon") {
          for (let h = 0; h < 6; h++) {
            const angle = (h * Math.PI) / 3;
            const hx = px + Math.cos(angle) * size;
            const hy = py + Math.sin(angle) * size;
            if (h === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
        } else if (shape === "star") {
          for (let s = 0; s < 5; s++) {
            const angle = (s * Math.PI * 2) / 5 - Math.PI / 2;
            const sx = px + Math.cos(angle) * size;
            const sy = py + Math.sin(angle) * size;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
            const innerAngle = angle + Math.PI / 5;
            const ix = px + Math.cos(innerAngle) * (size * 0.5);
            const iy = py + Math.sin(innerAngle) * (size * 0.5);
            ctx.lineTo(ix, iy);
          }
          ctx.closePath();
        }
        ctx.fill();
        ctx.stroke();
      });

      // Draw flowing lines
      ctx.strokeStyle = "rgba(200, 50, 70, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 3) {
          const y = height * (0.3 + i * 0.2) + Math.sin((x + time * 100) * 0.01) * 30 + Math.cos((x + time * 50) * 0.015) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.008;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative overflow-hidden pt-24 md:pt-32 pb-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "rgb(200, 80, 100)" }}>
          Services
        </div>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 0.9, color: "white" }}>
          {t("title")}
        </h1>
        <p className="mt-5 text-lg max-w-[40ch]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {t("subtitle")}
        </p>
      </div>
    </div>
  );
}
