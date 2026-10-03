import ContactHero from '@/components/ContactHero';
import NewsletterSection from '@/components/NewsletterSection';
import ProfessionalContact from '@/components/ProfessionalContact';
import SocialLinks from '@/components/SocialLinks';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  return (
    <main className="contact-page">
      <ContactHero />
      <ProfessionalContact />
      <SocialLinks />
      <NewsletterSection />
    </main>
  );
}
