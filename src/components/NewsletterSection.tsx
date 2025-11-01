'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NewsletterSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                📬 Suscríbete a mi newsletter
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Recibe contenido exclusivo directamente en tu inbox
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Suscríbete a mi newsletter
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Recibe contenido exclusivo directamente en tu inbox
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <ul className="space-y-3">
                {[
                  'Nuevos episodios de Codalot Podcast',
                  'Artículos técnicos y tutoriales',
                  'Tips de desarrollo Android/Kotlin',
                  'Novedades de la industria tech'
                ].map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Mailchimp Form Placeholder */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-lg p-6 text-center">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-4 font-medium">
                🔧 Integración de Mailchimp pendiente
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-4">
                Una vez que configures tu cuenta de Mailchimp y obtengas el código embed,
                lo integraremos aquí.
              </p>
              <div className="text-left space-y-2 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 rounded p-4">
                <p className="font-mono">
                  {/* Aquí irá el formulario de Mailchimp */}
                </p>
                <p>
                  <strong>Pasos:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Ve a Mailchimp → Audience → Signup forms</li>
                  <li>Copia el código embed</li>
                  <li>Pégalo en este componente</li>
                </ol>
              </div>
            </div>

            {/* Stats (optional, can add later) */}
            {/* <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📊 +1,234 desarrolladores ya están suscritos
              </p>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
