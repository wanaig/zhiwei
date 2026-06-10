"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";

const projects = [
  {
    id: 1,
    title: "企业官网重构",
    category: "website",
    year: "2026",
    image: "https://picsum.photos/seed/zw-ft1/1200/800",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    color: "rgb(200, 50, 70)",
  },
  {
    id: 2,
    title: "电商平台开发",
    category: "ecommerce",
    year: "2026",
    image: "https://picsum.photos/seed/zw-ft2/1200/800",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "rgb(80, 120, 220)",
  },
  {
    id: 3,
    title: "AI数据分析系统",
    category: "ai",
    year: "2026",
    image: "https://picsum.photos/seed/zw-ft3/1200/800",
    tags: ["Python", "TensorFlow", "FastAPI"],
    color: "rgb(60, 180, 160)",
  },
  {
    id: 4,
    title: "移动端App",
    category: "app",
    year: "2026",
    image: "https://picsum.photos/seed/zw-ft4/1200/800",
    tags: ["React Native", "Firebase"],
    color: "rgb(180, 100, 200)",
  },
];

export default function FeaturedWork() {
  const t = useTranslations("portfolio");
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

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
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: "rgb(6, 6, 10)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div
              className="text-xs font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: "rgb(200, 80, 100)" }}
            >
              Selected Work
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
          </div>
          <Link
            href="/portfolio"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {t("viewAll")}
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Projects list */}
        <div className="space-y-3">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleCards.includes(index)}
            />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t("viewAll")}
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[number];
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width);
  };

  return (
    <div
      data-index={index}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <div
        className="group block rounded-xl overflow-hidden cursor-pointer"
        style={{
          backgroundColor: isHovered
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${
            isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
          }`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Link href={`/portfolio/${project.id}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                filter: isHovered
                  ? "brightness(0.8) contrast(1.1)"
                  : "brightness(0.6) contrast(1.05)",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
              }}
              loading="lazy"
            />
            {/* Color overlay on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${project.color}33, transparent)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
            {/* Arrow icon */}
            <div
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400"
              style={{
                backgroundColor: isHovered ? project.color : "rgba(255,255,255,0.1)",
                color: "white",
                transform: isHovered
                  ? "translate(0, 0) scale(1)"
                  : "translate(10px, 10px) scale(0.8)",
                opacity: isHovered ? 1 : 0,
              }}
            >
              <ArrowUpRight size={18} weight="bold" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 p-6 lg:p-8 flex items-center">
            <div className="flex-1">
              {/* Category + Year */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wider transition-all duration-300"
                  style={{
                    backgroundColor: isHovered
                      ? `${project.color}22`
                      : "rgba(255,255,255,0.04)",
                    color: isHovered
                      ? project.color
                      : "rgba(255,255,255,0.35)",
                    border: `1px solid ${
                      isHovered
                        ? `${project.color}33`
                        : "rgba(255,255,255,0.06)"
                    }`,
                  }}
                >
                  {project.category}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-xl lg:text-2xl font-semibold mb-3 transition-colors duration-300"
                style={{
                  color: isHovered ? "white" : "rgba(255,255,255,0.7)",
                }}
              >
                {project.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded transition-all duration-300"
                    style={{
                      backgroundColor: isHovered
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.03)",
                      color: isHovered
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.25)",
                      border: `1px solid ${
                        isHovered
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.04)"
                      }`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Number */}
            <div
              className="hidden lg:block text-6xl font-bold transition-colors duration-300"
              style={{
                color: isHovered
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.03)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}
