import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Locale = 'es' | 'en';

const content = {
  "es": {
    "title": "Política de privacidad de Velo",
    "description": "Cómo Velo trata las fotos, las preferencias y los datos de diagnóstico en Android.",
    "updated": "Última actualización · 10 de noviembre de 2026",
    "sections": [
      [
        "Quién gestiona Velo",
        "Velo es un editor de fotos de Armando Picón. Puedes usarlo sin crear una cuenta de Velo."
      ],
      [
        "Fotos y preferencias",
        "Velo accede a las fotos que eliges y las procesa en el dispositivo. Guarda tus preferencias localmente y usa archivos temporales para las vistas previas y las exportaciones. Cuando eliges guardar o compartir un resultado, Velo entrega una copia a la galería o a la aplicación que seleccionas."
      ],
      [
        "Integración con Gemini en Android",
        "Cuando pides a Gemini que aplique el marco difuminado de Velo, Android permite que Velo lea la foto autorizada. Velo genera una copia JPEG cuadrada en su caché y concede al solicitante acceso temporal de lectura al resultado. Velo conserva el archivo original y procesa la foto sin enviarla a servidores de Velo. Google gestiona los datos que compartes con Gemini conforme a sus propias políticas."
      ],
      [
        "Diagnósticos de fallos",
        "En versiones con informes de fallos habilitados, Firebase Crashlytics recibe diagnósticos como trazas de errores, identificadores de instalación e información del dispositivo y del sistema. Velo usa estos datos para investigar fallos. Velo no adjunta fotos, nombres de archivo ni metadatos de fotos a los informes."
      ],
      [
        "Cómo gestionar y borrar tus datos",
        "En los ajustes de Android, abre la información de la aplicación Velo. Puedes borrar su caché para eliminar los archivos temporales o borrar el almacenamiento de la app para restablecer también tus preferencias. Para borrar las copias guardadas en la galería, elimínalas desde tu aplicación de fotos. Si compartiste una copia con otra app, gestiona esa copia desde la app que la recibió. Para consultas sobre diagnósticos, usa el contacto de esta página."
      ]
    ],
    "contactTitle": "Contacto",
    "contact": "Para consultas de privacidad o solicitudes sobre tus datos, escribe a"
  },
  "en": {
    "title": "Velo Privacy Policy",
    "description": "How Velo handles photos, preferences, and crash diagnostics on Android.",
    "updated": "Last updated · November 10, 2026",
    "sections": [
      [
        "Who operates Velo",
        "Velo is a photo editor operated by Armando Picón. You can use it without a Velo account."
      ],
      [
        "Photos and preferences",
        "Velo accesses the photos you choose and processes them on your device. It stores your preferences locally and uses temporary files for previews and exports. When you choose to save or share a result, Velo provides a copy to your photo library or to the app you select."
      ],
      [
        "Gemini integration on Android",
        "When you ask Gemini to apply the Velo blurred frame, Android lets Velo read the authorized photo. Velo generates a square JPEG copy in its cache and gives the caller temporary read access to that result. Velo keeps the original intact and processes the photo without sending it to Velo servers. Google handles the data you share with Gemini under its own policies."
      ],
      [
        "Crash diagnostics",
        "In builds with crash reporting enabled, Firebase Crashlytics receives diagnostics such as crash traces, installation identifiers, and device and system information. Velo uses these diagnostics to investigate crashes. Velo does not attach photos, file names, or photo metadata to crash reports."
      ],
      [
        "How to manage and delete your data",
        "Open the Velo app information in Android settings. Clear its cache to remove temporary files or clear its app storage to also reset your preferences. To remove copies you saved to your library, delete them in your photo app. If you shared a copy with another app, manage that copy in the receiving app. For questions about diagnostics, use the contact on this page."
      ]
    ],
    "contactTitle": "Contact",
    "contact": "For privacy questions or requests about your data, email"
  }
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

export default function VeloPrivacyPage({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale);
  unstable_setRequestLocale(locale);
  const copy = content[locale];
  return (
    <main className="min-h-screen bg-white transition-colors dark:bg-[#0b0f19]">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <header className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            Velo · Android
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
            {copy.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{copy.updated}</p>
        </header>

        <div className="space-y-10">
          {copy.sections.map(([title, body]) => (
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
