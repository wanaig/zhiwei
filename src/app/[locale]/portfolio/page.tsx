"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

const darkBg = "rgb(6, 6, 10)";
const darkSurface = "rgba(255,255,255,0.02)";
const border = "rgba(255,255,255,0.06)";

const projects = [
  { id: 1, title: "企业官网重构", category: "website", image: "https://picsum.photos/seed/zw-p1/800/600", tags: ["Next.js", "Tailwind", "TypeScript"], description: "为某科技公司重新设计的响应式官网，性能提升200%" },
  { id: 2, title: "电商平台开发", category: "ecommerce", image: "https://picsum.photos/seed/zw-p2/800/600", tags: ["React", "Node.js", "PostgreSQL"], description: "全功能电商平台，包含商品管理、订单系统、支付集成" },
  { id: 3, title: "AI数据分析系统", category: "ai", image: "https://picsum.photos/seed/zw-p3/800/600", tags: ["Python", "TensorFlow", "FastAPI"], description: "基于机器学习的数据分析平台，自动生成业务洞察报告" },
  { id: 4, title: "移动端App", category: "app", image: "https://picsum.photos/seed/zw-p4/800/600", tags: ["React Native", "Firebase"], description: "跨平台移动应用，支持iOS和Android，用户超过10万" },
  { id: 5, title: "微信小程序", category: "miniapp", image: "https://picsum.photos/seed/zw-p5/800/600", tags: ["微信原生", "云开发"], description: "社区服务小程序，日活用户5000+" },
  { id: 6, title: "后台管理系统", category: "system", image: "https://picsum.photos/seed/zw-p6/800/600", tags: ["Vue.js", "Element Plus", "Java"], description: "企业级后台管理系统，支持多角色权限控制" },
];

const filterKeys = ["all", "website", "app", "system", "miniapp", "ai", "ecommerce"] as const;

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const reduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: darkBg }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "white" }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-lg max-w-[40ch]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filterKeys.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                backgroundColor: activeFilter === filter ? "rgb(200, 50, 70)" : darkSurface,
                color: activeFilter === filter ? "white" : "rgba(255,255,255,0.4)",
                border: activeFilter === filter ? "1px solid rgb(200, 50, 70)" : `1px solid ${border}`,
              }}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/portfolio/${project.id}`}
                  className="group block rounded-xl overflow-hidden transition-all duration-400 hover:translate-y-[-4px]"
                  style={{ backgroundColor: darkSurface, border: `1px solid ${border}` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: "brightness(0.75) contrast(1.1)" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wider" style={{ backgroundColor: "rgba(200, 50, 70, 0.15)", color: "rgb(200, 100, 120)" }}>
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[rgb(200,80,100)] transition-colors duration-300" style={{ color: "white" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs rounded" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: `1px solid ${border}` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
