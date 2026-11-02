import { render, screen, within, cleanup } from '@testing-library/react';
import TalksPage, { generateMetadata } from '@/app/[locale]/talks/page';
import { talks, sortTalks, talkDate, talkResources, relatedResourcesFor } from '@/lib/talks';
import sitemap from '@/app/sitemap';

jest.mock('@/i18n', () => ({ locales: ['es', 'en'] }));
jest.mock('next/navigation', () => ({ notFound: () => { throw new Error('NEXT_NOT_FOUND'); } }));

describe('Event-linked talks archive', () => {
  it('keeps the exact same original titles and order in both site languages', () => {
    const headings: string[][] = [];
    for (const locale of ['es', 'en']) {
      render(<TalksPage params={{ locale }} />);
      expect(screen.getByRole('heading', { level: 1, name: locale === 'es' ? 'Charlas' : 'Talks' })).toBeInTheDocument();
      headings.push(screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent!));
      expect(headings.at(-1)).toEqual(talks.map((talk) => talk.title));
      expect(screen.getAllByLabelText(locale === 'es' ? /Idioma del material: Español/ : /Material language: Spanish/).length).toBeGreaterThan(0);
      expect(screen.getByLabelText(locale === 'es' ? 'Idioma del material: Portugués' : 'Material language: Portuguese')).toBeInTheDocument();
      cleanup();
    }
    expect(headings[0]).toEqual(headings[1]);
  });

  it('shows the owner-confirmed virtual Nerdearla appearance and its organizer recording', () => {
    render(<TalksPage params={{ locale: 'es' }} />);
    const entry = screen.getByRole('heading', { name: /¿Un futuro sin juniors/ }).closest('article')!;
    expect(within(entry).getByText('Nerdearla Argentina 2025')).toBeInTheDocument();
    expect(within(entry).getByText('Virtual')).toBeInTheDocument();
    expect(entry.querySelector('time')).toHaveAttribute('datetime', '2025');
    expect(entry.querySelector('time')).toHaveTextContent('2025');
    expect(within(entry).getByRole('link', { name: 'Grabación' })).toHaveAttribute('href', 'https://nerdearla.com/nerdflix/9YjlJN4pRh0/');
    expect(screen.queryByText(/La ilusión de la memoria/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Leading Communities by Teaching/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gemini Nano/)).not.toBeInTheDocument();
  });

  it('sorts unsorted appearances without changing input and preserves repeated talks at different events', () => {
    const ordered = [talks[0], talks.find((talk) => talk.date === '2024-11-16')!, talks.at(-1)!];
    const input = [ordered[2], ordered[0], ordered[1]];
    expect(sortTalks(input)).toEqual(ordered);
    expect(input[0]).toBe(ordered[2]);
    const builds = talks.filter((talk) => talk.title === 'Uncovering the magic behind Android Builds');
    expect(builds).toHaveLength(2);
    expect(new Set(builds.map((talk) => talk.event)).size).toBe(2);
  });

  it('formats only the known date precision and avoids timezone shifts', () => {
    expect(talkDate('2025', 'es')).toBe('2025');
    expect(talkDate('2023-12', 'en')).toBe('December 2023');
    expect(talkDate('2017-05-08', 'es')).toBe('8 de mayo de 2017');
  });

  it('requires unique IDs, supported date precision, public resources and per-appearance evidence', () => {
    expect(new Set(talks.map((talk) => talk.id)).size).toBe(talks.length);
    for (const talk of talks) {
      expect(talk.date).toMatch(/^\d{4}(?:-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[12]\d|3[01]))?)?$/);
      expect(talk.event.length).toBeGreaterThan(3);
      expect(['es', 'en', 'pt']).toContain(talk.language);
      expect(Object.values(talk.links).length).toBeGreaterThan(0);
      expect(talk.provenance.sources.length).toBeGreaterThan(0);
      expect(talk.provenance.note.length).toBeGreaterThan(30);
      for (const href of Object.values(talk.links)) expect(new URL(href).protocol).toBe('https:');
    }
  });

  it.each(['es', 'en'])('exports %s metadata and sitemap URLs', (locale) => {
    const metadata = generateMetadata({ params: { locale } });
    expect(metadata.alternates).toEqual({ canonical: `https://picon.dev/${locale}/talks/`, languages: { es: 'https://picon.dev/es/talks/', en: 'https://picon.dev/en/talks/' } });
    expect(sitemap().map((entry) => entry.url)).toContain(`https://picon.dev/${locale}/talks/`);
  });

  it('rejects unknown site languages', () => {
    expect(() => TalksPage({ params: { locale: 'fr' } })).toThrow('NEXT_NOT_FOUND');
  });
});

describe('YouTube recording and practice resources', () => {
  it('links the organizer recording to the exact DevFest appearance', () => {
    render(<TalksPage params={{ locale: 'es' }} />);
    const entry = screen.getByRole('heading', { name: 'Coroutines on the way!' }).closest('article')!;
    expect(within(entry).getByRole('link', { name: 'Grabación' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=70EAAhb0FlY');
    const practice = within(entry).getByRole('region', { name: 'Practica este tema' });
    expect(within(practice).queryByRole('link', { name: 'Grabación' })).not.toBeInTheDocument();
    expect(within(practice).getByRole('link', { name: /Kotlin Coroutines 101/ })).toHaveAttribute('href', 'https://www.youtube.com/playlist?list=PLFSffqEi7-DxzWhCbfFfUzxcqEMdQtwaP');
  });

  it('uses the event month rather than the video upload date for DroidesChile', () => {
    render(<TalksPage params={{ locale: 'es' }} />);
    const entry = screen.getByRole('heading', { name: 'Dibujando en Compose', exact: true }).closest('article')!;
    expect(entry.querySelector('time')).toHaveAttribute('datetime', '2024-08');
    expect(within(entry).getByRole('link', { name: 'Grabación' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=CIYwuexLjN4');
    expect(within(entry).getByText('DroidesChile — Meetup Agosto 2024')).toBeInTheDocument();
  });

  it.each(['es', 'en'])('keeps original tutorial titles under a localized practice heading in %s', (locale) => {
    render(<TalksPage params={{ locale }} />);
    const entry = screen.getByRole('heading', { name: 'Compose Multiplatform: Dibujando gráficos para Android y iOS' }).closest('article')!;
    const practice = within(entry).getByRole('region', { name: locale === 'es' ? 'Practica este tema' : 'Practice this topic' });
    expect(within(practice).getAllByRole('link')).toHaveLength(3);
    expect(within(practice).getByRole('link', { name: /Bonus Track: Llevando el Temporizador a iOS con Compose Multiplatform/ })).toHaveAttribute('lang', 'es');
    expect(within(practice).getByText(locale === 'es' ? 'Video · Español' : 'Video · Spanish')).toBeInTheDocument();
    expect(within(practice).getAllByText(locale === 'es' ? 'Serie · Español' : 'Series · Spanish')).toHaveLength(2);
    expect(within(entry).queryByRole('link', { name: locale === 'es' ? 'Grabación' : 'Recording' })).not.toBeInTheDocument();
  });

  it('shows practice groups only for appearances with selected resources', () => {
    render(<TalksPage params={{ locale: 'es' }} />);
    expect(screen.getAllByRole('region', { name: 'Practica este tema' })).toHaveLength(3);
    const nerdearla = screen.getByRole('heading', { name: /¿Un futuro sin juniors/ }).closest('article')!;
    expect(within(nerdearla).queryByRole('region')).not.toBeInTheDocument();
    expect(document.querySelector('iframe')).not.toBeInTheDocument();
  });

  it('resolves every resource reference once and retains evidence and original titles', () => {
    expect(new Set(talkResources.map((resource) => resource.id)).size).toBe(talkResources.length);
    for (const talk of talks) {
      const selected = relatedResourcesFor(talk);
      expect(selected.map((resource) => resource.id)).toEqual(talk.relatedResourceIds || []);
      expect(new Set(selected.map((resource) => resource.url)).size).toBe(selected.length);
    }
    for (const resource of talkResources) {
      expect(resource.title.length).toBeGreaterThan(3);
      expect(resource.url).toMatch(/^https:\/\/www\.youtube\.com\/(watch\?v=|playlist\?list=)/);
      expect(resource.provenance.source).toBe(resource.url);
      expect(resource.provenance.note.length).toBeGreaterThan(30);
      expect(['video', 'series']).toContain(resource.kind);
    }
  });
});
