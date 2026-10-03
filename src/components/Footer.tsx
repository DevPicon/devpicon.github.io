'use client';

import { Github, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/devpicon' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/devpicon' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/devpicon' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/devpicon' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@devpicon' },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <a className="footer-wordmark" href={'/' + locale}>ARMANDO PICÓN</a>
        <nav className="footer-social" aria-label={t('socialLabel')}>
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="footer-social-link"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            );
          })}
        </nav>
        <div className="footer-baseline">
          <span>© {new Date().getFullYear()} Armando Picón. {t('rights')}.</span>
          <span className="footer-signature">Android · KMP · AI On-Device</span>
          <Link href={'/' + locale + '/privacy'} className="footer-privacy">
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
