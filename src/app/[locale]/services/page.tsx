"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Globe, DeviceMobile, Database, DeviceTablet, Brain, ShoppingCart, ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import ServicesHero from "@/components/home/ServicesHero";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = 1 - (rect.top / window.innerHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      <ServicesHero />

      {/* Services intro */}
      <div
        className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16"
        style={{
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.1) * 5)),
          transform: `translateY(${Math.max(0, (0.3 - scrollProgress) * 40)}px)`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkle size={16} style={{ color: "rgb(200, 80, 100)" }} />
          <span className="text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>我们的服务</span>
        </div>
        <p className="text-lg max-w-[60ch]" style={{ color: "rgba(255,255,255,0.35)" }}>
          从网站到应用，从系统到AI，我们提供全方位的数字化解决方案
        </p>
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
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background color shift */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? "30%" : "70%"} 50%, ${color}08, transparent 60%)`,
          opacity: scrollProgress * (isHovered ? 1.5 : 1),
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

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              backgroundColor: `${color}20`,
              left: `${10 + (i * 12) % 80}%`,
              top: `${20 + (i * 15) % 60}%`,
              transform: `translate(${Math.sin(scrollProgress * Math.PI + i) * 30}px, ${Math.cos(scrollProgress * Math.PI + i) * 20}px)`,
              opacity: scrollProgress * 0.6,
              transition: "transform 0.3s ease-out",
            }}
          />
        ))}
      </div>

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
              className="aspect-square rounded-2xl relative overflow-hidden group"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: `1px solid ${color}15`,
              }}
            >
              {/* Animated gradient */}
              <div
                className="absolute inset-0 transition-transform duration-700"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, ${color}15, transparent 50%),
                    radial-gradient(circle at 70% 70%, ${color}08, transparent 50%)
                  `,
                  transform: `rotate(${scrollProgress * 10}deg) scale(${isHovered ? 1.1 : 1})`,
                }}
              />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="transition-transform duration-500"
                  style={{
                    transform: `scale(${0.8 + scrollProgress * 0.3}) rotate(${scrollProgress * -5}deg)`,
                  }}
                >
                  <Icon
                    size={100}
                    weight="duotone"
                    style={{
                      color,
                      opacity: 0.25 + scrollProgress * 0.15,
                      filter: isHovered ? `drop-shadow(0 0 30px ${color}40)` : "none",
                    }}
                  />
                  <div
                    className="absolute inset-0 blur-[40px] transition-opacity duration-500"
                    style={{ backgroundColor: color, opacity: isHovered ? 0.2 : scrollProgress * 0.15 }}
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

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                style={{
                  border: `1px solid ${color}30`,
                  opacity: isHovered ? 1 : 0,
                  boxShadow: `inset 0 0 30px ${color}10`,
                }}
              />
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
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? `${color}25` : `${color}15`,
                  color,
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:translate-x-1"
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
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-[0_12px_40px_rgba(200,50,70,0.2)] hover:scale-105"
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
