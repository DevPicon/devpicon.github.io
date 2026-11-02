import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales, Locale } from '@/i18n';
import { talks, talkYears, talkLabels, talkDate, talksUrl, TalkAppearance } from '@/lib/talks';

interface PageProps { params: { locale: string } }

export function generateMetadata({ params }: PageProps): Metadata {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const labels = talkLabels[locale];
  return {
    title: `${labels.title} | Armando Picón`,
    description: labels.description,
    alternates: {
      canonical: talksUrl(locale),
      languages: { es: talksUrl('es'), en: talksUrl('en') },
    },
  };
}

export default function TalksPage({ params }: PageProps) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  unstable_setRequestLocale(locale);
  const labels = talkLabels[locale];

  return <main className="talks-page" lang={locale}>
    <div className="talks-index">
      <header className="talks-intro">
        <p className="section-eyebrow">ARMANDO PICÓN / {labels.title}</p>
        <h1>{labels.title}<span aria-hidden="true">.</span></h1>
        <p>{labels.description}</p>
        <nav className="talk-profile-links" aria-label={labels.profiles}>
          <a href="https://speakerdeck.com/devpicon" target="_blank" rel="noopener noreferrer">Speaker Deck <span aria-hidden="true">↗</span></a>
          <a href="https://sessionize.com/devpicon" target="_blank" rel="noopener noreferrer">{labels.speakerProfile} <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <nav className="talk-year-nav" aria-label={labels.years}>
        {talkYears.map((year) => <a key={year} href={`#year-${year}`}>{year}</a>)}
      </nav>
      <div className="talk-archive">
        {talkYears.map((year) => <section key={year} id={`year-${year}`} className="talk-year" aria-labelledby={`heading-${year}`}>
          <h2 id={`heading-${year}`}>{year}</h2>
          <ol className="talk-list">
            {talks.filter((talk) => talk.date.startsWith(year)).map((talk) => <li key={talk.id}>
              <article className="talk-entry" id={talk.id}>
                <div className="talk-meta">
                  <time dateTime={talk.date}>{talkDate(talk.date, locale)}</time>
                  <span className="talk-language" aria-label={`${labels.language}: ${labels.languages[talk.language]}`}>{labels.languages[talk.language]}</span>
                  {talk.mode && <span>{labels.modes[talk.mode]}</span>}
                </div>
                <h3 lang={talk.titleLanguage}>{talk.title}</h3>
                <p className="talk-event">{talk.event}{talk.location && <span> · {talk.location}</span>}</p>
                <div className="talk-materials">
                  {(Object.entries(talk.links) as [keyof TalkAppearance['links'], string][]).map(([kind, href]) => <a key={kind} href={href} target="_blank" rel="noopener noreferrer">
                    {labels.links[kind]} <span aria-hidden="true">↗</span>
                  </a>)}
                </div>
              </article>
            </li>)}
          </ol>
        </section>)}
      </div>
    </div>
  </main>;
}
