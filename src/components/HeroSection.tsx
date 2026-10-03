'use client';

import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-inner">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow-mark" aria-hidden="true" />
              {t('eyebrow')}
            </p>

            <h1 id="home-title" className="hero-heading">
              {t('headline')}
              <span>{t('headlineHighlight')}</span>
            </h1>

            <p className="hero-description">{t('description')}</p>

            <div className="hero-actions">
              <a className="hero-action hero-action-primary" href="#focus">
                {t('projectsCta')}
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <a className="hero-action hero-action-secondary" href={'/' + locale + '/contact'}>
                {t('contactCta')}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            <p className="hero-availability">
              <span className="availability-dot" aria-hidden="true" />
              {t('availability')}
            </p>
          </div>

          <figure className="hero-portrait">
            <div className="hero-portrait-glow" aria-hidden="true" />
            <Image
              src="/armando-kotlinconf.webp"
              alt={t('portraitAlt')}
              fill
              priority
              sizes="(max-width: 800px) 90vw, 44vw"
              className="hero-portrait-image"
            />
            <figcaption className="hero-portrait-caption">
              <span className="portrait-name">Armando Picón</span>
              <span className="portrait-role">{t('portraitCaption')}</span>
            </figcaption>
          </figure>
        </div>

        <div className="hero-proof">
          <div className="proof-item">
            <span className="proof-label">{t('proof.mobileLabel')}</span>
            <span className="proof-value">Android <i>·</i> iOS <i>·</i> KMP</span>
          </div>
          <div className="proof-item">
            <span className="proof-label">{t('proof.focusLabel')}</span>
            <span className="proof-value">{t('proof.focusValue')}</span>
          </div>
          <div className="proof-item">
            <span className="proof-label">{t('proof.podcastLabel')}</span>
            <span className="proof-value">Codalot</span>
          </div>
        </div>
      </div>
    </section>
  );
}
