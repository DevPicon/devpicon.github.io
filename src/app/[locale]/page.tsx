import HeroSection from "@/components/HeroSection";
import LatestContentSection from "@/components/LatestContentSection";
import contentData from "@/data/content.json";
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f19] transition-colors duration-300">
      <HeroSection />
      <LatestContentSection contentData={contentData.latestContent} />
    </main>
  );
}
