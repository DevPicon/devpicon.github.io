'use client';

import { useTranslations } from 'next-intl';

export default function ContactHero() {
  const t = useTranslations('contact.hero');

  return (
    <section className="contact-section contact-hero" aria-labelledby="contact-title">
      <div className="contact-hero-inner">
        <p className="contact-eyebrow"><span aria-hidden="true" /> DEV PICON / CONTACT</p>
        <h1 id="contact-title">{t('title')}<span>.</span></h1>
        <p className="contact-hero-description">{t('description')}</p>
        <div className="contact-availability">
          <span><i aria-hidden="true" />{t('availableProjects')}</span>
          <span><i aria-hidden="true" />{t('openCollabs')}</span>
        </div>
      </div>
    </section>
  );
}
