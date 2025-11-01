import ContactHero from '@/components/ContactHero';
import NewsletterSection from '@/components/NewsletterSection';
import ProfessionalContact from '@/components/ProfessionalContact';
import SocialLinks from '@/components/SocialLinks';

export const metadata = {
  title: 'Contact - Armando Picón',
  description: 'Get in touch with me for projects, collaborations, or subscribe to my newsletter for tech content and updates.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f19] transition-colors">
      <ContactHero />
      <NewsletterSection />
      <ProfessionalContact />
      <SocialLinks />
    </main>
  );
}
