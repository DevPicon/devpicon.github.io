import { render, screen } from '@testing-library/react';
import PublicationsPage from '@/app/[locale]/publications/page';
import PublicationPage, { generateMetadata } from '@/app/[locale]/publications/[slug]/page';
import { getPublication, readPublication } from '@/lib/publications';

jest.mock('@/i18n', () => ({ locales: ['es', 'en'] }));

jest.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
}));

describe('Bilingual publications', () => {
  it.each(['es', 'en'])('links the %s index to its complete article', (locale) => {
    render(<PublicationsPage params={{ locale }} />);
    const title = locale === 'es' ? /la ia puede escribir/i : /ai can write/i;
    expect(screen.getByRole('link', { name: title })).toHaveAttribute('href', `/${locale}/publications/ai-assisted-engineering/`);
  });

  it.each(['es', 'en'])('renders the %s article, six references and a language alternative', (locale) => {
    render(<PublicationPage params={{ locale, slug: 'ai-assisted-engineering' }} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5);
    const other = locale === 'es' ? 'en' : 'es';
    expect(screen.getByRole('link', { name: locale === 'es' ? 'Read in English' : 'Leer en español' })).toHaveAttribute('href', `/${other}/publications/ai-assisted-engineering/`);
    const externalLinks = screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('https://'));
    expect(externalLinks).toHaveLength(6);
    expect(screen.getByText(locale === 'es' ? /el ejemplo móvil es hipotético/i : /the mobile example is hypothetical/i)).toBeInTheDocument();
    expect(screen.getByText('PROJECT_GUIDE.md')).toBeInTheDocument();
  });

  it('keeps source references identical across translations', () => {
    const publication = getPublication('ai-assisted-engineering')!;
    const links = (locale: 'es' | 'en') => readPublication(publication, locale).match(/https:\/\/[^)]+/g);
    expect(links('es')).toEqual(links('en'));
  });

  it('declares a separate canonical for each translation and both alternatives', () => {
    const metadata = generateMetadata({ params: { locale: 'es', slug: 'ai-assisted-engineering' } });
    expect(metadata.alternates).toEqual({
      canonical: 'https://picon.dev/es/publications/ai-assisted-engineering/',
      languages: {
        es: 'https://picon.dev/es/publications/ai-assisted-engineering/',
        en: 'https://picon.dev/en/publications/ai-assisted-engineering/',
      },
    });
  });

  it('rejects unknown article slugs', () => {
    expect(() => PublicationPage({ params: { locale: 'es', slug: 'missing' } })).toThrow('NEXT_NOT_FOUND');
  });
});
