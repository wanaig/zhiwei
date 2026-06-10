import Link from "next/link";
import { useTranslations } from "next-intl";
import { GithubLogo, EnvelopeSimple, WechatLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");

  const serviceLinks = [
    { href: "/services#website", label: "网站开发" },
    { href: "/services#app", label: "App开发" },
    { href: "/services#system", label: "系统开发" },
    { href: "/services#miniapp", label: "小程序" },
    { href: "/services#ai", label: "AI/数据" },
    { href: "/services#ecommerce", label: "电商开发" },
  ];

  const companyLinks = [
    { href: "/about", label: tNav("about") },
    { href: "/portfolio", label: tNav("portfolio") },
    { href: "/blog", label: tNav("blog") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <footer
      style={{
        backgroundColor: "rgb(6, 6, 10)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="text-2xl font-bold" style={{ color: "white" }}>
              <span style={{ color: "rgb(200, 50, 70)" }}>知</span>微
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-[280px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("links.services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("links.company")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("links.resources")}
            </h3>
            <div className="space-y-3">
              <a href={`mailto:${tContact("info.email")}`} className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                <EnvelopeSimple size={14} />
                {tContact("info.email")}
              </a>
              <a href={`https://${tContact("info.github")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.35)" }}>
                <GithubLogo size={14} />
                GitHub
              </a>
              <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                <WechatLogo size={14} />
                {tContact("info.wechat")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)" }}>
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
