import HeroSection from "@/components/HeroSection";
import LatestContentSection from "@/components/LatestContentSection";
import contentData from "@/data/content.json";
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';

interface FocusCard {
  title: string;
  description: string;
  href?: string;
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const focusT = await getTranslations({ locale, namespace: 'CurrentFocus' });

  const focusCards: FocusCard[] = [
    {
      title: focusT('aiLabsTitle'),
      description: focusT('aiLabsDesc'),
      href: 'https://github.com/DevPicon/ondevice-ai-labs',
    },
    {
      title: focusT('sslTitle'),
      description: focusT('sslDesc'),
      href: 'https://github.com/DevPicon/ssl-pinning-hands-on',
    },
    {
      title: focusT('kmpTitle'),
      description: focusT('kmpDesc'),
    },
  ];

  return (
    <main className="home-page">
      <HeroSection />
      <section id="focus" className="work-section">
        <div className="work-section-inner">
          <div className="section-heading-row">
            <p className="section-eyebrow">01 / {focusT('sectionLabel')}</p>
            <h2 className="section-title">{focusT('title')}</h2>
          </div>
          <div className="work-grid">
            {focusCards.map((card, index) => {
              const className = "work-card";

              if (card.href) {
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    <span className="work-card-number" aria-hidden="true">0{index + 1}</span>
                    <h3 className="work-card-title">
                      {card.title}
                    </h3>
                    <p className="work-card-description">
                      {card.description}
                    </p>
                    <span className="work-card-link">{focusT('explore')} <span aria-hidden="true">↗</span></span>
                  </a>
                );
              }

              return (
                <div key={card.title} className={className}>
                  <span className="work-card-number" aria-hidden="true">0{index + 1}</span>
                  <h3 className="work-card-title">
                    {card.title}
                  </h3>
                  <p className="work-card-description">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <LatestContentSection contentData={contentData.latestContent} />
    </main>
  );
}
