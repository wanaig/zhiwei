"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "@phosphor-icons/react";

const darkBg = "rgb(6, 6, 10)";
const darkSurface = "rgba(255,255,255,0.02)";
const border = "rgba(255,255,255,0.06)";

const posts = [
  { id: 1, slug: "nextjs-15-new-features", title: "Next.js 15 新特性解析", excerpt: "深入了解 Next.js 15 带来的性能改进和新功能。", date: "2024-03-15", readTime: "8 分钟", tags: ["Next.js", "React"], image: "https://picsum.photos/seed/zw-blog1/800/450" },
  { id: 2, slug: "tailwind-css-best-practices", title: "Tailwind CSS 最佳实践", excerpt: "分享我们在实际项目中积累的 Tailwind CSS 使用技巧。", date: "2024-03-10", readTime: "6 分钟", tags: ["CSS", "Tailwind"], image: "https://picsum.photos/seed/zw-blog2/800/450" },
  { id: 3, slug: "ai-in-web-development", title: "AI 在 Web 开发中的应用", excerpt: "探讨人工智能如何改变 Web 开发的工作流程。", date: "2024-03-05", readTime: "10 分钟", tags: ["AI", "趋势"], image: "https://picsum.photos/seed/zw-blog3/800/450" },
  { id: 4, slug: "database-design-patterns", title: "数据库设计模式", excerpt: "常见的数据库设计模式和优化策略。", date: "2024-02-28", readTime: "12 分钟", tags: ["数据库", "后端"], image: "https://picsum.photos/seed/zw-blog4/800/450" },
];

export default function BlogPage() {
  const t = useTranslations("blog");
  const reduce = useReducedMotion();

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-xl overflow-hidden transition-all duration-400 hover:translate-y-[-4px]"
                style={{ backgroundColor: darkSurface, border: `1px solid ${border}` }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: "brightness(0.7) contrast(1.1)" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                    <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-[rgb(200,80,100)] transition-colors duration-300" style={{ color: "white" }}>
                    {post.title}
                  </h2>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs rounded" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: `1px solid ${border}` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-[rgb(200,80,100)] transition-colors duration-300" style={{ color: "rgb(200, 80, 100)" }}>
                    {t("readMore")}
                    <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
