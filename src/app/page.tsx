import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Specialties from '@/components/landing/specialties';
import Testimonials from '@/components/landing/testimonials';
import ContactForm from '@/components/landing/contact-form';
import Footer from '@/components/landing/footer';
import CtaSticky from '@/components/landing/cta-sticky';

export default function Home() {
  const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL ?? undefined
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-[9999]">
        <Header />
      </div>
      <main className="flex-1 pt-28 md:pt-28 pb-24 md:pb-8">
        <Hero />
        <Specialties />
        <Testimonials />
        <ContactForm notificationEmail={notificationEmail} />
      </main>
      <Footer />
      <CtaSticky />
    </div>
  );
}
