import { useState } from 'react';
import { ArrowRight, MapPin, Search, X } from 'lucide-react';
import { CLIENT_SITES, PARTNER_LOGOS } from '../data/companyProfile';
import type { OperationalRegion, PrefillQuotePayload } from '../types/company';
import { searchClientSites } from '../utils/companyHelpers';

interface ClientsSectionProps {
  onSelectSiteQuote: (payload: Omit<PrefillQuotePayload, 'requestId'>) => void;
}

const SITE_FILTERS: Array<OperationalRegion | 'Semua Site'> = [
  'Semua Site',
  'Sulawesi Tenggara',
  'Sulawesi Tengah',
  'Maluku Utara',
];

export function ClientsSection({ onSelectSiteQuote }: ClientsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<OperationalRegion | 'Semua Site'>('Semua Site');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleSites = searchClientSites(CLIENT_SITES, activeFilter, searchQuery);

  return (
    <section
      id="klien"
      className="border-b border-[#223029] bg-[#101714] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Strategic Partners Header with Partner Logos Only (NPM & IRM) */}
        <div className="grid grid-cols-1 items-center gap-8 border-b border-[#223029] pb-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#9BD447]">
              Mitra &amp; Portofolio Klien
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Dipercaya oleh Proyek Pertambangan &amp; Industri Nasional
            </h2>
            <p className="mt-3 text-base text-[#BCCAC3]">
              Mendukung kelancaran operasional alat berat dan pembangkit di berbagai site pertambangan utama di Sulawesi Tenggara, Sulawesi Tengah, dan Maluku Utara.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.id}
                className="flex h-36 items-center justify-center rounded-xl border border-[#24332B] bg-white p-6"
              >
                <img
                  src={partner.logoPath}
                  alt={`Logo ${partner.name}`}
                  referrerPolicy="no-referrer"
                  className="max-h-24 w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Active Mining Site Directory with Province Tabs + Live Search */}
        <div className="mt-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Daftar Site Operasional Klien
            </h3>
            <p
              data-testid="site-count-label"
              className="mt-1 text-sm text-[#A3B4AC] tabular-nums"
            >
              Menampilkan {visibleSites.length} dari {CLIENT_SITES.length} site aktif
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-60">
              <label htmlFor="client-search-input" className="sr-only">
                Cari site operasional klien
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8FA299]"
                aria-hidden="true"
              />
              <input
                id="client-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari site atau komoditas..."
                className="min-h-10 w-full rounded-lg border border-[#2A3B32] bg-[#161F1B] pr-8 pl-9 text-sm text-white placeholder:text-[#788981] focus:border-[#8CC63F] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian site klien"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-[#9FB0A8] hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div
              role="tablist"
              aria-label="Filter site klien berdasarkan provinsi"
              className="flex flex-wrap gap-2"
            >
              {SITE_FILTERS.map((region) => {
                const isSelected = activeFilter === region;
                return (
                  <button
                    key={region}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveFilter(region)}
                    className={`min-h-10 shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
                      isSelected
                        ? 'bg-[#8CC63F] text-[#0B1206]'
                        : 'border border-[#26352E] bg-[#161F1B] text-[#C8D4CE] hover:border-[#8CC63F]/50 hover:text-white'
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {visibleSites.length > 0 ? (
          <div
            data-testid="client-sites-grid"
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleSites.map((site) => (
              <article
                key={site.id}
                className="flex flex-col justify-between rounded-xl border border-[#24332B] bg-[#161F1B] p-5 transition-colors hover:border-[#8CC63F]/50"
              >
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#9BD447]">
                    {site.siteCode}
                  </p>
                  <h4 className="mt-1.5 font-display text-base font-bold text-white">
                    {site.companyName}
                  </h4>
                  <p className="mt-1 text-xs text-[#9FB0A8]">
                    {site.sector}
                  </p>
                </div>

                <div className="mt-4 space-y-3 border-t border-[#24332B] pt-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#CBD7D1]">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                    <span>{site.locationDetail}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectSiteQuote({
                        region: site.province,
                        volumeLiters: 25000,
                        notes: `Referensi rute suplai setara koridor ${site.siteCode} (${site.locationDetail}).`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9BD447] hover:text-white hover:underline"
                  >
                    Minta Penawaran Koridor Ini
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-[#24332B] bg-[#161F1B] p-8 text-center">
            <p className="text-sm font-semibold text-white">
              Tidak ada site operasional yang cocok dengan pencarian Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('Semua Site');
                setSearchQuery('');
              }}
              className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-[#8CC63F] px-4 py-2 text-xs font-bold text-[#0B1206] hover:bg-[#9DD64F]"
            >
              Tampilkan Semua Site
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
