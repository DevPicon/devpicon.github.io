import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { publications, publicationUrl } from '@/lib/publications';
import { contentDocumentPaths } from '@/lib/devpicon-content';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...['', '/contact/', '/talks/', '/contributions/', '/privacy/', '/privacy/markdown-viewer/'].map((route) => ({ url: `https://picon.dev/${locale}${route || '/'}` })),
    { url: publicationUrl(locale) },
    ...Object.values(contentDocumentPaths).map((route) => ({ url: `https://picon.dev/${locale}/${route}/` })),
    ...publications.map((publication) => ({ url: publicationUrl(locale, publication.slug) })),
  ]);
}
