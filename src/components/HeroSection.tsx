import { useState } from 'react';
import { ArrowRight, Calculator, Download, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, KEY_METRICS } from '../data/companyProfile';
import type { OperationalRegion, PrefillQuotePayload } from '../types/company';
import { formatLiters, getRegionComplianceNote } from '../utils/companyHelpers';

interface HeroSectionProps {
  onApplyToQuote: (payload: Omit<PrefillQuotePayload, 'requestId'>) => void;
}

const REGION_OPTIONS: Array<Exclude<OperationalRegion, 'Semua Wilayah'>> = [
  'Sulawesi Tenggara',
  'Sulawesi Tengah',
  'Sulawesi Selatan',
  'Maluku Utara',
  'Papua Barat Daya',
];

const VOLUME_PRESETS = [10000, 25000, 35000, 50000];

export function HeroSection({ onApplyToQuote }: HeroSectionProps) {
  const [selectedRegion, setSelectedRegion] = useState<
    Exclude<OperationalRegion, 'Semua Wilayah'>
  >('Sulawesi Tenggara');
  const [volumeLiters, setVolumeLiters] = useState<number>(25000);

  const compliance = getRegionComplianceNote(selectedRegion);

  return (
    <section
      id="beranda"
      className="border-b border-[#223029] bg-[#0B100E]"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Value Proposition */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#9BD447]">
                Badan Usaha Hilir Migas Resmi · Head Office Tangerang Selatan
              </p>

              <h1
                className="mt-3 max-w-2xl font-display font-bold tracking-tight text-white"
                style={{
                  fontSize: 'clamp(2.1rem, 3.6vw, 3.25rem)',
                  lineHeight: 1.12,
                  textWrap: 'balance',
                }}
              >
                Mitra Distribusi BBM Solar Industri Terpercaya untuk Sektor Pertambangan
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#BCCAC3]">
                {COMPANY_INFO.tagline} Kami memasok BBM Solar Industri (HSD) berstandar Ditjen MIGAS untuk mendukung operasional site pertambangan di Sulawesi dan Maluku Utara.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <a
                  href="#kontak"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#8CC63F] px-6 py-2.5 text-sm font-bold text-[#0B1206] transition-colors duration-150 hover:bg-[#9DD64F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
                >
                  Ajukan Penawaran BBM
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#legalitas"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[#2C3C34] bg-[#141C18] px-5 py-2.5 text-sm font-semibold text-[#F3F6F4] transition-colors duration-150 hover:border-[#8CC63F]/60 hover:bg-[#19231E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
                >
                  <ShieldCheck className="h-4 w-4 text-[#9BD447]" aria-hidden="true" />
                  Tinjau Legalitas Resmi
                </a>

                <a
                  href={COMPANY_INFO.pdfBrochurePath}
                  download="Company_Profile_PT_GTR_Energi_Nusantara_2026.pdf"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap px-2 py-2 text-sm font-medium text-[#BCCAC3] transition-colors hover:text-white"
                >
                  <Download className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                  Unduh PDF
                </a>
              </div>
            </div>

            {/* Unboxed Metadata Trust Strip */}
            <div className="mt-7 border-t border-[#223029] pt-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#A3B4AC] sm:text-sm">
                <span className="font-mono tabular-nums text-[#E5ECE8]">NIB 1103250053715</span>
                <span aria-hidden="true" className="text-[#3C4F45]">·</span>
                <span>SKP PT Bhumi Energi Barakah</span>
                <span aria-hidden="true" className="text-[#3C4F45]">·</span>
                <span>WAPU Sultra &amp; Maluku Utara</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive HSD Supply Volume & Region Pre-Configurer */}
          <div className="lg:col-span-5">
            <div
              data-testid="hero-supply-calculator"
              className="flex h-full flex-col justify-between rounded-xl border border-[#283830] bg-[#141C18] p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[#223029] pb-3.5">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-[#9BD447]" aria-hidden="true" />
                    <h2 className="font-display text-sm font-bold text-white">
                      Simulasi Cepat Suplai HSD
                    </h2>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#F59E0B] tabular-nums">
                    Standar MIGAS
                  </span>
                </div>

                {/* Region Selector */}
                <div className="mt-4">
                  <label
                    htmlFor="hero-region-select"
                    className="block text-xs font-semibold text-[#BCCAC3]"
                  >
                    Koridor Wilayah Pengiriman
                  </label>
                  <select
                    id="hero-region-select"
                    value={selectedRegion}
                    onChange={(e) =>
                      setSelectedRegion(
                        e.target.value as Exclude<OperationalRegion, 'Semua Wilayah'>
                      )
                    }
                    className="mt-1.5 min-h-10 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3 py-2 text-sm font-medium text-white focus:border-[#8CC63F] focus:outline-none"
                  >
                    {REGION_OPTIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Volume Slider + Presets */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="hero-volume-range"
                      className="font-semibold text-[#BCCAC3]"
                    >
                      Estimasi Volume Pengiriman
                    </label>
                    <span
                      data-testid="hero-calc-volume"
                      className="font-mono text-sm font-bold text-[#9BD447] tabular-nums"
                    >
                      {formatLiters(volumeLiters)}
                    </span>
                  </div>

                  <input
                    id="hero-volume-range"
                    type="range"
                    min={5000}
                    max={75000}
                    step={5000}
                    value={volumeLiters}
                    onChange={(e) => setVolumeLiters(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#8CC63F]"
                  />

                  <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                    {VOLUME_PRESETS.map((preset) => {
                      const active = volumeLiters === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setVolumeLiters(preset)}
                          className={`min-h-9 rounded-md px-2 py-1 font-mono text-xs font-semibold tabular-nums transition-colors whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-[#8CC63F] text-[#0B1206]'
                              : 'border border-[#2A3B32] bg-[#0D1310] text-[#CBD7D1] hover:border-[#8CC63F]/60 hover:text-white'
                          }`}
                        >
                          {preset / 1000}k L
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Regional Regulatory & Supply Summary */}
                <div className="mt-4 rounded-lg border border-[#24332B] bg-[#0D1310] p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-semibold text-[#9BD447]">
                      {compliance.badge}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#F59E0B] tabular-nums">
                      {formatLiters(volumeLiters)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#B6C5BE]">
                    {compliance.note}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onApplyToQuote({
                    region: selectedRegion,
                    volumeLiters,
                    notes: `Simulasi cepat: permintaan suplai ${formatLiters(volumeLiters)} untuk wilayah ${selectedRegion}.`,
                  })
                }
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#8CC63F]/70 bg-[#1B2720] px-4 py-2.5 text-sm font-bold text-[#9BD447] transition-colors hover:bg-[#8CC63F] hover:text-[#0B1206] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
              >
                Lanjut ke Form Penawaran
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Metric Strip Below Hero Split */}
        <div className="mt-7 grid grid-cols-1 gap-4 border-t border-[#223029] pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className="rounded-xl border border-[#24332B] bg-[#131B17] p-5 transition-colors hover:border-[#8CC63F]/50"
            >
              <p
                className={`font-mono text-2xl font-bold tracking-tight tabular-nums ${
                  idx === 0
                    ? 'text-[#9BD447]'
                    : idx === 3
                    ? 'text-[#F59E0B]'
                    : 'text-white'
                }`}
              >
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#EDF2EF]">
                {metric.label}
              </p>
              <p className="mt-1 text-xs text-[#9FB0A8]">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
