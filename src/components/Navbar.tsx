import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyProfile';

const NAV_LINKS = [
  { href: '#profil', id: 'profil', label: 'Profil' },
  { href: '#operasional', id: 'operasional', label: 'Peta Distribusi' },
  { href: '#organisasi', id: 'organisasi', label: 'Organisasi' },
  { href: '#legalitas', id: 'legalitas', label: 'Legalitas' },
  { href: '#klien', id: 'klien', label: 'Klien' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / docHeight));
        setScrollProgress(progress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['beranda', ...NAV_LINKS.map((l) => l.id), 'kontak'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#223029] bg-[#0E1512]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#beranda"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-md py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
        >
          <span className="inline-flex items-center rounded-md bg-white/95 px-2 py-1">
            <img
              src="/assets/images/gen-logo.png"
              alt="Logo PT. GTR Energi Nusantara"
              referrerPolicy="no-referrer"
              className="h-6 w-auto object-contain"
            />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg whitespace-nowrap shrink-0">
            {COMPANY_INFO.companyName}
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`shrink-0 whitespace-nowrap border-b-2 py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CC63F] ${
                  isActive
                    ? 'border-[#8CC63F] text-white'
                    : 'border-transparent text-[#B8C7BF] hover:border-[#8CC63F]/60 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#kontak"
            className="hidden shrink-0 whitespace-nowrap rounded-lg bg-[#8CC63F] px-4 py-2 text-sm font-bold text-[#0B1206] transition-colors duration-150 hover:bg-[#9DD64F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] md:inline-flex"
          >
            Hubungi Kami
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#2B3B33] text-[#D7E2DC] transition-colors hover:bg-[#19241F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Hairline */}
      <div
        aria-hidden="true"
        className="h-0.5 w-full bg-transparent"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-[#8CC63F] to-[#F59E0B] transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi seluler"
          className="border-t border-[#223029] bg-[#0E1512] px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#19241F] text-[#9BD447]'
                        : 'text-[#CBD7D1] hover:bg-[#19241F] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href="#kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center justify-center rounded-lg bg-[#8CC63F] px-4 py-2.5 text-sm font-bold text-[#0B1206] transition-colors hover:bg-[#9DD64F]"
              >
                Hubungi Kami
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
