"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { EnvelopeSimple, WechatLogo, GithubLogo, MapPin, PaperPlaneTilt } from "@phosphor-icons/react";

const darkBg = "rgb(6, 6, 10)";
const darkSurface = "rgba(255,255,255,0.02)";
const border = "rgba(255,255,255,0.06)";

export default function ContactPage() {
  const t = useTranslations("contact");
  const reduce = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus("success");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const contactInfo = [
    { icon: EnvelopeSimple, label: t("info.email"), href: `mailto:${t("info.email")}` },
    { icon: WechatLogo, label: t("info.wechat"), href: undefined },
    { icon: GithubLogo, label: "GitHub", href: `https://${t("info.github")}` },
    { icon: MapPin, label: t("info.location"), href: undefined },
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: "name", label: t("form.name"), type: "text", required: true },
                { id: "email", label: t("form.email"), type: "email", required: true },
                { id: "company", label: t("form.company"), type: "text", required: false },
              ].map(({ id, label, type, required }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    required={required}
                    className="w-full px-4 py-3 rounded-lg text-sm transition-colors duration-200 focus:outline-none"
                    style={{ backgroundColor: darkSurface, border: `1px solid ${border}`, color: "white" }}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{t("form.service")}</label>
                <select id="service" name="service" required className="w-full px-4 py-3 rounded-lg text-sm transition-colors duration-200 focus:outline-none" style={{ backgroundColor: darkSurface, border: `1px solid ${border}`, color: "white" }}>
                  <option value="">请选择...</option>
                  <option value="website">网站开发</option>
                  <option value="app">App开发</option>
                  <option value="system">系统开发</option>
                  <option value="miniapp">小程序</option>
                  <option value="ai">AI/数据</option>
                  <option value="ecommerce">电商开发</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{t("form.message")}</label>
                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-lg text-sm transition-colors duration-200 focus:outline-none resize-none" style={{ backgroundColor: darkSurface, border: `1px solid ${border}`, color: "white" }} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-base font-bold text-white transition-all duration-300 hover:shadow-[0_12px_40px_rgba(200,50,70,0.25)] active:scale-[0.98] disabled:opacity-50"
                style={{ backgroundColor: "rgb(200, 50, 70)" }}
              >
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />{t("form.sending")}</>
                ) : (
                  <><PaperPlaneTilt size={18} weight="bold" />{t("form.submit")}</>
                )}
              </button>

              {submitStatus === "success" && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>{t("form.success")}</motion.p>}
              {submitStatus === "error" && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>{t("form.error")}</motion.p>}
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "2rem" }}>{t("info.title")}</h2>
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(200, 50, 70, 0.15)", color: "rgb(200, 80, 100)" }}>
                    <Icon size={20} weight="duotone" />
                  </div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-base transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</a>
                  ) : (
                    <span className="text-base" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 aspect-[4/3] rounded-xl overflow-hidden" style={{ backgroundColor: darkSurface, border: `1px solid ${border}` }}>
              <div className="w-full h-full flex items-center justify-center">
                <MapPin size={48} weight="duotone" style={{ color: "rgba(200, 50, 70, 0.15)" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
