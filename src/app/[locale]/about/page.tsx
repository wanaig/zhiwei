"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Target, Lightbulb, Handshake, ArrowUpRight, Code, Palette, Lightning, Users, Star } from "@phosphor-icons/react";
import AboutHero from "@/components/home/AboutHero";

export default function AboutPage() {
  const t = useTranslations("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const values = [
    { key: "quality", icon: Target, color: "#c83246" },
    { key: "innovation", icon: Lightbulb, color: "#3a7bd5" },
    { key: "partnership", icon: Handshake, color: "#2db89a" },
  ];

  const teamMembers = [
    { key: "founder", image: "https://picsum.photos/seed/zw-team1/400/400", color: "#c83246" },
    { key: "designer", image: "https://picsum.photos/seed/zw-team2/400/400", color: "#3a7bd5" },
    { key: "developer", image: "https://picsum.photos/seed/zw-team3/400/400", color: "#2db89a" },
  ];

  const stats = [
    { icon: Code, value: "50+", label: "项目交付", color: "#c83246" },
    { icon: Palette, value: "3", label: "设计奖项", color: "#3a7bd5" },
    { icon: Lightning, value: "99%", label: "按时交付", color: "#2db89a" },
    { icon: Users, value: "100%", label: "客户满意度", color: "#e67e22" },
  ];

  return (
    <section ref={sectionRef} style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      <AboutHero />

      {/* Stats row */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label, color }, index) => (
            <div
              key={label}
              className="group p-6 rounded-xl text-center transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2 - index * 0.05) * 5)),
                transform: `translateY(${Math.max(0, (0.4 - scrollProgress + index * 0.05) * 30)}px)`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={24} weight="duotone" />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: "white" }}>{value}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ boxShadow: `0 0 30px ${color}15` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 rounded-2xl relative overflow-hidden"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.15) * 4)),
            transform: `translateY(${Math.max(0, (0.4 - scrollProgress) * 40)}px)`,
          }}
        >
          {/* Background decoration */}
          <div
            className="absolute -right-20 -top-20 w-40 h-40 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200, 50, 70, 0.1), transparent)",
              opacity: scrollProgress,
            }}
          />
          <div
            className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(58, 123, 213, 0.08), transparent)",
              opacity: scrollProgress,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Star size={16} style={{ color: "rgb(200, 80, 100)" }} />
              <span className="text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>我们的故事</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, color: "white", marginBottom: "1.5rem" }}>
              {t("story.title")}
            </h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
              {t("story.content")}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden relative group">
            <img
              src="https://picsum.photos/seed/zw-story/800/600"
              alt="Our Story"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{ filter: "brightness(0.7) contrast(1.1)" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{ background: "linear-gradient(135deg, rgba(200, 50, 70, 0.3), transparent)" }}
            />
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
              <ArrowUpRight size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div
          className="mb-8"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.25) * 5)),
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Target size={16} style={{ color: "rgb(200, 80, 100)" }} />
            <span className="text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>核心价值</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "white" }}>
            {t("values.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ key, icon: Icon, color }, index) => (
            <div
              key={key}
              className="group p-8 rounded-xl transition-all duration-500 hover:translate-y-[-6px] relative overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                opacity: Math.min(1, Math.max(0, (scrollProgress - 0.3 - index * 0.05) * 5)),
                transform: `translateY(${Math.max(0, (0.5 - scrollProgress + index * 0.05) * 30)}px)`,
              }}
            >
              {/* Hover background glow */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)`,
                }}
              />

              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 relative z-10"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={28} weight="duotone" />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "0.75rem" }} className="relative z-10">
                {t(`values.${key}.title`)}
              </h3>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }} className="relative z-10">
                {t(`values.${key}.description`)}
              </p>
              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        <div
          className="mb-8"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.4) * 5)),
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Users size={16} style={{ color: "rgb(200, 80, 100)" }} />
            <span className="text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>团队成员</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "white" }}>
            {t("team.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(({ key, image, color }, index) => (
            <div
              key={key}
              className="group text-center p-8 rounded-xl transition-all duration-500 hover:translate-y-[-6px] relative overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                opacity: Math.min(1, Math.max(0, (scrollProgress - 0.45 - index * 0.05) * 5)),
                transform: `translateY(${Math.max(0, (0.6 - scrollProgress + index * 0.05) * 30)}px)`,
              }}
            >
              {/* Hover background glow */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${color}08, transparent 70%)`,
                }}
              />

              <div className="aspect-square rounded-xl overflow-hidden mb-6 max-w-[200px] mx-auto relative">
                <img
                  src={image}
                  alt={t(`team.members.${key}.name`)}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ filter: "brightness(0.75)" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
                />
                {/* Hover border */}
                <div
                  className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ border: `2px solid ${color}40` }}
                />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white" }} className="relative z-10">
                {t(`team.members.${key}.name`)}
              </h3>
              <p style={{ fontSize: "0.875rem", fontWeight: 500, marginTop: "0.25rem", marginBottom: "0.5rem", color: "rgb(200, 80, 100)" }} className="relative z-10">
                {t(`team.members.${key}.role`)}
              </p>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.5, color: "rgba(255,255,255,0.4)" }} className="relative z-10">
                {t(`team.members.${key}.bio`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
