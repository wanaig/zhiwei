"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function BlogHero() {
  const t = useTranslations("blog");
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

      // Draw newspaper/article grid
      const cols = 4;
      const rows = 3;
      const cellWidth = (width * 0.5) / cols;
      const cellHeight = (height * 0.6) / rows;
      const startX = width * 0.4;
      const startY = height * 0.2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = startX + col * cellWidth + Math.sin(time + row + col * 0.5) * 3;
          const y = startY + row * cellHeight + Math.cos(time + row * 0.7 + col) * 2;

          // Article card
          ctx.fillStyle = `rgba(200, 50, 70, ${0.03 + Math.sin(time + row + col) * 0.01})`;
          ctx.beginPath();
          ctx.roundRect(x, y, cellWidth - 8, cellHeight - 8, 6);
          ctx.fill();

          // Article lines (text simulation)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.06 + Math.sin(time + row + col * 2) * 0.02})`;
          ctx.fillRect(x + 8, y + 10, cellWidth - 24, 4);
          ctx.fillRect(x + 8, y + 20, cellWidth - 40, 3);
          ctx.fillRect(x + 8, y + 28, cellWidth - 50, 3);

          // Image placeholder
          if ((row + col) % 2 === 0) {
            ctx.fillStyle = `rgba(200, 50, 70, ${0.05 + Math.sin(time + row + col * 3) * 0.02})`;
            ctx.fillRect(x + 8, y + 38, cellWidth - 24, 20);
          }
        }
      }

      // Draw pen/writing animation
      const penX = width * 0.2 + Math.sin(time * 0.5) * 30;
      const penY = height * 0.5 + Math.cos(time * 0.3) * 20;

      // Pen body
      ctx.strokeStyle = "rgba(200, 50, 70, 0.1)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(penX, penY);
      ctx.lineTo(penX + 30, penY - 40);
      ctx.stroke();

      // Pen tip
      ctx.fillStyle = "rgba(200, 50, 70, 0.15)";
      ctx.beginPath();
      ctx.moveTo(penX, penY);
      ctx.lineTo(penX + 5, penY + 8);
      ctx.lineTo(penX - 5, penY + 8);
      ctx.closePath();
      ctx.fill();

      // Written text trail
      ctx.strokeStyle = `rgba(200, 50, 70, ${0.06 + Math.sin(time * 2) * 0.02})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const tx = penX - 20 - i * 15 + Math.sin(time + i) * 5;
        const ty = penY + 10 + Math.cos(time + i * 0.5) * 3;
        if (i === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.stroke();

      // Draw floating tags
      const tags = ["React", "Next.js", "TypeScript", "AI", "Design", "DevOps"];
      tags.forEach((tag, i) => {
        const x = width * (0.05 + (i % 3) * 0.12) + Math.sin(time + i * 0.8) * 10;
        const y = height * (0.3 + Math.floor(i / 3) * 0.3) + Math.cos(time + i * 0.6) * 8;

        ctx.fillStyle = `rgba(200, 50, 70, ${0.06 + Math.sin(time + i) * 0.02})`;
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.1 + Math.sin(time + i) * 0.03})`;
        ctx.lineWidth = 1;

        const textWidth = ctx.measureText(tag).width + 16;
        ctx.beginPath();
        ctx.roundRect(x, y, textWidth, 22, 11);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(time + i) * 0.05})`;
        ctx.font = "10px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(tag, x + 8, y + 15);
      });

      // Draw flowing lines
      ctx.strokeStyle = "rgba(200, 50, 70, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 3) {
          const y = height * (0.2 + i * 0.3) + Math.sin((x + time * 80) * 0.008) * 25;
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
          Blog
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
