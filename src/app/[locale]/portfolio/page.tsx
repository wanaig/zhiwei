"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowUpRight, Funnel } from "@phosphor-icons/react";
import PortfolioHero from "@/components/home/PortfolioHero";

const projects = [
  { id: 1, title: "企业官网重构", category: "website", year: "2026", image: "https://picsum.photos/seed/zw-port1/1200/800", tags: ["Next.js", "Tailwind", "TypeScript"], color: "#c83246" },
  { id: 2, title: "电商平台开发", category: "ecommerce", year: "2026", image: "https://picsum.photos/seed/zw-port2/1200/800", tags: ["React", "Node.js", "PostgreSQL"], color: "#3a7bd5" },
  { id: 3, title: "AI数据分析系统", category: "ai", year: "2026", image: "https://picsum.photos/seed/zw-port3/1200/800", tags: ["Python", "TensorFlow", "FastAPI"], color: "#2db89a" },
  { id: 4, title: "移动端App", category: "app", year: "2026", image: "https://picsum.photos/seed/zw-port4/1200/800", tags: ["React Native", "Firebase"], color: "#9b59b6" },
  { id: 5, title: "微信小程序", category: "miniapp", year: "2026", image: "https://picsum.photos/seed/zw-port5/1200/800", tags: ["微信原生", "云开发"], color: "#07c160" },
  { id: 6, title: "后台管理系统", category: "system", year: "2026", image: "https://picsum.photos/seed/zw-port6/1200/800", tags: ["Vue.js", "Element Plus", "Java"], color: "#e67e22" },
];

const filterKeys = ["all", "website", "app", "system", "miniapp", "ai", "ecommerce"] as const;

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [scrollProgress, setScrollProgress] = useState(1); // Start with 1

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      <PortfolioHero />

      {/* Filters */}
      <div
        className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-12 pt-12"
        style={{
          opacity: 1,
          transform: "none",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Funnel size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>筛选项目</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterKeys.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-400 hover:scale-105"
              style={{
                backgroundColor: activeFilter === filter ? "rgb(200, 50, 70)" : "transparent",
                color: activeFilter === filter ? "white" : "rgba(255,255,255,0.4)",
                border: activeFilter === filter ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: activeFilter === filter ? "0 4px 20px rgba(200, 50, 70, 0.3)" : "none",
              }}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        <div className="space-y-6">
          {filteredProjects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.5s ease-out ${index * 0.08}s`,
      }}
    >
      <Link
        href={`/portfolio/${project.id}`}
        className="group block rounded-2xl overflow-hidden relative"
        style={{
          backgroundColor: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${isHovered ? `${project.color}40` : "rgba(255,255,255,0.05)"}`,
          transition: "border-color 0.3s ease, background-color 0.3s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Image */}
          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                filter: isHovered ? "brightness(0.8) contrast(1.1)" : "brightness(0.65)",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
              loading="lazy"
            />
            {/* Color overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${project.color}30, transparent)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
            {/* Arrow */}
            <div
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: isHovered ? project.color : "rgba(255,255,255,0.1)",
                color: isHovered ? "white" : "rgba(255,255,255,0.4)",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "scale(1)" : "scale(0.8)",
              }}
            >
              <ArrowUpRight size={18} weight="bold" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 p-6 lg:p-8 flex items-center">
            <div className="flex-1">
              {/* Number + Category */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="text-xs font-mono"
                  style={{ color: isHovered ? project.color : "rgba(255,255,255,0.15)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: isHovered ? `${project.color}20` : "rgba(255,255,255,0.04)",
                    color: isHovered ? project.color : "rgba(255,255,255,0.3)",
                    border: `1px solid ${isHovered ? `${project.color}30` : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-xl lg:text-2xl font-bold mb-4 transition-colors duration-300"
                style={{ color: isHovered ? "white" : "rgba(255,255,255,0.7)" }}
              >
                {project.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      color: isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                      border: `1px solid ${isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Large number */}
            <div
              className="hidden lg:block text-7xl font-bold transition-colors duration-500"
              style={{ color: isHovered ? `${project.color}15` : "rgba(255,255,255,0.02)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
