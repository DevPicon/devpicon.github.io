import fs from 'fs';
import path from 'path';
import { Locale } from '@/i18n';

export interface Publication {
  slug: string;
  date: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  discussionUrl?: string;
  cover: {
    src: string;
    social: string;
    width: number;
    height: number;
    alt: Record<Locale, string>;
  };
}

export const publications: Publication[] = [{
  slug: 'ai-assisted-engineering',
  date: '2026-11-01',
  discussionUrl: 'https://dev.to/devpicon/ai-can-write-more-of-the-code-we-still-have-to-engineer-the-system-3e7#comments',
  cover: {
    src: '/images/publications/ai-assisted-engineering.webp',
    social: 'https://picon.dev/images/publications/ai-assisted-engineering-social.jpg',
    width: 1600,
    height: 837,
    alt: {
      es: 'Un compás, piezas sueltas, una rejilla de inspección y una estructura ensamblada, conectados por una línea que representa un ciclo de ingeniería.',
      en: 'A drafting compass, loose pieces, an inspection grid and an assembled structure, connected by a line representing an engineering cycle.',
    },
  },
  title: {
    en: 'AI Can Write More of the Code. We Still Have to Engineer the System.',
    es: 'La IA puede escribir más código. Seguimos teniendo que hacer ingeniería.',
  },
  summary: {
    en: 'Durable decisions, relevant context and verifiable increments: a pragmatic perspective on keeping engineering judgment in AI-assisted development.',
    es: 'Decisiones duraderas, contexto pertinente e incrementos verificables: una perspectiva pragmática para mantener el criterio de ingeniería en el desarrollo asistido por IA.',
  },
}];

export function getPublication(slug: string): Publication | undefined {
  return publications.find((publication) => publication.slug === slug);
}

export function publicationUrl(locale: Locale, slug?: string): string {
  return `https://picon.dev/${locale}/publications/${slug ? `${slug}/` : ''}`;
}

export function readPublication(publication: Publication, locale: Locale): string {
  return fs.readFileSync(path.join(process.cwd(), 'src/content/publications', `${publication.slug}.${locale}.md`), 'utf8');
}

export function publicationDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long', timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

export const publicationLabels = {
  es: {
    title: 'Publicaciones',
    description: 'Ideas y decisiones sobre ingeniería de software, desarrollo móvil e inteligencia artificial aplicada.',
    read: 'Leer artículo',
    back: 'Todas las publicaciones',
    language: 'Read in English',
    topic: 'Ingeniería de software · AI-assisted development',
  },
  en: {
    title: 'Publications',
    description: 'Ideas and decisions about software engineering, mobile development and applied artificial intelligence.',
    read: 'Read article',
    back: 'All publications',
    language: 'Leer en español',
    topic: 'Software engineering · AI-assisted development',
  },
};
