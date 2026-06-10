import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import TechMarquee from "@/components/home/TechMarquee";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import FeaturedWork from "@/components/home/FeaturedWork";
import CTASection from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TechMarquee />
      <ServiceHighlights />
      <FeaturedWork />
      <CTASection />
    </>
  );
}
