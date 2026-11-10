import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';

const copy = {
  es: {
    title: 'Apps',
    description: 'Aplicaciones de Armando Picón y notas sobre las integraciones que está probando.',
    privacy: 'Política de privacidad',
    notes: 'Notas técnicas',
    apps: [
      {
        id: 'velo',
        name: 'Velo',
        platforms: 'Android e iOS',
        description: 'Convierte una foto en una imagen cuadrada con fondo difuminado.',
        notes: [
          'En iOS, el flujo Seleccionar fotos → Velo → Vista rápida se verificó en un iPhone.',
          'En Android, AppFunctions devolvió un JPEG de 1080 × 1080 en un Samsung. Falta verificar el flujo completo desde Gemini.',
        ],
      },
      {
        id: 'markdown-viewer',
        name: 'Markdown Viewer',
        platforms: 'Android',
        description: 'Abre y lee archivos Markdown guardados en tu dispositivo.',
        notes: [
          'El visor abre el archivo que eliges en el selector de documentos o desde otra app y lo renderiza en el dispositivo.',
        ],
      },
    ],
  },
  en: {
    title: 'Apps',
    description: 'Apps by Armando Picón and notes on the integrations he is testing.',
    privacy: 'Privacy policy',
    notes: 'Technical notes',
    apps: [
      {
        id: 'velo',
        name: 'Velo',
        platforms: 'Android and iOS',
        description: 'Turns a photo into a square image with a blurred background.',
        notes: [
          'On iOS, the Select Photos → Velo → Quick Look flow was verified on an iPhone.',
          'On Android, AppFunctions returned a 1080 × 1080 JPEG on a Samsung phone. The full Gemini flow still needs verification.',
        ],
      },
      {
        id: 'markdown-viewer',
        name: 'Markdown Viewer',
        platforms: 'Android',
        description: 'Opens and displays Markdown files stored on your device.',
        notes: [
          'The viewer opens the file you select in the document picker or open from another app and renders it on your device.',
        ],
      },
    ],
  },
} as const;

interface PageProps {
  params: { locale: string };
}

function getLocale(locale: string): Locale {
  if (!locales.includes(locale as Locale)) notFound();
  return locale as Locale;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const locale = getLocale(params.locale);
  return {
    title: 'Apps | Armando Picón',
    description: copy[locale].description,
    alternates: {
      canonical: `https://picon.dev/${locale}/apps/`,
      languages: {
        es: 'https://picon.dev/es/apps/',
        en: 'https://picon.dev/en/apps/',
      },
    },
  };
}

export default function AppsPage({ params }: PageProps) {
  const locale = getLocale(params.locale);
  unstable_setRequestLocale(locale);
  const labels = copy[locale];

  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f19]" lang={locale}>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <header className="mb-10">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
            {labels.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">{labels.description}</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {labels.apps.map((app) => (
            <article
              key={app.id}
              id={app.id}
              aria-labelledby={`app-${app.id}`}
              className="scroll-mt-24 rounded-2xl border border-gray-200 p-6 dark:border-gray-800"
            >
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{app.platforms}</p>
              <h2 id={`app-${app.id}`} className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {app.name}
              </h2>
              <p className="mb-5 text-gray-700 dark:text-gray-300">{app.description}</p>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{labels.notes}</h3>
              <ul className="mb-5 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                {app.notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
              <a
                href={`/${locale}/privacy/${app.id}/`}
                aria-label={`${labels.privacy} · ${app.name}`}
                className="font-semibold text-indigo-700 underline underline-offset-4 dark:text-indigo-300"
              >
                {labels.privacy}
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
