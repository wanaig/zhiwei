"use client";

import { useRef, useState, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

const projects = [
  {
    id: 1,
    title: "企业官网重构",
    category: "website",
    image: "https://picsum.photos/seed/zw-dark1/1200/800",
    tags: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 2,
    title: "电商平台开发",
    category: "ecommerce",
    image: "https://picsum.photos/seed/zw-dark2/1200/800",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 3,
    title: "AI数据分析系统",
    category: "ai",
    image: "https://picsum.photos/seed/zw-dark3/1200/800",
    tags: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    id: 4,
    title: "移动端App",
    category: "app",
    image: "https://picsum.photos/seed/zw-dark4/1200/800",
    tags: ["React Native", "Firebase"],
  },
];

export default function FeaturedWork() {
  const t = useTranslations("portfolio");
  const reduce = useReducedMotion();

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "rgb(6, 6, 10)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2
            className="text-balance max-w-2xl"
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
            className="mt-5 text-lg max-w-[45ch]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              reduce={reduce}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:gap-4"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t("viewAll")}
            <ArrowUpRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  reduce,
}: {
  project: (typeof projects)[number];
  index: number;
  reduce: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className="group cursor-pointer"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        <Link
          href={`/portfolio/${project.id}`}
          className="block rounded-xl overflow-hidden"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: isHovered
              ? "0 25px 60px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(0,0,0,0.2)",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ filter: "brightness(0.8) contrast(1.1)" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
              style={{ backgroundColor: "rgba(6, 6, 10, 0.5)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgb(200, 50, 70)",
                  color: "white",
                }}
              >
                <ArrowUpRight size={24} weight="bold" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wider transition-colors duration-300"
                style={{
                  backgroundColor: isHovered ? "rgb(200, 50, 70)" : "rgba(255,255,255,0.06)",
                  color: isHovered ? "white" : "rgba(255,255,255,0.4)",
                }}
              >
                {project.category}
              </span>
            </div>
            <h3
              className="text-xl font-semibold mb-3 transition-colors duration-300"
              style={{ color: isHovered ? "rgb(200, 80, 100)" : "white" }}
            >
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? "rgba(200, 50, 70, 0.15)" : "rgba(255,255,255,0.04)",
                    color: isHovered ? "rgba(200, 120, 140, 0.9)" : "rgba(255,255,255,0.35)",
                    border: isHovered ? "1px solid rgba(200, 50, 70, 0.2)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
