'use client';

import { useEffect, useState } from 'react';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import AnimatedText from '@/components/AnimatedText';

const brandPhrases = ['Developer', 'Mobile', 'Applied AI'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: t('home'), href: '/' + locale },
    { label: t('contact'), href: '/' + locale + '/contact' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme !== 'light';
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    document.documentElement.classList.toggle('light', !shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    document.documentElement.classList.toggle('light', !newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.push(pathname.replace('/' + locale, '/' + newLocale));
  };

  return (
    <nav className="site-nav" aria-label={t('navigationLabel')}>
      <div className="site-nav-inner">
        <div className="site-nav-left">
          <div className="site-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className="site-nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="nav-icon-button mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <a className="site-brand" href={'/' + locale} aria-label={t('homeLinkLabel')}>
          <span>ARMANDO PICÓN</span>
          <small className="brand-tagline" aria-label="Developer · Mobile · Applied AI">
            <AnimatedText phrases={brandPhrases} />
          </small>
        </a>

        <div className="site-nav-right">
          <a className="site-nav-cta" href={'/' + locale + '/contact'}>
            {t('contact')}
            <span aria-hidden="true">↗</span>
          </a>
          <button
            onClick={toggleLanguage}
            className="nav-icon-button language-button"
            aria-label={locale === 'es' ? t('switchToEnglish') : t('switchToSpanish')}
            title={locale === 'es' ? t('switchToEnglish') : t('switchToSpanish')}
          >
            <Languages size={17} aria-hidden="true" />
            <span>{locale === 'es' ? 'EN' : 'ES'}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="nav-icon-button theme-button"
            aria-label={isDarkMode ? t('switchToLight') : t('switchToDark')}
          >
            {isDarkMode ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav-panel">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
                className="mobile-nav-link"
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
