"use client";

import { useRef, useState, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function CTASection() {
  const t = useTranslations("hero.cta");
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ backgroundColor: "rgb(10, 10, 14)" }}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden p-12 md:p-20"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Mouse spotlight */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${mousePos.x - 200}px`,
              top: `${mousePos.y - 200}px`,
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(200, 50, 70, 0.08), transparent 60%)",
              transition: "left 0.15s, top 0.15s",
            }}
          />

          <div className="relative max-w-xl">
            <h2
              className="text-balance mb-5"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "white",
              }}
            >
              有项目想法？让我们聊聊
            </h2>
            <p
              className="text-lg mb-10 max-w-[35ch]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              无论是网站、App 还是系统开发，我们都能帮你把想法变成现实。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg text-base font-bold transition-all duration-300 hover:shadow-[0_16px_48px_rgba(200,50,70,0.25)] active:scale-[0.97]"
                style={{ backgroundColor: "rgb(200, 50, 70)", color: "white" }}
              >
                {t("contact")}
                <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all duration-300 hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {t("work")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
