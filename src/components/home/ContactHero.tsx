"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("contact");
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

      // Draw wave pattern (communication waves)
      for (let wave = 0; wave < 5; wave++) {
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.04 - wave * 0.008})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        const centerX = width * 0.7;
        const centerY = height * 0.5;
        const baseRadius = 30 + wave * 25;

        for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
          const radius = baseRadius + Math.sin(angle * 3 + time + wave * 0.5) * 10;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw center dot (contact point)
      ctx.fillStyle = `rgba(200, 50, 70, ${0.2 + Math.sin(time * 2) * 0.1})`;
      ctx.beginPath();
      ctx.arc(width * 0.7, height * 0.5, 6, 0, Math.PI * 2);
      ctx.fill();

      // Pulse ring
      const pulseSize = 15 + Math.sin(time * 3) * 8;
      ctx.strokeStyle = `rgba(200, 50, 70, ${0.1 - Math.sin(time * 3) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width * 0.7, height * 0.5, pulseSize, 0, Math.PI * 2);
      ctx.stroke();

      // Draw connection lines (network)
      const nodes = [
        { x: 0.15, y: 0.3 },
        { x: 0.25, y: 0.6 },
        { x: 0.35, y: 0.4 },
        { x: 0.45, y: 0.7 },
        { x: 0.55, y: 0.35 },
        { x: 0.65, y: 0.55 },
        { x: 0.75, y: 0.5 },
        { x: 0.85, y: 0.45 },
      ];

      // Draw connections
      ctx.strokeStyle = "rgba(200, 50, 70, 0.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      nodes.forEach((node, i) => {
        if (i < nodes.length - 1) {
          const x1 = width * node.x + Math.sin(time + i * 0.5) * 10;
          const y1 = height * node.y + Math.cos(time + i * 0.7) * 8;
          const x2 = width * nodes[i + 1].x + Math.sin(time + (i + 1) * 0.5) * 10;
          const y2 = height * nodes[i + 1].y + Math.cos(time + (i + 1) * 0.7) * 8;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);

      // Draw nodes
      nodes.forEach(({ x, y }, i) => {
        const px = width * x + Math.sin(time + i * 0.5) * 10;
        const py = height * y + Math.cos(time + i * 0.7) * 8;

        ctx.fillStyle = `rgba(200, 50, 70, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

        // Node pulse
        const nodePulse = 8 + Math.sin(time * 2 + i) * 4;
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.06 - Math.sin(time * 2 + i) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, nodePulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw message bubbles
      const messages = [
        { x: 0.2, y: 0.25, text: "Hello!" },
        { x: 0.3, y: 0.65, text: "Project?" },
        { x: 0.5, y: 0.3, text: "Let's talk" },
        { x: 0.8, y: 0.6, text: "Design" },
      ];

      messages.forEach(({ x, y, text }, i) => {
        const px = width * x + Math.sin(time + i * 0.8) * 8;
        const py = height * y + Math.cos(time + i * 0.6) * 6;

        ctx.fillStyle = `rgba(200, 50, 70, ${0.05 + Math.sin(time + i) * 0.02})`;
        ctx.strokeStyle = `rgba(200, 50, 70, ${0.08 + Math.sin(time + i) * 0.03})`;
        ctx.lineWidth = 1;

        const textWidth = ctx.measureText(text).width + 20;
        ctx.beginPath();
        ctx.roundRect(px, py, textWidth, 28, 14);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.sin(time + i) * 0.05})`;
        ctx.font = "11px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(text, px + 10, py + 18);
      });

      // Draw flowing particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.3 + i * 0.7) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.2 + i * 0.9) * 0.5 + 0.5) * height;
        const size = 1 + Math.sin(time * 1.5 + i) * 0.5;

        ctx.beginPath();
        ctx.fillStyle = `rgba(200, 80, 100, ${0.1 + Math.sin(time + i) * 0.04})`;
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
          Contact
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
