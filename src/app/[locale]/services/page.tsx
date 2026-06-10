"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Globe, DeviceMobile, Database, DeviceTablet, Brain, ShoppingCart, CheckCircle } from "@phosphor-icons/react";

const darkBg = "rgb(6, 6, 10)";
const darkSurface = "rgba(255,255,255,0.02)";
const border = "rgba(255,255,255,0.06)";

const serviceKeys = ["website", "app", "system", "miniapp", "ai", "ecommerce"] as const;
const serviceIcons = { website: Globe, app: DeviceMobile, system: Database, miniapp: DeviceTablet, ai: Brain, ecommerce: ShoppingCart };
const serviceFeatures: Record<string, string[]> = {
  website: ["响应式设计", "SEO优化", "高性能加载", "CMS集成"],
  app: ["原生体验", "跨平台方案", "推送通知", "离线支持"],
  system: ["高可用架构", "数据安全", "权限管理", "API设计"],
  miniapp: ["快速上线", "微信生态", "支付集成", "分享裂变"],
  ai: ["数据分析", "机器学习", "自动化流程", "智能推荐"],
  ecommerce: ["商品管理", "订单系统", "支付集成", "营销工具"],
};

export default function ServicesPage() {
  const t = useTranslations("services");
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: darkBg }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
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

        <div className="space-y-16">
          {serviceKeys.map((key, index) => {
            const Icon = serviceIcons[key];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={key}
                id={key}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={isEven ? "" : "lg:order-2"}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(200, 50, 70, 0.15)", color: "rgb(200, 80, 100)" }}>
                    <Icon size={28} weight="duotone" />
                  </div>
                  <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "white", marginBottom: "1rem" }}>
                    {t(`items.${key}.title`)}
                  </h2>
                  <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", marginBottom: "1.5rem" }}>
                    {t(`items.${key}.description`)}
                  </p>
                  <ul className="space-y-3">
                    {serviceFeatures[key].map((feature) => (
                      <li key={feature} className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                        <CheckCircle size={18} weight="fill" style={{ color: "rgb(200, 80, 100)" }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`aspect-[4/3] rounded-xl overflow-hidden ${isEven ? "" : "lg:order-1"}`} style={{ backgroundColor: darkSurface, border: `1px solid ${border}` }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon size={80} weight="duotone" style={{ color: "rgba(200, 50, 70, 0.15)" }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
