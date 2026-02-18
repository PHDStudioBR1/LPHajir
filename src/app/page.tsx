import Header from '@/components/landing/header';
import CountdownBanner from '@/components/landing/countdown-banner';
import Hero from '@/components/landing/hero';
import Specialties from '@/components/landing/specialties';
import Testimonials from '@/components/landing/testimonials';
import ContactForm from '@/components/landing/contact-form';
import Footer from '@/components/landing/footer';
import CtaSticky from '@/components/landing/cta-sticky';
import UrgencySection from '@/components/landing/urgency-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-[9999]">
        <CountdownBanner />
        <Header />
      </div>
      <main className="flex-1 pt-40 md:pt-40 pb-20 md:pb-0">
        <Hero />
        <Specialties />
        <Testimonials />
        <UrgencySection />
        <ContactForm />
      </main>
      <Footer />
      <CtaSticky />
    </div>
  );
}
