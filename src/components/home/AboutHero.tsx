"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about");
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

      // Draw DNA-like helix
      const helixCenterX = width * 0.75;
      const helixCenterY = height * 0.5;
      const helixRadius = 40;
      const helixHeight = height * 0.6;

      ctx.strokeStyle = "rgba(200, 50, 70, 0.08)";
      ctx.lineWidth = 1;

      // Draw helix strands
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath();
        for (let y = 0; y < helixHeight; y += 2) {
          const angle = (y * 0.02) + time + (strand * Math.PI);
          const x = helixCenterX + Math.cos(angle) * helixRadius;
          const py = helixCenterY - helixHeight / 2 + y;

          if (y === 0) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        }
        ctx.stroke();
      }

      // Draw connecting bars
      for (let y = 0; y < helixHeight; y += 30) {
        const angle1 = (y * 0.02) + time;
        const angle2 = (y * 0.02) + time + Math.PI;
        const x1 = helixCenterX + Math.cos(angle1) * helixRadius;
        const x2 = helixCenterX + Math.cos(angle2) * helixRadius;
        const py = helixCenterY - helixHeight / 2 + y;

        ctx.strokeStyle = `rgba(200, 50, 70, ${0.05 + Math.sin(time + y * 0.1) * 0.02})`;
        ctx.beginPath();
        ctx.moveTo(x1, py);
        ctx.lineTo(x2, py);
        ctx.stroke();

        // Node dots
        ctx.fillStyle = `rgba(200, 80, 100, ${0.2 + Math.sin(time + y * 0.1) * 0.1})`;
        ctx.beginPath();
        ctx.arc(x1, py, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw timeline milestones
      const milestones = [
        { x: 0.12, y: 0.25, label: "2026" },
        { x: 0.18, y: 0.45, label: "2026" },
        { x: 0.24, y: 0.35, label: "2026" },
        { x: 0.30, y: 0.55, label: "2026" },
        { x: 0.36, y: 0.45, label: "2026" },
      ];

      // Timeline line
      ctx.strokeStyle = "rgba(200, 50, 70, 0.06)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * 0.5);
      ctx.lineTo(width * 0.4, height * 0.5);
      ctx.stroke();

      milestones.forEach(({ x, y, label }, i) => {
        const px = width * x + Math.sin(time + i * 0.5) * 5;
        const py = height * y + Math.cos(time + i * 0.7) * 5;

        // Milestone dot
        ctx.fillStyle = `rgba(200, 50, 70, ${0.15 + Math.sin(time + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        // Pulse ring
        const pulseSize = 10 + Math.sin(time * 2 + i) * 5;
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.08 - Math.sin(time * 2 + i) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        // Year label
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.sin(time + i) * 0.05})`;
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(label, px, py + 20);
      });

      // Draw flowing particles
      for (let i = 0; i < 25; i++) {
        const x = (Math.sin(time * 0.4 + i * 0.6) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.3 + i * 0.8) * 0.5 + 0.5) * height;
        const size = 1 + Math.sin(time * 1.5 + i) * 0.5;

        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 80, 100, ${0.12 + Math.sin(time + i) * 0.04})`;
        ctx.arc(x, y, Math.max(0.1, size), 0, Math.PI * 2);
        ctx.fill();
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
          About Us
        </div>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 0.9, color: "white" }}>
          {t("title")}
        </h1>
        <p className="mt-5 text-lg max-w-[50ch]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {t("subtitle")}
        </p>
      </div>
    </div>
  );
}
