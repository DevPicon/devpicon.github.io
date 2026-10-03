'use client';

import ContentCard from './ContentCard';
import { useTranslations, useLocale } from 'next-intl';

interface ContentData {
  videos: Array<{
    title: string;
    description: string;
    url: string;
    date: string;
    image: string;
  }>;
  podcast: {
    title: string;
    description: string;
    url: string;
    date: string;
    image: string;
  };
  blog: {
    title: string;
    description: string;
    url: string;
    date: string;
    image: string;
  };
}

interface LatestContentSectionProps {
  contentData: ContentData;
}

function formatDate(dateString: string, locale: string, t: (key: string, values?: Record<string, string | number>) => string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return t('home.dateFormats.today');
  if (diffDays === 1) return t('home.dateFormats.yesterday');
  if (diffDays < 7) return t('home.dateFormats.daysAgo', { days: diffDays });
  if (diffDays < 30) return t('home.dateFormats.weeksAgo', { weeks: Math.floor(diffDays / 7) });
  return t('home.dateFormats.monthsAgo', { months: Math.floor(diffDays / 30) });
}

export default function LatestContentSection({ contentData }: LatestContentSectionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { videos, podcast, blog } = contentData;

  return (
    <section id="content" className="latest-section">
      <div className="latest-section-inner">
        <div className="section-heading-row latest-heading-row">
          <p className="section-eyebrow">02 / {t('home.latestContent.sectionLabel')}</p>
          <h2 className="section-title">
            {t('home.latestContent.title')}{' '}
            <span className="section-title-accent">{t('home.latestContent.titleHighlight')}</span>
          </h2>
        </div>

        {locale === 'en' && (
          <p className="latest-note">{t('home.latestContent.note')}</p>
        )}

        <div className="latest-grid">
          {videos.map((video, index) => (
            <ContentCard
              key={`video-${index}`}
              type="video"
              title={video.title}
              description={video.description}
              url={video.url}
              date={formatDate(video.date, locale, t)}
              image={video.image}
            />
          ))}

          <ContentCard
            type="podcast"
            title={podcast.title}
            description={podcast.description}
            url={podcast.url}
            date={formatDate(podcast.date, locale, t)}
            image={podcast.image}
          />

          <ContentCard
            type="blog"
            title={blog.title}
            description={blog.description}
            url={blog.url}
            date={formatDate(blog.date, locale, t)}
            image={blog.image}
          />
        </div>
      </div>
    </section>
  );
}
