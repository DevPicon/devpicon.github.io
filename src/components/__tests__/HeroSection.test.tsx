import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

jest.mock('../AnimatedText', () => function MockAnimatedText({ phrases }: { phrases: string[] }) {
  return <span>{phrases.join(' | ')}</span>;
});

describe('HeroSection', () => {
  it('renders the mobile AI headline', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { name: 'La IA móvil, en el dispositivo.' })).toBeInTheDocument();
  });

  it('renders the current focus and availability', () => {
    render(<HeroSection />);

    expect(screen.getByText('Mobile systems · AI on-device')).toBeInTheDocument();
    expect(screen.getByText('AI On-Device')).toBeInTheDocument();
    expect(screen.getByText('🟢 Abierto a nuevos roles Tech Lead / Senior Mobile.')).toBeInTheDocument();
    expect(screen.getByAltText('Armando Picón en KotlinConf 2026')).toBeInTheDocument();
  });
});
