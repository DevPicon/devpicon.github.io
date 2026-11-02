import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales, Locale } from '@/i18n';
import PublicationContent from '@/components/PublicationContent';
import { publications, getPublication, readPublication, publicationUrl, publicationLabels, publicationDate } from '@/lib/publications';

interface PageProps { params: { locale: string; slug: string } }

export const dynamicParams = false;

export function generateStaticParams() {
  return publications.map(({ slug }) => ({ slug }));
}

function resolvePublication(params: PageProps['params']) {
  const publication = getPublication(params.slug);
  if (!publication || !locales.includes(params.locale as Locale)) notFound();
  return { publication, locale: params.locale as Locale };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { publication, locale } = resolvePublication(params);
  return {
    title: `${publication.title[locale]} | Armando Picón`,
    description: publication.summary[locale],
    authors: [{ name: 'Armando Picón', url: 'https://picon.dev/' }],
    alternates: {
      canonical: publicationUrl(locale, publication.slug),
      languages: { es: publicationUrl('es', publication.slug), en: publicationUrl('en', publication.slug) },
    },
    openGraph: {
      type: 'article',
      title: publication.title[locale],
      description: publication.summary[locale],
      url: publicationUrl(locale, publication.slug),
      publishedTime: publication.date,
      authors: ['Armando Picón'],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      images: [{ url: publication.cover.social, width: 1200, height: 630, alt: publication.cover.alt[locale] }],
    },
    twitter: {
      card: 'summary_large_image',
      title: publication.title[locale],
      description: publication.summary[locale],
      images: [{ url: publication.cover.social, alt: publication.cover.alt[locale] }],
    },
  };
}

export default function PublicationPage({ params }: PageProps) {
  const { publication, locale } = resolvePublication(params);
  unstable_setRequestLocale(locale);
  const labels = publicationLabels[locale];
  const otherLocale = locale === 'es' ? 'en' : 'es';
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: publication.title[locale], description: publication.summary[locale],
    datePublished: publication.date, inLanguage: locale,
    image: publication.cover.social,
    author: { '@type': 'Person', name: 'Armando Picón', url: 'https://picon.dev/' },
    mainEntityOfPage: publicationUrl(locale, publication.slug),
  };

  return <main className="publications-page" lang={locale}>
    <article className="publication-article">
      <div className="publication-toolbar">
        <a href={`/${locale}/publications/`}>← {labels.back}</a>
        <a href={`/${otherLocale}/publications/${publication.slug}/`} hrefLang={otherLocale} lang={otherLocale}>{labels.language}</a>
      </div>
      <header className="publication-header">
        <p className="section-eyebrow">{labels.topic}</p>
        <h1>{publication.title[locale]}</h1>
        <p className="publication-meta">Armando Picón <span aria-hidden="true">·</span> <time dateTime={publication.date}>{publicationDate(publication.date, locale)}</time></p>
        <p className="publication-summary">{publication.summary[locale]}</p>
      </header>
      <figure className="publication-cover">
        <Image
          src={publication.cover.src}
          alt={publication.cover.alt[locale]}
          width={publication.cover.width}
          height={publication.cover.height}
          priority
          sizes="(max-width: 800px) calc(100vw - 2.2rem), 760px"
        />
        <figcaption>{locale === 'es' ? 'Intención, generación, verificación y decisión. Ilustración generada con IA.' : 'Intent, generation, verification and decision. AI-generated illustration.'}</figcaption>
      </figure>
      <PublicationContent markdown={readPublication(publication, locale)} />
      {publication.discussionUrl && <aside className="publication-discussion">
        <h2>{locale === 'es' ? 'Sigamos la conversación' : 'Continue the conversation'}</h2>
        <p>{locale === 'es'
          ? 'La versión inglesa también está publicada en DEV Community. Puedes dejar tus preguntas, objeciones y ejemplos en sus comentarios.'
          : 'The English version is also published on DEV Community. Share your questions, counterarguments and examples in its comments.'}</p>
        <a href={publication.discussionUrl}>{locale === 'es' ? 'Comentar en DEV Community ↗' : 'Discuss on DEV Community ↗'}</a>
      </aside>}
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </main>;
}
