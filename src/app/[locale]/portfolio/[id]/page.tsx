"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, GithubLogo, Globe, CheckCircle } from "@phosphor-icons/react";

const projects = [
  { id: 1, title: "企业官网重构", category: "website", year: "2026", image: "https://picsum.photos/seed/zw-port1/1200/800", tags: ["Next.js", "Tailwind", "TypeScript"], color: "#c83246", description: "为一家大型企业重新设计和开发的官方网站，采用现代化的技术栈，实现了极致的性能和用户体验。", features: ["响应式设计", "SEO优化", "高性能加载", "CMS集成"], github: "https://github.com/wanaig", live: "#" },
  { id: 2, title: "电商平台开发", category: "ecommerce", year: "2026", image: "https://picsum.photos/seed/zw-port2/1200/800", tags: ["React", "Node.js", "PostgreSQL"], color: "#3a7bd5", description: "全功能电商平台，包含商品管理、订单系统、支付集成和营销工具，支持高并发访问。", features: ["商品管理", "订单系统", "支付集成", "营销工具"], github: "https://github.com/wanaig", live: "#" },
  { id: 3, title: "AI数据分析系统", category: "ai", year: "2026", image: "https://picsum.photos/seed/zw-port3/1200/800", tags: ["Python", "TensorFlow", "FastAPI"], color: "#2db89a", description: "基于机器学习的数据分析平台，提供智能数据洞察、自动化报表和预测分析功能。", features: ["数据分析", "机器学习", "自动化流程", "智能推荐"], github: "https://github.com/wanaig", live: "#" },
  { id: 4, title: "移动端App", category: "app", year: "2026", image: "https://picsum.photos/seed/zw-port4/1200/800", tags: ["React Native", "Firebase"], color: "#9b59b6", description: "跨平台移动应用，提供流畅的用户体验和原生级性能，支持iOS和Android平台。", features: ["原生体验", "跨平台方案", "推送通知", "离线支持"], github: "https://github.com/wanaig", live: "#" },
  { id: 5, title: "微信小程序", category: "miniapp", year: "2026", image: "https://picsum.photos/seed/zw-port5/1200/800", tags: ["微信原生", "云开发"], color: "#07c160", description: "微信生态小程序，快速触达用户，支持支付、分享和裂变传播。", features: ["快速上线", "微信生态", "支付集成", "分享裂变"], github: "https://github.com/wanaig", live: "#" },
  { id: 6, title: "后台管理系统", category: "system", year: "2026", image: "https://picsum.photos/seed/zw-port6/1200/800", tags: ["Vue.js", "Element Plus", "Java"], color: "#e67e22", description: "企业级后台管理系统，包含权限管理、数据统计、日志审计等功能模块。", features: ["高可用架构", "数据安全", "权限管理", "API设计"], github: "https://github.com/wanaig", live: "#" },
];

export default function PortfolioDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const t = useTranslations("portfolio");
  const [projectId, setProjectId] = useState<number>(0);

  useEffect(() => {
    params.then(({ id }) => setProjectId(parseInt(id)));
  }, [params]);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section style={{ backgroundColor: "rgb(6, 6, 10)", minHeight: "100vh" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="text-center">
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "white" }}>项目未找到</h1>
            <Link href="/portfolio" className="mt-4 inline-flex items-center gap-2 text-sm" style={{ color: "rgb(200, 80, 100)" }}>
              <ArrowLeft size={16} />
              返回作品集
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden pt-24 md:pt-32 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${project.color}06 1px, transparent 1px),
              linear-gradient(90deg, ${project.color}06 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at top center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top center, black 30%, transparent 70%)",
          }}
        />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${project.color}08, transparent 60%)`,
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Back button */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm mb-12 transition-all duration-300 hover:gap-3 group"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            返回作品集
          </Link>

          {/* Category + Year */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full"
              style={{ backgroundColor: `${project.color}20`, color: project.color }}
            >
              {project.category}
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Calendar size={14} />
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "white", marginBottom: "1.5rem" }}>
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-lg max-w-[60ch] mb-8" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
            style={{ filter: "brightness(0.85) contrast(1.05)" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8" style={{ color: "white" }}>项目概述</h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.5)" }}>
              {project.description}
            </p>

            <h3 className="text-xl font-bold mb-6" style={{ color: "white" }}>核心功能</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {project.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 hover:translate-x-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <CheckCircle size={20} style={{ color: project.color }} />
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Additional images */}
            <h3 className="text-xl font-bold mb-6" style={{ color: "white" }}>项目展示</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                <img src={`https://picsum.photos/seed/zw-detail1-${project.id}/600/400`} alt="展示1" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                <img src={`https://picsum.photos/seed/zw-detail2-${project.id}/600/400`} alt="展示2" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-6">
              {/* Links */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 className="text-lg font-bold mb-5" style={{ color: "white" }}>项目链接</h3>
                
                <div className="space-y-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 hover:translate-x-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <GithubLogo size={20} style={{ color: "rgba(255,255,255,0.5)" }} />
                    <span className="flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>GitHub</span>
                    <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 hover:translate-x-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <Globe size={20} style={{ color: "rgba(255,255,255,0.5)" }} />
                    <span className="flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>在线预览</span>
                    <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
                  </a>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 className="text-lg font-bold mb-5" style={{ color: "white" }}>技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-2 text-sm rounded-lg"
                      style={{ backgroundColor: `${project.color}15`, color: project.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: `${project.color}08`, border: `1px solid ${project.color}15` }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: "white" }}>需要类似项目？</h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  我们可以帮你实现类似的项目
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  style={{ backgroundColor: project.color, color: "white" }}
                >
                  咨询项目
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
