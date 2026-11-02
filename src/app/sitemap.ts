import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { publications, publicationUrl } from '@/lib/publications';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...['', '/contact/', '/talks/', '/contributions/', '/privacy/', '/privacy/markdown-viewer/'].map((route) => ({ url: `https://picon.dev/${locale}${route || '/'}` })),
    { url: publicationUrl(locale) },
    ...publications.map((publication) => ({ url: publicationUrl(locale, publication.slug) })),
  ]);
}
