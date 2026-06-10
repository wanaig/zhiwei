"use client";

import { useRef, useEffect, useState } from "react";

const codeLines = [
  "const studio = '知微';",
  "function craft(idea) {",
  "  return design(idea)",
  "    .build()",
  "    .with('precision')",
  "    .ship();",
  "}",
  "",
  "const stack = [",
  "  'next.js', 'react',",
  "  'typescript', 'tailwind',",
  "  'node', 'python'",
  "];",
  "",
  "export default studio;",
];

const services = [
  "Web Development",
  "App Development",
  "System Architecture",
  "AI Solutions",
  "E-commerce",
  "Mini Programs",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentService, setCurrentService] = useState(0);

  // Typewriter effect for code
  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < codeLines.length) {
        setVisibleLines((prev) => [...prev, lineIndex]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Service text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const noise = (x: number, y: number, t: number) => {
      return (
        (Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7) +
          Math.cos(x * 0.008 - t * 0.5) * Math.sin(y * 0.012 + t * 0.3)) *
          0.5 +
        0.5
      );
    };

    const animate = () => {
      time += 0.002;
      ctx.fillStyle = "rgba(6, 6, 10, 0.06)";
      ctx.fillRect(0, 0, w, h);

      // Flowing aurora bands
      for (let b = 0; b < 4; b++) {
        ctx.beginPath();
        const yBase = h * (0.35 + b * 0.1);
        const amp = 60 + b * 15;

        for (let x = 0; x <= w; x += 3) {
          const n = noise(x, b * 100, time + b * 0.5);
          const y =
            yBase +
            Math.sin(x * 0.002 + time + b) * amp * n +
            Math.cos(x * 0.004 - time * 0.7) * 25 * n;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const colors = [
          ["180, 30, 60", 0.035],
          ["80, 100, 220", 0.03],
          ["150, 40, 120", 0.025],
          ["40, 160, 180", 0.02],
        ];
        const grad = ctx.createLinearGradient(0, yBase - amp, 0, h);
        grad.addColorStop(0, `rgba(${colors[b][0]}, ${colors[b][1]})`);
        grad.addColorStop(1, `rgba(${colors[b][0]}, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Floating dots
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const r = 150 + Math.sin(time * 0.3 + i * 0.5) * 80;
        const x = w * 0.65 + Math.cos(angle + time * 0.15) * r;
        const y = h * 0.5 + Math.sin(angle + time * 0.2) * r * 0.5;
        const size = 1 + Math.sin(time + i) * 0.8;
        const alpha = 0.2 + Math.sin(time * 2 + i) * 0.15;

        ctx.fillStyle = `rgba(200, 120, 160, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center glow
      const glow = ctx.createRadialGradient(
        w * 0.65,
        h * 0.5,
        0,
        w * 0.65,
        h * 0.5,
        300
      );
      glow.addColorStop(0, "rgba(180, 40, 70, 0.06)");
      glow.addColorStop(0.5, "rgba(80, 60, 180, 0.03)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Vignette
      const vig = ctx.createRadialGradient(
        w / 2,
        h / 2,
        w * 0.2,
        w / 2,
        h / 2,
        w * 0.7
      );
      vig.addColorStop(0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(1, "rgba(0, 0, 0, 0.35)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative h-[100dvh] min-h-[700px] overflow-hidden"
      style={{ backgroundColor: "rgb(6, 6, 10)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Content overlay */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Studio info */}
            <div>
              {/* Logo */}
              <div className="mb-8">
                <div
                  className="text-8xl md:text-9xl font-black tracking-tighter"
                  style={{
                    color: "white",
                    textShadow: "0 0 60px rgba(200, 50, 70, 0.3)",
                    lineHeight: 0.85,
                  }}
                >
                  知微
                </div>
                <div
                  className="mt-3 text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Digital Craft Studio
                </div>
              </div>

              {/* Rotating service text */}
              <div className="h-12 mb-8 overflow-hidden">
                <div className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--primary)" }}
                  />
                  <span
                    className="text-lg font-medium"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {services[currentService]}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-12">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "30+", label: "Clients" },
                  { value: "3y", label: "Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "white" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Code preview */}
            <div
              className="hidden lg:block rounded-xl overflow-hidden"
              style={{
                backgroundColor: "rgba(12, 12, 18, 0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span
                  className="ml-3 text-xs"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  studio.ts
                </span>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="transition-all duration-500"
                    style={{
                      opacity: visibleLines.includes(i) ? 1 : 0,
                      transform: visibleLines.includes(i)
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      color: line.includes("知微")
                        ? "rgba(200, 80, 100, 0.9)"
                        : line.includes("'")
                        ? "rgba(120, 180, 120, 0.8)"
                        : line.includes("const") ||
                          line.includes("function") ||
                          line.includes("return") ||
                          line.includes("export")
                        ? "rgba(140, 120, 220, 0.8)"
                        : "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    {line || "\u00A0"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgb(6, 6, 10), transparent)",
        }}
      />
    </section>
  );
}
