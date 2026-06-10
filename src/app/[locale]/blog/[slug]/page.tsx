"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, GithubLogo, TwitterLogo, LinkedinLogo, Article, List } from "@phosphor-icons/react";

const posts = [
  { id: 1, slug: "nextjs-15-new-features", title: "Next.js 15 新特性解析", excerpt: "深入了解 Next.js 15 带来的性能改进和新功能，包括 Turbopack、Server Actions 等。", date: "2026-03-15", readTime: "8 分钟", tags: ["Next.js", "React", "前端"], image: "https://picsum.photos/seed/zw-blog1/1200/600", color: "#c83246", content: `Next.js 15 带来了许多令人兴奋的新特性和性能改进。让我们深入了解这些变化将如何影响我们的开发工作流程。

## Turbopack：更快的开发体验

Turbopack 是 Next.js 15 中最引人注目的新特性之一。它是一个基于 Rust 构建的增量打包工具，能够显著提升开发服务器的启动速度和热更新性能。

### 主要优势：
- **启动速度提升 10 倍**：相比传统的 Webpack，Turbopack 能够更快地启动开发服务器
- **增量编译**：只编译发生变化的模块，大大减少了重新编译的时间
- **内存效率**：使用更少的内存，适合大型项目

## Server Actions：简化表单处理

Server Actions 是 Next.js 15 中另一个重要的新特性，它让我们能够更简洁地处理表单提交和数据变更。

\`\`\`typescript
// 使用 Server Actions 处理表单
async function submitForm(formData: FormData) {
  'use server'
  const name = formData.get('name')
  // 处理表单数据...
}
\`\`\`

## 改进的缓存策略

Next.js 15 对缓存系统进行了重大改进，提供了更细粒度的控制和更好的性能。

### 新增功能：
- **按需重新验证**：可以在运行时精确控制哪些数据需要重新验证
- **改进的 ISR**：增量静态再生更加灵活和高效
- **更好的缓存控制**：新的 API 让缓存管理更加直观

## 总结

Next.js 15 是一个重要的版本更新，它不仅提升了开发体验，还为生产环境带来了显著的性能改进。建议所有 Next.js 项目都考虑升级到这个版本。` },
  { id: 2, slug: "tailwind-css-best-practices", title: "Tailwind CSS 最佳实践", excerpt: "分享我们在实际项目中积累的 Tailwind CSS 使用技巧和架构经验。", date: "2026-03-10", readTime: "6 分钟", tags: ["CSS", "Tailwind", "前端"], image: "https://picsum.photos/seed/zw-blog2/1200/600", color: "#3a7bd5", content: `Tailwind CSS 是一个功能类优先的 CSS 框架，它让我们能够快速构建现代化的用户界面。在这篇文章中，我们将分享一些在实际项目中积累的最佳实践。

## 1. 使用设计系统

Tailwind CSS 的配置文件是建立设计系统的绝佳位置。通过自定义主题，我们可以确保整个项目的一致性。

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
      },
    },
  },
}
\`\`\`

## 2. 组件提取策略

当类名变得冗长时，是时候考虑提取组件了。但要注意不要过早抽象。

### 何时提取：
- 当相同的类名组合出现 3 次以上时
- 当类名超过 10 个时
- 当需要在多个地方复用时

## 3. 响应式设计最佳实践

Tailwind 的响应式前缀让媒体查询变得简单。

## 4. 暗黑模式实现

使用 Tailwind 的暗黑模式功能，可以轻松实现主题切换。

## 5. 性能优化

- 使用 JIT 模式减少 CSS 文件大小
- 合理使用 purge 配置移除未使用的样式
- 避免在循环中动态生成类名

## 总结

Tailwind CSS 是一个强大的工具，但需要合理的使用策略。遵循这些最佳实践，可以帮助我们构建更可维护、更高效的项目。` },
  { id: 3, slug: "ai-in-web-development", title: "AI 在 Web 开发中的应用", excerpt: "探讨人工智能如何改变 Web 开发的工作流程，以及我们可以如何利用这些工具。", date: "2026-03-05", readTime: "10 分钟", tags: ["AI", "开发工具", "趋势"], image: "https://picsum.photos/seed/zw-blog3/1200/600", color: "#2db89a", content: `人工智能正在深刻改变 Web 开发的各个方面。从代码编写到用户体验优化，AI 工具正在成为开发者不可或缺的助手。

## 1. AI 辅助编码

现代 AI 编码助手能够理解上下文并提供智能代码建议。

### 主要工具：
- **GitHub Copilot**：基于 OpenAI 的代码补全工具
- **Cursor**：AI 驱动的代码编辑器
- **TabNine**：智能代码预测

## 2. AI 驱动的测试

AI 可以帮助我们编写更全面的测试，识别边界情况并生成相应测试用例。

## 3. 智能 UI/UX 优化

AI 可以分析用户行为数据，提供界面优化建议，包括 A/B 测试自动化和个性化推荐。

## 4. 自然语言处理在 Web 中的应用

- **聊天机器人**：智能客服和用户支持
- **内容生成**：自动化内容创作
- **搜索优化**：语义搜索和意图理解

## 5. 性能监控与优化

AI 可以帮助我们预测和预防性能问题，自动优化资源加载。

## 结论

AI 不会取代开发者，但会成为我们强大的工具。学会利用 AI 工具，可以让我们专注于更有创造性的工作。` },
  { id: 4, slug: "database-design-patterns", title: "数据库设计模式", excerpt: "常见的数据库设计模式和优化策略，帮助你构建更高效的后端系统。", date: "2026-02-28", readTime: "12 分钟", tags: ["数据库", "后端", "架构"], image: "https://picsum.photos/seed/zw-blog4/1200/600", color: "#9b59b6", content: `良好的数据库设计是构建高效后端系统的基础。本文将介绍一些常见的数据库设计模式和优化策略。

## 1. 范式化与反范式化

范式化是数据库设计的基础，它通过消除数据冗余来保证数据一致性。在某些场景下，适当的反范式化可以提升查询性能。

## 2. 索引优化策略

索引是提升查询性能的关键。为常用查询条件创建索引，避免过度索引，定期分析和优化索引。

## 3. 分区策略

对于大型表，分区可以显著提升性能。按日期、范围或列表进行分区。

## 4. 读写分离

通过主从复制实现读写分离，主库处理写操作，从库处理读操作。

## 5. 缓存策略

合理的缓存策略可以大幅减少数据库压力，包括查询缓存、对象缓存和 CDN 缓存。

## 总结

数据库设计需要根据具体业务场景选择合适的模式。没有万能的解决方案，关键是理解各种模式的优缺点。` },
  { id: 5, slug: "react-performance-tips", title: "React 性能优化技巧", excerpt: "从渲染优化到代码分割，全面提升 React 应用的性能表现。", date: "2026-02-20", readTime: "9 分钟", tags: ["React", "性能", "前端"], image: "https://picsum.photos/seed/zw-blog5/1200/600", color: "#e67e22", content: `React 应用的性能优化是一个重要的话题。本文将分享一些实用的性能优化技巧。

## 1. 使用 React.memo 避免不必要的渲染

当组件渲染开销较大且 Props 变化不频繁时，使用 React.memo 可以避免不必要的重新渲染。

## 2. 使用 useMemo 和 useCallback

useMemo 缓存计算结果，useCallback 缓存函数引用，避免在每次渲染时创建新的引用。

## 3. 代码分割

使用动态 import 实现代码分割，配合 Suspense 实现懒加载。

## 4. 虚拟列表

对于长列表，使用虚拟滚动只渲染可见区域的元素。

## 5. 状态管理优化

将状态提升到最近的公共父组件，使用 Context 时注意拆分。

## 6. 图片优化

使用懒加载、选择合适的图片格式、实现响应式图片。

## 总结

性能优化是一个持续的过程。关键是识别瓶颈，有针对性地优化。` },
  { id: 6, slug: "devops-practices", title: "DevOps 实践指南", excerpt: "从 CI/CD 到容器化，分享我们的 DevOps 实践经验。", date: "2026-02-15", readTime: "11 分钟", tags: ["DevOps", "Docker", "CI/CD"], image: "https://picsum.photos/seed/zw-blog6/1200/600", color: "#07c160", content: `DevOps 是一种文化和实践，旨在促进开发和运维团队之间的协作。本文将分享一些 DevOps 的最佳实践。

## 1. 持续集成（CI）

持续集成是 DevOps 的基础，通过自动化测试确保代码质量。频繁提交代码、自动化测试、快速反馈是关键。

## 2. 持续部署（CD）

自动化部署流程，减少人为错误，提高部署效率。

## 3. 容器化

使用 Docker 容器化应用，确保开发、测试、生产环境的一致性。

## 4. 基础设施即代码（IaC）

使用代码管理基础设施，实现版本控制和可重复部署。

## 5. 监控与日志

建立完善的监控体系，包括应用监控、基础设施监控和日志管理。

## 6. 安全实践

代码扫描、依赖漏洞检查、密钥管理和访问控制。

## 总结

DevOps 不仅仅是工具，更是一种文化。通过自动化和协作，我们可以更快、更可靠地交付软件。` },
];

export default function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const t = useTranslations("blog");
  const [postSlug, setPostSlug] = useState<string>("");
  const [activeHeading, setActiveHeading] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    params.then(({ slug }) => setPostSlug(slug));
  }, [params]);

  const post = posts.find((p) => p.slug === postSlug);

  // Extract headings from content
  const headings = post ? post.content.split('\n')
    .filter(line => line.startsWith('## ') || line.startsWith('### '))
    .map(line => ({
      text: line.replace(/^#{2,3}\s/, ''),
      level: line.startsWith('### ') ? 3 : 2,
      id: line.replace(/^#{2,3}\s/, '').replace(/[^\w\u4e00-\u9fa5]/g, '-').toLowerCase()
    })) : [];

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const headingElements = contentRef.current.querySelectorAll('h2, h3');
      let current = '';
      
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100) {
          current = el.id;
        }
      });
      
      if (current) setActiveHeading(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <section style={{ backgroundColor: "rgb(6, 6, 10)", minHeight: "100vh" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 md:pt-32">
          <div className="text-center">
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "white" }}>文章未找到</h1>
            <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-sm" style={{ color: "rgb(200, 80, 100)" }}>
              <ArrowLeft size={16} />
              返回博客
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
              linear-gradient(${post.color}06 1px, transparent 1px),
              linear-gradient(90deg, ${post.color}06 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at top center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top center, black 30%, transparent 70%)",
          }}
        />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${post.color}08, transparent 60%)`,
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-12 transition-all duration-300 hover:gap-3 group"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            返回博客
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-xs font-semibold rounded-full"
                style={{ backgroundColor: `${post.color}20`, color: post.color }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, color: "white", marginBottom: "1.5rem" }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg max-w-[60ch] mb-8" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Clock size={16} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              <Article size={16} />
              技术文章
            </span>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
            style={{ filter: "brightness(0.85) contrast(1.05)" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        <div className="relative">
          {/* Fixed Left Sidebar - Table of Contents */}
          <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-50" style={{ width: '240px' }}>
            <div className="ml-4 p-5 rounded-xl" style={{ backgroundColor: "rgba(6,6,10,0.95)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
              <div className="flex items-center gap-3 mb-4">
                <List size={16} style={{ color: post.color }} />
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>目录</h3>
              </div>
              <nav className="space-y-0.5">
                {headings.map((heading, index) => (
                  <a
                    key={index}
                    href={`#${heading.id}`}
                    className="block py-1.5 px-2.5 rounded text-xs transition-all duration-200 hover:translate-x-0.5"
                    style={{
                      paddingLeft: heading.level === 3 ? '1.25rem' : '0.625rem',
                      color: activeHeading === heading.id ? post.color : "rgba(255,255,255,0.4)",
                      backgroundColor: activeHeading === heading.id ? `${post.color}10` : "transparent",
                      borderLeft: activeHeading === heading.id ? `2px solid ${post.color}` : "2px solid transparent",
                    }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content - centered */}
          <div className="max-w-[800px] mx-auto" ref={contentRef}>
            <article className="prose prose-lg max-w-none">
              {(() => {
                const lines = post.content.split('\n');
                const elements: React.ReactNode[] = [];
                let inCodeBlock = false;
                let codeContent: string[] = [];
                let codeLanguage = '';

                // Simple syntax highlighting function
                const highlightCode = (code: string, language: string) => {
                  // Keywords
                  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await', 'new', 'this', 'try', 'catch', 'throw', 'typeof', 'instanceof'];
                  const builtins = ['console', 'document', 'window', 'Math', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Promise', 'Error', 'null', 'undefined', 'true', 'false', 'NaN', 'Infinity'];
                  
                  let highlighted = code;
                  
                  // Escape HTML
                  highlighted = highlighted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                  
                  // Comments (single line)
                  highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span style="color:#6a9955">$1</span>');
                  
                  // Strings
                  highlighted = highlighted.replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span style="color:#ce9178">$1</span>');
                  
                  // Keywords
                  keywords.forEach(keyword => {
                    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                    highlighted = highlighted.replace(regex, '<span style="color:#569cd6">$1</span>');
                  });
                  
                  // Builtins
                  builtins.forEach(builtin => {
                    const regex = new RegExp(`\\b(${builtin})\\b`, 'g');
                    highlighted = highlighted.replace(regex, '<span style="color:#4ec9b0">$1</span>');
                  });
                  
                  // Numbers
                  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#b5cea8">$1</span>');
                  
                  // Function calls
                  highlighted = highlighted.replace(/(\w+)(\s*\()/g, '<span style="color:#dcdcaa">$1</span>$2');
                  
                  // Types/Classes (capitalized words)
                  highlighted = highlighted.replace(/\b([A-Z]\w*)\b/g, '<span style="color:#4ec9b0">$1</span>');
                  
                  return highlighted;
                };

                lines.forEach((line, index) => {
                  if (line.startsWith('```')) {
                    if (!inCodeBlock) {
                      inCodeBlock = true;
                      codeLanguage = line.replace('```', '').trim() || 'code';
                      codeContent = [];
                    } else {
                      inCodeBlock = false;
                      elements.push(
                        <div key={`code-${index}`} className="my-8 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                          <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: "rgba(30,30,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="flex items-center gap-3">
                              <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                              </div>
                              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {codeLanguage}
                              </span>
                            </div>
                          </div>
                          <div className="relative">
                            <pre className="p-5 pl-14 overflow-x-auto" style={{ backgroundColor: "rgba(20,20,30,0.98)", margin: 0, lineHeight: "1.6" }}>
                              <code 
                                className="text-sm font-mono"
                                style={{ color: "#d4d4d4", tabSize: 2, lineHeight: "1.6" }}
                                dangerouslySetInnerHTML={{ __html: highlightCode(codeContent.join('\n'), codeLanguage) }}
                              />
                            </pre>
                            {/* Line numbers */}
                            <div className="absolute top-0 left-0 w-12 py-5 flex flex-col" style={{ backgroundColor: "rgba(0,0,0,0.2)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                              {codeContent.map((_, i) => (
                                <div key={i} className="text-right pr-3 text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)", lineHeight: "1.6", height: "1.6em" }}>
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return;
                  }

                  if (inCodeBlock) {
                    codeContent.push(line);
                    return;
                  }

                  if (line.startsWith('## ')) {
                    const headingId = line.replace('## ', '').replace(/[^\w\u4e00-\u9fa5]/g, '-').toLowerCase();
                    elements.push(
                      <h2 key={index} id={headingId} className="text-2xl font-bold mt-16 mb-6 pb-3 scroll-mt-24" style={{ color: post.color, borderBottom: `1px solid ${post.color}20` }}>
                        {line.replace('## ', '')}
                      </h2>
                    );
                  } else if (line.startsWith('### ')) {
                    const headingId = line.replace('### ', '').replace(/[^\w\u4e00-\u9fa5]/g, '-').toLowerCase();
                    elements.push(
                      <h3 key={index} id={headingId} className="text-xl font-bold mt-10 mb-4 scroll-mt-24" style={{ color: "rgba(255,255,255,0.95)" }}>
                        {line.replace('### ', '')}
                      </h3>
                    );
                  } else if (line.startsWith('- **')) {
                    const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
                    if (match) {
                      elements.push(
                        <div key={index} className="flex items-start gap-4 mb-4 pl-4" style={{ borderLeft: `2px solid ${post.color}30` }}>
                          <div className="w-2 h-2 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: post.color }} />
                          <div style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                            <strong style={{ color: post.color }}>{match[1]}</strong>: {match[2]}
                          </div>
                        </div>
                      );
                    }
                  } else if (line.startsWith('- ')) {
                    elements.push(
                      <div key={index} className="flex items-start gap-4 mb-4 pl-4" style={{ borderLeft: `2px solid ${post.color}30` }}>
                        <div className="w-2 h-2 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: post.color }} />
                        <div style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                          {line.replace('- ', '')}
                        </div>
                      </div>
                    );
                  } else if (line.trim() === '') {
                    elements.push(<div key={index} className="h-4" />);
                  } else {
                    // Check for inline code or emphasis
                    const processedText = line.replace(/`([^`]+)`/g, `<code style="color:${post.color};background:${post.color}10;padding:2px 6px;border-radius:4px;font-size:0.9em">$1</code>`);
                    
                    elements.push(
                      <p key={index} className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem" }}
                        dangerouslySetInnerHTML={{ __html: processedText }}
                      />
                    );
                  }
                });

                return elements;
              })()}
            </article>

            {/* Author info */}
            <div className="mt-16 p-8 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${post.color}20`, color: post.color }}>
                  <Article size={24} />
                </div>
                <div>
                  <div className="font-bold" style={{ color: "white" }}>知微工作室</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>技术团队</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
