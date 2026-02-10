import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Specialties from '@/components/landing/specialties';
import Testimonials from '@/components/landing/testimonials';
import Cta from '@/components/landing/cta';
import ContactForm from '@/components/landing/contact-form';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Specialties />
        <Testimonials />
        <Cta />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
