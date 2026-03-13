import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Specialties from '@/components/landing/specialties';
import Testimonials from '@/components/landing/testimonials';
import ContactForm from '@/components/landing/contact-form';
import Footer from '@/components/landing/footer';
import CtaSticky from '@/components/landing/cta-sticky';
import UrgencySection from '@/components/landing/urgency-section';

export default function Home() {
  const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL ?? undefined
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-20 pb-20 md:pb-0">
        <Hero />
        <Specialties />
        <Testimonials />
        <UrgencySection />
        <ContactForm notificationEmail={notificationEmail} />
      </main>
      <Footer />
      <CtaSticky />
    </div>
  );
}
