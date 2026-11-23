import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AboutVisionSection } from './components/AboutVisionSection';
import { ClientsSection } from './components/ClientsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LegalitySection } from './components/LegalitySection';
import { Navbar } from './components/Navbar';
import { OperationsFleetSection } from './components/OperationsFleetSection';
import { OrganizationSection } from './components/OrganizationSection';
import type { PrefillQuotePayload } from './types/company';

export default function App() {
  const [prefillQuote, setPrefillQuote] = useState<PrefillQuotePayload | null>(
    null
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleApplyToQuote = (
    payload: Omit<PrefillQuotePayload, 'requestId'>
  ) => {
    setPrefillQuote({
      ...payload,
      requestId: Date.now(),
    });
    const contactEl = document.getElementById('kontak');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B100E] text-[#F3F6F4]">
      <Navbar />
      <main>
        <HeroSection onApplyToQuote={handleApplyToQuote} />
        <AboutVisionSection />
        <OperationsFleetSection onSelectRegionQuote={handleApplyToQuote} />
        <OrganizationSection />
        <LegalitySection />
        <ClientsSection onSelectSiteQuote={handleApplyToQuote} />
        <ContactSection prefillQuote={prefillQuote} />
      </main>
      <Footer />

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas halaman"
          className="fixed right-5 bottom-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#8CC63F]/60 bg-[#141C18]/95 text-[#9BD447] shadow-lg backdrop-blur-xs transition-colors hover:bg-[#8CC63F] hover:text-[#0B1206] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
