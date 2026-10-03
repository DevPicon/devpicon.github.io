'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const locale = useLocale();
  const t = useTranslations('cookieConsent');

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);

    // Enable Google Analytics with proper consent update
    if (typeof window !== 'undefined') {
      // Initialize dataLayer if not exists
      window.dataLayer = window.dataLayer || [];

      // Define gtag function if not exists
      if (!window.gtag) {
        window.gtag = function(...args) {
          window.dataLayer!.push(args);
        };
      }

      // Update consent
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });

      console.log('Consent updated to granted');
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);

    // Keep Analytics disabled
    if (typeof window !== 'undefined') {
      // Initialize dataLayer if not exists
      window.dataLayer = window.dataLayer || [];

      // Define gtag function if not exists
      if (!window.gtag) {
        window.gtag = function(...args) {
          window.dataLayer!.push(args);
        };
      }

      // Explicitly deny consent
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });

      console.log('Consent updated to denied');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <div className="cookie-copy">
          <div className="cookie-copy-main">
            <h3 className="cookie-title">
              {t('title')}
            </h3>
            <p className="cookie-description">
              {t('description')}{' '}
              <a
                href={`/${locale}/privacy`}
                className="cookie-link"
              >
                {t('learnMore')}
              </a>
            </p>
          </div>

          <div className="cookie-actions">
            <button
              onClick={rejectCookies}
              className="cookie-button cookie-button-secondary"
            >
              {t('reject')}
            </button>
            <button
              onClick={acceptCookies}
              className="cookie-button cookie-button-primary"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
