"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

const projects = [
  { id: 1, title: "企业官网重构", category: "website", year: "2024", image: "https://picsum.photos/seed/zw-grid1/800/1000", tags: ["Next.js", "Tailwind"], color: "#c83246" },
  { id: 2, title: "电商平台开发", category: "ecommerce", year: "2024", image: "https://picsum.photos/seed/zw-grid2/800/600", tags: ["React", "Node.js"], color: "#3a7bd5" },
  { id: 3, title: "AI数据分析系统", category: "ai", year: "2023", image: "https://picsum.photos/seed/zw-grid3/800/800", tags: ["Python", "TensorFlow"], color: "#2db89a" },
  { id: 4, title: "移动端App", category: "app", year: "2023", image: "https://picsum.photos/seed/zw-grid4/800/1000", tags: ["React Native"], color: "#9b59b6" },
  { id: 5, title: "微信小程序", category: "miniapp", year: "2024", image: "https://picsum.photos/seed/zw-grid5/800/600", tags: ["微信原生"], color: "#07c160" },
  { id: 6, title: "后台管理系统", category: "system", year: "2023", image: "https://picsum.photos/seed/zw-grid6/800/800", tags: ["Vue.js", "Java"], color: "#e67e22" },
];

const filterKeys = ["all", "website", "app", "system", "miniapp", "ai", "ecommerce"] as const;

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="min-h-screen" style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
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

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filterKeys.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeFilter === filter ? "rgb(200, 50, 70)" : "transparent",
                color: activeFilter === filter ? "white" : "rgba(255,255,255,0.4)",
                border: activeFilter === filter ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredProjects.map((project, index) => (
            <MasonryCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredId === project.id}
              onHover={() => setHoveredId(project.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MasonryCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[number];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Vary aspect ratios for visual interest
  const aspectRatios = ["4/5", "3/4", "1/1", "4/5", "3/4", "1/1"];
  const aspectRatio = aspectRatios[index % aspectRatios.length];

  return (
    <div
      ref={ref}
      className="break-inside-avoid"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
      }}
    >
      <Link
        href={`/portfolio/${project.id}`}
        className="group block relative overflow-hidden rounded-xl"
        style={{
          border: `1px solid ${isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}`,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: isHovered ? "brightness(0.7) contrast(1.1) saturate(1.1)" : "brightness(0.85) contrast(1.05)",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            }}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, ${project.color}cc 0%, ${project.color}33 40%, transparent 100%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: "linear-gradient(to top, rgba(6,6,10,0.9) 0%, rgba(6,6,10,0.3) 50%, transparent 100%)",
              opacity: isHovered ? 1 : 0.4,
            }}
          />

          {/* Top right arrow */}
          <div
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400"
            style={{
              backgroundColor: isHovered ? "white" : "rgba(255,255,255,0.1)",
              color: isHovered ? "rgb(6,6,10)" : "rgba(255,255,255,0.6)",
              transform: isHovered ? "scale(1) rotate(0)" : "scale(0.7) rotate(-45deg)",
              opacity: isHovered ? 1 : 0,
            }}
          >
            <ArrowUpRight size={16} weight="bold" />
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            {/* Category + Year */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                style={{ color: isHovered ? "white" : "rgba(255,255,255,0.5)" }}
              >
                {project.category}
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-lg md:text-xl font-bold transition-colors duration-300"
              style={{ color: isHovered ? "white" : "rgba(255,255,255,0.8)" }}
            >
              {project.title}
            </h3>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-1.5 mt-3 transition-all duration-400"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(10px)",
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
