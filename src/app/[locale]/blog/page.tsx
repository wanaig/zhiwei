"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Tag, Newspaper } from "@phosphor-icons/react";
import BlogHero from "@/components/home/BlogHero";

const posts = [
  { id: 1, slug: "nextjs-15-new-features", title: "Next.js 15 新特性解析", excerpt: "深入了解 Next.js 15 带来的性能改进和新功能，包括 Turbopack、Server Actions 等。", date: "2026-03-15", readTime: "8 分钟", tags: ["Next.js", "React", "前端"], image: "https://picsum.photos/seed/zw-blog1/1200/600", color: "#c83246" },
  { id: 2, slug: "tailwind-css-best-practices", title: "Tailwind CSS 最佳实践", excerpt: "分享我们在实际项目中积累的 Tailwind CSS 使用技巧和架构经验。", date: "2026-03-10", readTime: "6 分钟", tags: ["CSS", "Tailwind", "前端"], image: "https://picsum.photos/seed/zw-blog2/1200/600", color: "#3a7bd5" },
  { id: 3, slug: "ai-in-web-development", title: "AI 在 Web 开发中的应用", excerpt: "探讨人工智能如何改变 Web 开发的工作流程，以及我们可以如何利用这些工具。", date: "2026-03-05", readTime: "10 分钟", tags: ["AI", "开发工具", "趋势"], image: "https://picsum.photos/seed/zw-blog3/1200/600", color: "#2db89a" },
  { id: 4, slug: "database-design-patterns", title: "数据库设计模式", excerpt: "常见的数据库设计模式和优化策略，帮助你构建更高效的后端系统。", date: "2026-02-28", readTime: "12 分钟", tags: ["数据库", "后端", "架构"], image: "https://picsum.photos/seed/zw-blog4/1200/600", color: "#9b59b6" },
  { id: 5, slug: "react-performance-tips", title: "React 性能优化技巧", excerpt: "从渲染优化到代码分割，全面提升 React 应用的性能表现。", date: "2026-02-20", readTime: "9 分钟", tags: ["React", "性能", "前端"], image: "https://picsum.photos/seed/zw-blog5/1200/600", color: "#e67e22" },
  { id: 6, slug: "devops-practices", title: "DevOps 实践指南", excerpt: "从 CI/CD 到容器化，分享我们的 DevOps 实践经验。", date: "2026-02-15", readTime: "11 分钟", tags: ["DevOps", "Docker", "CI/CD"], image: "https://picsum.photos/seed/zw-blog6/1200/600", color: "#07c160" },
];

const allTags = [...new Set(posts.flatMap((p) => p.tags))];

export default function BlogPage() {
  const t = useTranslations("blog");
  const [activeTag, setActiveTag] = useState<string | null>(null);
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

  const filteredPosts = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <section ref={sectionRef} style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      <BlogHero />

      {/* Tags filter */}
      <div
        className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-12"
        style={{
          opacity: Math.min(1, Math.max(0, (scrollProgress - 0.1) * 5)),
          transform: `translateY(${Math.max(0, (0.3 - scrollProgress) * 30)}px)`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Newspaper size={16} style={{ color: "rgb(200, 80, 100)" }} />
          <span className="text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>筛选文章</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-400 hover:scale-105"
            style={{
              backgroundColor: activeTag === null ? "rgb(200, 50, 70)" : "transparent",
              color: activeTag === null ? "white" : "rgba(255,255,255,0.4)",
              border: activeTag === null ? "none" : "1px solid rgba(255,255,255,0.1)",
              boxShadow: activeTag === null ? "0 4px 20px rgba(200, 50, 70, 0.3)" : "none",
            }}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-400 hover:scale-105"
              style={{
                backgroundColor: activeTag === tag ? "rgb(200, 50, 70)" : "transparent",
                color: activeTag === tag ? "white" : "rgba(255,255,255,0.4)",
                border: activeTag === tag ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: activeTag === tag ? "0 4px 20px rgba(200, 50, 70, 0.3)" : "none",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        {/* Featured post (first one) */}
        {filteredPosts.length > 0 && (
          <FeaturedPost post={filteredPosts[0]} readMore={t("readMore")} scrollProgress={scrollProgress} />
        )}

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredPosts.slice(1).map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              readMore={t("readMore")}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPost({ post, readMore, scrollProgress }: { post: typeof posts[0]; readMore: string; scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl overflow-hidden relative"
        style={{
          backgroundColor: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${isHovered ? `${post.color}30` : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              style={{
                filter: isHovered ? "brightness(0.8) contrast(1.1) saturate(1.1)" : "brightness(0.7) contrast(1.1)",
              }}
              loading="lazy"
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${post.color}40, transparent)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
            {/* Badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold transition-transform duration-300"
              style={{
                backgroundColor: post.color,
                color: "white",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              精选
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 transition-colors duration-300" style={{ color: isHovered ? "rgb(200, 80, 100)" : "white" }}>
              {post.title}
            </h2>
            <p className="text-base mb-6 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                    color: isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                    border: `1px solid ${isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
              style={{ color: post.color }}
            >
              {readMore}
              <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function PostCard({ post, index, readMore, scrollProgress }: { post: typeof posts[0]; index: number; readMore: string; scrollProgress: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-xl overflow-hidden h-full transition-all duration-500 hover:translate-y-[-6px] relative"
        style={{
          backgroundColor: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${isHovered ? `${post.color}30` : "rgba(255,255,255,0.05)"}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            style={{
              filter: isHovered ? "brightness(0.8) contrast(1.1) saturate(1.1)" : "brightness(0.65) contrast(1.1)",
            }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(to top, ${post.color}40, transparent)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
          {/* Color bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
            style={{
              backgroundColor: post.color,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 transition-colors duration-300" style={{ color: isHovered ? "rgb(200, 80, 100)" : "white" }}>
            {post.title}
          </h3>
          <p className="text-sm mb-4 line-clamp-2" style={{ color: "rgba(255,255,255,0.35)" }}>
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  color: isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
                  border: `1px solid ${isHovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
