import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Locale = 'es' | 'en';

const content = {
  es: {
    title: 'Política de Privacidad de Markdown Viewer',
    description: 'Cómo Markdown Viewer trata tus archivos y datos personales.',
    updated: 'Última actualización: 4 de octubre de 2026',
    introTitle: 'Resumen',
    intro:
      'Markdown Viewer es una aplicación Android para abrir y leer archivos Markdown almacenados en tu dispositivo. Tus documentos se procesan localmente y no se envían a Armando Picón ni a servidores de la aplicación.',
    collectionTitle: 'Datos recopilados y compartidos',
    collection:
      'Markdown Viewer no recopila, almacena, vende ni comparte datos personales o de uso. No requiere una cuenta, no contiene publicidad y no integra servicios de analítica, seguimiento ni informes de fallos de terceros.',
    filesTitle: 'Acceso a archivos',
    files:
      'La aplicación accede únicamente al archivo que eliges mediante el selector de documentos de Android o que abres explícitamente desde otra aplicación. Este acceso se usa solo para mostrar su contenido en el dispositivo. Markdown Viewer no solicita acceso general al almacenamiento y no modifica ni sube tus documentos.',
    networkTitle: 'Conexión a Internet',
    network:
      'La lectura de documentos funciona sin conexión. Markdown Viewer no declara permiso de Internet y no transmite el contenido de tus archivos.',
    childrenTitle: 'Privacidad de menores',
    children:
      'La aplicación no recopila información de ninguna persona, incluidos niños y adolescentes. No está diseñada específicamente para menores de 13 años.',
    changesTitle: 'Cambios en esta política',
    changes:
      'Si una versión futura cambia la forma en que la aplicación trata datos, esta página se actualizará antes de publicar ese cambio y se revisará la declaración de Seguridad de los datos en Google Play.',
    contactTitle: 'Contacto',
    contact: 'Para consultas sobre esta política o sobre Markdown Viewer, escribe a:',
  },
  en: {
    title: 'Markdown Viewer Privacy Policy',
    description: 'How Markdown Viewer handles your files and personal data.',
    updated: 'Last updated: October 4, 2026',
    introTitle: 'Summary',
    intro:
      'Markdown Viewer is an Android app for opening and reading Markdown files stored on your device. Your documents are processed locally and are not sent to Armando Picón or to any app server.',
    collectionTitle: 'Data collection and sharing',
    collection:
      'Markdown Viewer does not collect, store, sell, or share personal or usage data. It requires no account, contains no advertising, and integrates no third-party analytics, tracking, or crash-reporting services.',
    filesTitle: 'File access',
    files:
      'The app accesses only the file you choose through the Android document picker or explicitly open from another app. This access is used solely to display its contents on your device. Markdown Viewer does not request broad storage access and does not modify or upload your documents.',
    networkTitle: 'Internet connection',
    network:
      'Reading documents works offline. Markdown Viewer does not declare the Internet permission and does not transmit the contents of your files.',
    childrenTitle: "Children's privacy",
    children:
      'The app does not collect information from anyone, including children and teenagers. It is not specifically designed for children under 13.',
    changesTitle: 'Changes to this policy',
    changes:
      'If a future version changes how the app handles data, this page will be updated before that change is released and the Google Play Data safety declaration will be reviewed.',
    contactTitle: 'Contact',
    contact: 'For questions about this policy or Markdown Viewer, email:',
  },
} as const;

function getLocale(locale: string): Locale {
  return locale === 'en' ? 'en' : 'es';
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const copy = content[getLocale(params.locale)];

  return {
    title: `${copy.title} - picon.dev`,
    description: copy.description,
  };
}

export default function MarkdownViewerPrivacyPage({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale);
  unstable_setRequestLocale(locale);
  const copy = content[locale];
  const sections = [
    [copy.introTitle, copy.intro],
    [copy.collectionTitle, copy.collection],
    [copy.filesTitle, copy.files],
    [copy.networkTitle, copy.network],
    [copy.childrenTitle, copy.children],
    [copy.changesTitle, copy.changes],
  ];

  return (
    <main className="min-h-screen bg-white transition-colors dark:bg-[#0b0f19]">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <header className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            Markdown Viewer for Android
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
            {copy.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{copy.updated}</p>
        </header>

        <div className="space-y-10">
          {sections.map(([title, body]) => (
            <section key={title}>
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
                {title}
              </h2>
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">{body}</p>
            </section>
          ))}

          <section className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
              {copy.contactTitle}
            </h2>
            <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
              {copy.contact}{' '}
              <a
                className="font-semibold text-indigo-700 underline-offset-4 hover:underline dark:text-indigo-300"
                href="mailto:hello.devpicon@gmail.com"
              >
                hello.devpicon@gmail.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
