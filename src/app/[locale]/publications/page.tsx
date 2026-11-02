import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales, Locale } from '@/i18n';
import { publications, publicationLabels, publicationDate, publicationUrl } from '@/lib/publications';

interface PageProps { params: { locale: string } }

export function generateMetadata({ params }: PageProps): Metadata {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const labels = publicationLabels[locale];
  return {
    title: `${labels.title} | Armando Picón`,
    description: labels.description,
    alternates: {
      canonical: publicationUrl(locale),
      languages: { es: publicationUrl('es'), en: publicationUrl('en') },
    },
  };
}

export default function PublicationsPage({ params }: PageProps) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  unstable_setRequestLocale(locale);
  const labels = publicationLabels[locale];

  return <main className="publications-page" lang={locale}>
    <div className="publications-index">
      <header className="publications-intro">
        <p className="section-eyebrow">ARMANDO PICÓN / {labels.title}</p>
        <h1>{labels.title}</h1>
        <p>{labels.description}</p>
      </header>
      <div className="publication-list">
        {publications.map((publication) => <article key={publication.slug} className="publication-entry">
          <p className="publication-meta"><time dateTime={publication.date}>{publicationDate(publication.date, locale)}</time></p>
          <h2><a href={`/${locale}/publications/${publication.slug}/`}>{publication.title[locale]}</a></h2>
          <p>{publication.summary[locale]}</p>
          <a className="publication-read" href={`/${locale}/publications/${publication.slug}/`}>{labels.read} <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
    </div>
  </main>;
}
