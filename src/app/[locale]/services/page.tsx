"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Globe, DeviceMobile, Database, DeviceTablet, Brain, ShoppingCart, ArrowUpRight } from "@phosphor-icons/react";

const services = [
  { key: "website", icon: Globe, color: "#c83246" },
  { key: "app", icon: DeviceMobile, color: "#3a7bd5" },
  { key: "system", icon: Database, color: "#2db89a" },
  { key: "miniapp", icon: DeviceTablet, color: "#07c160" },
  { key: "ai", icon: Brain, color: "#9b59b6" },
  { key: "ecommerce", icon: ShoppingCart, color: "#e67e22" },
];

const features: Record<string, string[]> = {
  website: ["响应式设计", "SEO优化", "高性能加载", "CMS集成"],
  app: ["原生体验", "跨平台方案", "推送通知", "离线支持"],
  system: ["高可用架构", "数据安全", "权限管理", "API设计"],
  miniapp: ["快速上线", "微信生态", "支付集成", "分享裂变"],
  ai: ["数据分析", "机器学习", "自动化流程", "智能推荐"],
  ecommerce: ["商品管理", "订单系统", "支付集成", "营销工具"],
};

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <section style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32 pb-16">
        <ScrollReveal>
          <div className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "rgb(200, 80, 100)" }}>
            Services
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 0.9, color: "white" }}>
            {t("title")}
          </h1>
          <p className="mt-5 text-lg max-w-[40ch]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {t("subtitle")}
          </p>
        </ScrollReveal>
      </div>

      {/* Services list - each is a full section */}
      {services.map(({ key, icon: Icon, color }, index) => (
        <ServiceSection
          key={key}
          tKey={key}
          Icon={Icon}
          color={color}
          index={index}
          t={t}
        />
      ))}
    </section>
  );
}

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(entry.intersectionRatio);
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: Math.min(1, progress * 3),
        transform: `translateY(${(1 - Math.min(1, progress * 2)) * 40}px)`,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
}

function ServiceSection({
  tKey,
  Icon,
  color,
  index,
  t,
}: {
  tKey: string;
  Icon: React.ComponentType<any>;
  color: string;
  index: number;
  t: (key: string) => string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top / windowHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "80vh",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Background color shift */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? "30%" : "70%"} 50%, ${color}06, transparent 60%)`,
          opacity: scrollProgress,
        }}
      />

      {/* Grid pattern that fades in */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${color}08 1px, transparent 1px),
            linear-gradient(90deg, ${color}08 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: scrollProgress * 0.5,
          transform: `scale(${1 + (1 - scrollProgress) * 0.1})`,
          transition: "opacity 0.1s, transform 0.1s",
        }}
      />

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:direction-rtl"}`}>
          {/* Visual side */}
          <div
            className={`${isEven ? "" : "lg:order-2"}`}
            style={{
              transform: `translateX(${isEven ? (1 - scrollProgress) * -60 : (1 - scrollProgress) * 60}px)`,
              opacity: scrollProgress,
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            <div
              className="aspect-square rounded-2xl relative overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: `1px solid ${color}15`,
              }}
            >
              {/* Animated gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, ${color}12, transparent 50%),
                    radial-gradient(circle at 70% 70%, ${color}08, transparent 50%)
                  `,
                  transform: `rotate(${scrollProgress * 10}deg)`,
                  transition: "transform 0.1s",
                }}
              />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  style={{
                    transform: `scale(${0.8 + scrollProgress * 0.3}) rotate(${scrollProgress * -5}deg)`,
                    transition: "transform 0.1s",
                  }}
                >
                  <Icon size={100} weight="duotone" style={{ color, opacity: 0.25 + scrollProgress * 0.15 }} />
                  <div
                    className="absolute inset-0 blur-[40px]"
                    style={{ backgroundColor: color, opacity: scrollProgress * 0.15 }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div
                className="absolute top-6 left-6"
                style={{
                  opacity: scrollProgress,
                  transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                  transition: "all 0.1s",
                }}
              >
                <div className="text-3xl font-bold" style={{ color: "white" }}>0{index + 1}</div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div
            className={`${isEven ? "" : "lg:order-1"}`}
            style={{
              transform: `translateX(${isEven ? (1 - scrollProgress) * 60 : (1 - scrollProgress) * -60}px)`,
              opacity: scrollProgress,
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={24} weight="duotone" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "white" }}>
                {t(`items.${tKey}.title`)}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
              {t(`items.${tKey}.description`)}
            </p>

            {/* Features with staggered reveal */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features[tKey].map((feature, i) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    opacity: Math.max(0, (scrollProgress - 0.3 - i * 0.05) * 5),
                    transform: `translateY(${Math.max(0, (0.5 - scrollProgress + i * 0.05) * 40)}px)`,
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                opacity: Math.max(0, (scrollProgress - 0.6) * 5),
                transform: `translateY(${Math.max(0, (0.8 - scrollProgress) * 30)}px)`,
                transition: "opacity 0.3s, transform 0.3s",
              }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-[0_12px_40px_rgba(200,50,70,0.2)]"
                style={{ backgroundColor: color, color: "white" }}
              >
                开始项目
                <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
