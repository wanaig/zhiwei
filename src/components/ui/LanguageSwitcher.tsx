"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "px-2 py-1 rounded-md transition-colors duration-fast",
            locale === loc
              ? "text-[var(--primary)] font-medium"
              : "text-[var(--muted)] hover:text-[var(--ink)]"
          )}
          aria-label={`Switch to ${loc === "zh" ? "中文" : "English"}`}
        >
          {loc === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}
