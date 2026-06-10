"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Globe,
  DeviceMobile,
  Database,
  DeviceTablet,
  Brain,
  ShoppingCart,
  IconProps,
} from "@phosphor-icons/react";

const services = [
  { key: "website", icon: Globe, featured: true },
  { key: "app", icon: DeviceMobile, featured: false },
  { key: "system", icon: Database, featured: false },
  { key: "miniapp", icon: DeviceTablet, featured: false },
  { key: "ai", icon: Brain, featured: false },
  { key: "ecommerce", icon: ShoppingCart, featured: false },
];

export default function ServiceHighlights() {
  const t = useTranslations("services");
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: "rgb(8, 8, 12)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200, 50, 70, 0.04), transparent 60%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Header */}
        <div className="mb-20 max-w-lg">
          <div
            className="text-xs font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgb(200, 80, 100)" }}
          >
            Capabilities
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "white",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Service cards - asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ key, icon: Icon, featured }, index) => (
            <ServiceCard
              key={key}
              tKey={key}
              Icon={Icon}
              featured={featured}
              index={index}
              isVisible={visibleCards.includes(index)}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  tKey,
  Icon,
  featured,
  index,
  isVisible,
  t,
}: {
  tKey: string;
  Icon: React.ComponentType<IconProps>;
  featured: boolean;
  index: number;
  isVisible: boolean;
  t: (key: string) => string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 150);
  };

  return (
    <div
      ref={cardRef}
      data-index={index}
      className={`group relative ${featured ? "lg:col-span-2 lg:row-span-2" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/services#${tKey}`}
        className="block h-full relative overflow-hidden rounded-xl"
        style={{
          backgroundColor: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
          minHeight: featured ? "420px" : "220px",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {/* Spotlight effect */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: `${mousePos.x - 150}px`,
            top: `${mousePos.y - 150}px`,
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(200, 50, 70, 0.12), transparent 60%)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Grid pattern for featured */}
        {featured && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200, 50, 70, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200, 50, 70, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />
        )}

        {/* Content */}
        <div className="relative h-full p-7 md:p-9 flex flex-col justify-between">
          <div>
            {/* Number + Icon row */}
            <div className="flex items-start justify-between mb-8">
              <div
                className="text-xs font-mono transition-colors duration-300"
                style={{ color: isHovered ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.15)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400"
                style={{
                  backgroundColor: isHovered ? "rgba(200, 50, 70, 0.2)" : "rgba(255,255,255,0.04)",
                  color: isHovered ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.4)",
                  transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0)",
                }}
              >
                <Icon size={24} weight="duotone" />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-xl font-semibold mb-3 transition-colors duration-300"
              style={{ color: isHovered ? "white" : "rgba(255,255,255,0.8)" }}
            >
              {t(`items.${tKey}.title`)}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed max-w-[32ch]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t(`items.${tKey}.description`)}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex items-center justify-between">
            <div
              className="h-[1px] flex-1 transition-all duration-500"
              style={{
                backgroundColor: isHovered ? "rgb(200, 50, 70)" : "rgba(255,255,255,0.06)",
                transform: isHovered ? "scaleX(1)" : "scaleX(0.3)",
                transformOrigin: "left",
              }}
            />
            <span
              className="text-xs font-medium ml-4 transition-all duration-300"
              style={{
                color: isHovered ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.2)",
                transform: isHovered ? "translateX(0)" : "translateX(-10px)",
                opacity: isHovered ? 1 : 0,
              }}
            >
              Explore →
            </span>
          </div>
        </div>

        {/* Glitch effect on hover */}
        {glitch && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "rgba(200, 50, 70, 0.03)",
              mixBlendMode: "overlay",
            }}
          />
        )}
      </Link>
    </div>
  );
}
