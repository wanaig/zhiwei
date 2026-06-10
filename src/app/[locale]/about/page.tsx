"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Target, Lightbulb, Handshake } from "@phosphor-icons/react";

const darkBg = "rgb(6, 6, 10)";
const darkSurface = "rgba(255,255,255,0.02)";
const border = "rgba(255,255,255,0.06)";

export default function AboutPage() {
  const t = useTranslations("about");
  const reduce = useReducedMotion();

  const values = [
    { key: "quality", icon: Target },
    { key: "innovation", icon: Lightbulb },
    { key: "partnership", icon: Handshake },
  ];

  const teamMembers = [
    { key: "founder", image: "https://picsum.photos/seed/zw-team1/400/400" },
    { key: "designer", image: "https://picsum.photos/seed/zw-team2/400/400" },
    { key: "developer", image: "https://picsum.photos/seed/zw-team3/400/400" },
  ];

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: darkBg }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-20">
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

        {/* Story */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28"
        >
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, color: "white", marginBottom: "1.5rem" }}>
              {t("story.title")}
            </h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
              {t("story.content")}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
            <img src="https://picsum.photos/seed/zw-story/800/600" alt="Our Story" className="w-full h-full object-cover" style={{ filter: "brightness(0.7) contrast(1.1)" }} loading="lazy" />
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-28">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "white", marginBottom: "3rem" }}
          >
            {t("values.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-xl"
                style={{ backgroundColor: darkSurface, border: `1px solid ${border}` }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(200, 50, 70, 0.15)", color: "rgb(200, 80, 100)" }}>
                  <Icon size={24} weight="duotone" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white", marginBottom: "0.75rem" }}>
                  {t(`values.${key}.title`)}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>
                  {t(`values.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "white", marginBottom: "3rem" }}
          >
            {t("team.title")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(({ key, image }, index) => (
              <motion.div
                key={key}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-5 max-w-[260px] mx-auto" style={{ border: `1px solid ${border}` }}>
                  <img src={image} alt={t(`team.members.${key}.name`)} className="w-full h-full object-cover" style={{ filter: "brightness(0.75)" }} loading="lazy" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "white" }}>
                  {t(`team.members.${key}.name`)}
                </h3>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, marginTop: "0.25rem", marginBottom: "0.5rem", color: "rgb(200, 80, 100)" }}>
                  {t(`team.members.${key}.role`)}
                </p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.5, color: "rgba(255,255,255,0.4)" }}>
                  {t(`team.members.${key}.bio`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
