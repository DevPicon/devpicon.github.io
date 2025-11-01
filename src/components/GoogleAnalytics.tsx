'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-WRZ0G12DGD';
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check user's consent preference
    const savedConsent = localStorage.getItem('cookie-consent');
    setConsent(savedConsent);
  }, []);

  // Default to denied until user accepts
  const analyticsStorage = consent === 'accepted' ? 'granted' : 'denied';

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent mode
            gtag('consent', 'default', {
              'analytics_storage': '${analyticsStorage}'
            });

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
