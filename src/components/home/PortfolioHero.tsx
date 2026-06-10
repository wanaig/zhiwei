"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function PortfolioHero() {
  const t = useTranslations("portfolio");
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

      // Draw grid pattern
      ctx.strokeStyle = "rgba(200, 50, 70, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating project cards (abstract rectangles)
      for (let i = 0; i < 6; i++) {
        const x = width * (0.1 + (i % 3) * 0.3) + Math.sin(time + i * 0.8) * 20;
        const y = height * (0.2 + Math.floor(i / 3) * 0.4) + Math.cos(time + i * 0.6) * 15;
        const w = 80 + Math.sin(time + i) * 10;
        const h = 50 + Math.cos(time + i * 0.5) * 8;

        ctx.fillStyle = `rgba(200, 50, 70, ${0.05 + Math.sin(time + i) * 0.02})`;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();

        // Card border
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Card content lines
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(time + i * 2) * 0.05})`;
        ctx.fillRect(x + 10, y + 12, w - 20, 4);
        ctx.fillRect(x + 10, y + 22, w * 0.6, 3);
        ctx.fillRect(x + 10, y + 32, w * 0.4, 3);
      }

      // Draw connecting lines between cards
      ctx.strokeStyle = "rgba(200, 50, 70, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      for (let i = 0; i < 5; i++) {
        const x1 = width * (0.1 + (i % 3) * 0.3) + Math.sin(time + i * 0.8) * 20 + 80;
        const y1 = height * (0.2 + Math.floor(i / 3) * 0.4) + Math.cos(time + i * 0.6) * 15 + 25;
        const x2 = width * (0.1 + ((i + 1) % 3) * 0.3) + Math.sin(time + (i + 1) * 0.8) * 20;
        const y2 = height * (0.2 + Math.floor((i + 1) / 3) * 0.4) + Math.cos(time + (i + 1) * 0.6) * 15 + 25;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw particles
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time * 0.3 + i * 0.7) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.2 + i * 0.9) * 0.5 + 0.5) * height;
        const size = 1 + Math.sin(time * 2 + i) * 0.5;

        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 80, 100, ${0.15 + Math.sin(time + i) * 0.05})`;
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
          Portfolio
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
