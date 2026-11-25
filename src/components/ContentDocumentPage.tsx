import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { contentDocuments, contentDocumentPaths, contentLabels, type ContentDocument } from '@/lib/devpicon-content';

export interface ContentDocumentPageProps {
  params: { locale: string };
}

function getLocale(locale: string): Locale {
  if (!locales.includes(locale as Locale)) notFound();
  return locale as Locale;
}

export function contentDocumentMetadata(localeParam: string, document: ContentDocument): Metadata {
  const locale = getLocale(localeParam);
  const copy = contentDocuments[locale][document];
  const path = contentDocumentPaths[document];
  return {
    title: `${copy.title} | picon.dev`,
    description: copy.description,
    alternates: {
      canonical: `https://picon.dev/${locale}/${path}/`,
      languages: { es: `https://picon.dev/es/${path}/`, en: `https://picon.dev/en/${path}/` },
    },
  };
}

export default function ContentDocumentPage({ params, document }: ContentDocumentPageProps & { document: ContentDocument }) {
  const locale = getLocale(params.locale);
  unstable_setRequestLocale(locale);
  const copy = contentDocuments[locale][document];
  const labels = contentLabels[locale];
  const linkClass = 'font-semibold text-indigo-700 underline underline-offset-4 dark:text-indigo-300';

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f19]" lang={locale}>
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <header className="mb-10 border-b border-gray-200 pb-8 dark:border-gray-800">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">DevPicon Content</p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">{copy.title}</h1>
          <p className="mb-5 text-gray-600 dark:text-gray-400">{labels.updated}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label={labels.navigation}>
            {(Object.keys(contentDocumentPaths) as ContentDocument[]).map((kind) => (
              <a key={kind} href={`/${locale}/${contentDocumentPaths[kind]}/`} className={linkClass} aria-current={kind === document ? 'page' : undefined}>
                {labels[kind]}
              </a>
            ))}
          </nav>
        </header>
        <div className="space-y-10">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-lg leading-8 text-gray-700 dark:text-gray-300">{paragraph}</p>)}
            </section>
          ))}
          <section className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{labels.contact}</h2>
            <p className="mb-3 text-lg leading-8 text-gray-700 dark:text-gray-300">{labels.contactBody}</p>
            <a className={`${linkClass} break-all`} href="mailto:hello.devpicon@gmail.com">hello.devpicon@gmail.com</a>
          </section>
          <section>
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{labels.sources}</h2>
            <ul className="list-disc space-y-3 pl-5">
              <li><a className={linkClass} href={`/${locale}/privacy/`}>{labels.websitePrivacy}</a></li>
              <li><a className={linkClass} href="https://www.tiktok.com/legal/page/row/privacy-policy/en">TikTok · Privacy Policy</a></li>
              <li><a className={linkClass} href="https://www.tiktok.com/legal/page/row/terms-of-service/en">TikTok · Terms of Service</a></li>
              <li><a className={linkClass} href="https://composio.dev/privacy">Composio · Privacy Policy</a></li>
              <li><a className={linkClass} href="https://composio.dev/terms">Composio · Terms of Service</a></li>
              <li><a className={linkClass} href="https://openai.com/policies/privacy-policy/">OpenAI · Privacy Policy</a></li>
              <li><a className={linkClass} href="https://developers.tiktok.com/docs/en/app-review-guidelines">TikTok · App Review Guidelines</a></li>
              <li><a className={linkClass} href="https://developers.tiktok.com/docs/en/content-sharing-guidelines">TikTok · Content Sharing Guidelines</a></li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
