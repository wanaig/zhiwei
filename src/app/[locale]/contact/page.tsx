"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { WechatLogo, GithubLogo, MapPin, PaperPlaneTilt, ArrowUpRight, EnvelopeSimple, ChatCircle, Phone } from "@phosphor-icons/react";
import ContactHero from "@/components/home/ContactHero";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: EnvelopeSimple, label: t("info.email"), href: `mailto:${t("info.email")}`, color: "#c83246" },
    { icon: WechatLogo, label: t("info.wechat"), href: undefined, color: "#07c160" },
    { icon: GithubLogo, label: "GitHub", href: `https://${t("info.github")}`, color: "#9b59b6" },
    { icon: MapPin, label: t("info.location"), href: undefined, color: "#e67e22" },
  ];

  return (
    <section ref={sectionRef} style={{ backgroundColor: "rgb(6, 6, 10)" }}>
      <ContactHero />

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-24 md:pb-32">
        {/* Intro text */}
        <div
          className="mb-12"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.1) * 5)),
            transform: `translateY(${Math.max(0, (0.3 - scrollProgress) * 30)}px)`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <ChatCircle size={16} style={{ color: "rgb(200, 80, 100)" }} />
            <span className="text-sm font-medium" style={{ color: "rgb(200, 80, 100)" }}>联系我们</span>
          </div>
          <p className="text-lg max-w-[50ch]" style={{ color: "rgba(255,255,255,0.35)" }}>
            有项目想法？让我们聊聊。没有动画效果
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div
            className="lg:col-span-7"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollProgress - 0.15) * 4)),
              transform: `translateX(${Math.max(0, (0.4 - scrollProgress) * 40)}px)`,
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: focusedField === "name" ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.5)" }}>
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: focusedField === "name" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${focusedField === "name" ? "rgba(200, 50, 70, 0.3)" : "rgba(255,255,255,0.08)"}`,
                      color: "white",
                      boxShadow: focusedField === "name" ? "0 0 20px rgba(200, 50, 70, 0.1)" : "none",
                    }}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: focusedField === "email" ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.5)" }}>
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: focusedField === "email" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${focusedField === "email" ? "rgba(200, 50, 70, 0.3)" : "rgba(255,255,255,0.08)"}`,
                      color: "white",
                      boxShadow: focusedField === "email" ? "0 0 20px rgba(200, 50, 70, 0.1)" : "none",
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: focusedField === "company" ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.5)" }}>
                  {t("form.company")}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-1"
                  style={{
                    backgroundColor: focusedField === "company" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${focusedField === "company" ? "rgba(200, 50, 70, 0.3)" : "rgba(255,255,255,0.08)"}`,
                    color: "white",
                    boxShadow: focusedField === "company" ? "0 0 20px rgba(200, 50, 70, 0.1)" : "none",
                  }}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Service select */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2" style={{ color: focusedField === "service" ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.5)" }}>
                  {t("form.service")}
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-1"
                  style={{
                    backgroundColor: focusedField === "service" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${focusedField === "service" ? "rgba(200, 50, 70, 0.3)" : "rgba(255,255,255,0.08)"}`,
                    color: "white",
                    boxShadow: focusedField === "service" ? "0 0 20px rgba(200, 50, 70, 0.1)" : "none",
                  }}
                  onFocus={() => setFocusedField("service")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="" style={{ backgroundColor: "rgb(20,20,25)" }}>请选择...</option>
                  <option value="website" style={{ backgroundColor: "rgb(20,20,25)" }}>网站开发</option>
                  <option value="app" style={{ backgroundColor: "rgb(20,20,25)" }}>App开发</option>
                  <option value="system" style={{ backgroundColor: "rgb(20,20,25)" }}>系统开发</option>
                  <option value="miniapp" style={{ backgroundColor: "rgb(20,20,25)" }}>小程序</option>
                  <option value="ai" style={{ backgroundColor: "rgb(20,20,25)" }}>AI/数据</option>
                  <option value="ecommerce" style={{ backgroundColor: "rgb(20,20,25)" }}>电商开发</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: focusedField === "message" ? "rgb(200, 80, 100)" : "rgba(255,255,255,0.5)" }}>
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-1 resize-none"
                  style={{
                    backgroundColor: focusedField === "message" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${focusedField === "message" ? "rgba(200, 50, 70, 0.3)" : "rgba(255,255,255,0.08)"}`,
                    color: "white",
                    boxShadow: focusedField === "message" ? "0 0 20px rgba(200, 50, 70, 0.1)" : "none",
                  }}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-300 hover:shadow-[0_16px_48px_rgba(200,50,70,0.25)] active:scale-[0.98] disabled:opacity-50 hover:scale-[1.02]"
                style={{ backgroundColor: "rgb(200, 50, 70)" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt size={18} weight="bold" />
                    {t("form.submit")}
                  </>
                )}
              </button>

              {/* Status messages */}
              {submitStatus === "success" && (
                <div className="text-center text-sm font-medium py-3 px-4 rounded-lg animate-pulse" style={{ backgroundColor: "rgba(200, 50, 70, 0.1)", color: "rgb(200, 80, 100)" }}>
                  {t("form.success")}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="text-center text-sm font-medium py-3 px-4 rounded-lg" style={{ backgroundColor: "rgba(200, 50, 70, 0.1)", color: "rgb(200, 80, 100)" }}>
                  {t("form.error")}
                </div>
              )}
            </form>
          </div>

          {/* Right: Contact info */}
          <div
            className="lg:col-span-5"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2) * 4)),
              transform: `translateX(${Math.max(0, (0.5 - scrollProgress) * 40)}px)`,
            }}
          >
            {/* Info cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map(({ icon: Icon, label, href, color }, index) => (
                <div
                  key={label}
                  className="group flex items-center gap-5 p-5 rounded-xl transition-all duration-500 hover:translate-x-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    opacity: Math.min(1, Math.max(0, (scrollProgress - 0.3 - index * 0.05) * 5)),
                    transform: `translateY(${Math.max(0, (0.5 - scrollProgress + index * 0.05) * 30)}px)`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${color}15`,
                      color,
                      boxShadow: `0 0 0 0 ${color}00`,
                    }}
                  >
                    <Icon size={24} weight="duotone" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-base transition-colors duration-200 hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="flex-1 text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {label}
                    </span>
                  )}
                  <ArrowUpRight
                    size={18}
                    className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ color }}
                  />
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="aspect-[4/3] rounded-xl overflow-hidden relative group"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin
                    size={48}
                    weight="duotone"
                    style={{
                      color: "rgba(200, 50, 70, 0.3)",
                      margin: "0 auto 16px",
                    }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>中国</p>
                </div>
              </div>
              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  border: "1px solid rgba(200, 50, 70, 0.2)",
                  boxShadow: "inset 0 0 30px rgba(200, 50, 70, 0.05)",
                }}
              />
            </div>

            {/* Quick response badge */}
            <div
              className="mt-6 flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "rgba(200, 50, 70, 0.06)",
                border: "1px solid rgba(200, 50, 70, 0.1)",
              }}
            >
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: "#07c160", boxShadow: "0 0 10px rgba(7, 193, 96, 0.5)" }} />
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                通常在 24 小时内回复
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
