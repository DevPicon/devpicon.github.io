import archive from '@/data/talks.json';
import resourceCatalog from '@/data/talk-resources.json';
import type { Locale } from '@/i18n';

export interface TalkAppearance {
  id: string;
  title: string;
  titleLanguage: 'es' | 'en' | 'pt';
  language: 'es' | 'en' | 'pt';
  date: string;
  event: string;
  location?: string;
  mode?: 'virtual' | 'inPerson';
  links: { slides?: string; video?: string; session?: string; code?: string };
  relatedResourceIds?: string[];
  provenance: { sources: string[]; note: string };
}

export interface TalkResource {
  id: string;
  title: string;
  titleLanguage: 'es' | 'en' | 'pt';
  language: 'es' | 'en' | 'pt';
  kind: 'video' | 'series';
  url: string;
  provenance: { source: string; note: string };
}

export const talkResources = resourceCatalog as TalkResource[];

export function relatedResourcesFor(talk: TalkAppearance): TalkResource[] {
  return (talk.relatedResourceIds || [])
    .map((id) => talkResources.find((resource) => resource.id === id))
    .filter((resource): resource is TalkResource => resource !== undefined);
}

export function sortTalks(appearances: readonly TalkAppearance[]): TalkAppearance[] {
  // Missing month/day remain unknown; padding is used only for a stable sort.
  const key = (date: string): string => {
    const [year, month = '00', day = '00'] = date.split('-');
    return `${year}-${month}-${day}`;
  };
  return [...appearances].sort((a, b) => key(b.date).localeCompare(key(a.date)) || a.id.localeCompare(b.id));
}

export const talks = sortTalks(archive as TalkAppearance[]);
export const talkYears = Array.from(new Set(talks.map((talk) => talk.date.slice(0, 4))));

export function talkDate(date: string, locale: Locale): string {
  const [year, month, day] = date.split('-');
  if (!month) return year;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', ...(day ? { day: 'numeric' as const } : {}), timeZone: 'UTC',
  }).format(new Date(`${year}-${month}-${day || '01'}T12:00:00Z`));
}

export function talksUrl(locale: Locale): string {
  return `https://picon.dev/${locale}/talks/`;
}

export const talkLabels = {
  es: {
    title: 'Charlas',
    description: 'Charlas y talleres sobre desarrollo móvil, Kotlin, ingeniería y comunidad. De lo más reciente a los primeros encuentros.',
    years: 'Explorar por año',
    language: 'Idioma del material',
    languages: { es: 'Español', en: 'Inglés', pt: 'Portugués' },
    modes: { virtual: 'Virtual', inPerson: 'Presencial' },
    links: { slides: 'Slides', video: 'Grabación', session: 'Sesión', code: 'Código' },
    profiles: 'Más sobre mis charlas',
    speakerProfile: 'Perfil de speaker',
    practice: 'Practica este tema',
    resourceKinds: { video: 'Video', series: 'Serie' },
  },
  en: {
    title: 'Talks',
    description: 'Talks and workshops on mobile development, Kotlin, engineering and community. From recent sessions to the first meetups.',
    years: 'Browse by year',
    language: 'Material language',
    languages: { es: 'Spanish', en: 'English', pt: 'Portuguese' },
    modes: { virtual: 'Online', inPerson: 'In person' },
    links: { slides: 'Slides', video: 'Recording', session: 'Session', code: 'Code' },
    profiles: 'More about my talks',
    speakerProfile: 'Speaker profile',
    practice: 'Practice this topic',
    resourceKinds: { video: 'Video', series: 'Series' },
  },
};
