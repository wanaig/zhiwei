"use client";

import { useRef, useEffect, useState } from "react";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top / windowHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={headerRef} className="relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200, 50, 70, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 50, 70, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at top center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top center, black 20%, transparent 70%)",
          opacity: scrollProgress,
        }}
      />

      {/* Gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(200, 50, 70, 0.06), transparent 60%)",
          opacity: scrollProgress,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div
          style={{
            opacity: Math.min(1, scrollProgress * 3),
            transform: `translateY(${(1 - Math.min(1, scrollProgress * 2)) * 40}px)`,
          }}
        >
          {/* Small label */}
          <div
            className="text-xs font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgb(200, 80, 100)" }}
          >
            {label}
          </div>

          {/* Large title */}
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              lineHeight: 0.9,
              color: "white",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className="mt-5 text-lg max-w-[40ch]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
