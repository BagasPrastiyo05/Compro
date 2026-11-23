import { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  FileCheck2,
  Search,
  X,
} from 'lucide-react';
import { COMPANY_INFO, LEGALITY_DOCUMENTS } from '../data/companyProfile';
import type { LegalityCategory, LegalityDocument } from '../types/company';
import { searchLegalityDocs } from '../utils/companyHelpers';

const CATEGORIES: LegalityCategory[] = [
  'Semua',
  'Perizinan Pusat',
  'Perpajakan & WAPU',
  'Penyaluran Resmi',
];

export function LegalitySection() {
  const [selectedCategory, setSelectedCategory] = useState<LegalityCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoc, setActiveDoc] = useState<LegalityDocument | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleDocs = searchLegalityDocs(
    LEGALITY_DOCUMENTS,
    selectedCategory,
    searchQuery
  );

  useEffect(() => {
    if (!activeDoc) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDoc(null);
      } else if (event.key === 'ArrowRight') {
        const idx = LEGALITY_DOCUMENTS.findIndex((d) => d.id === activeDoc.id);
        const next = LEGALITY_DOCUMENTS[(idx + 1) % LEGALITY_DOCUMENTS.length];
        setActiveDoc(next);
      } else if (event.key === 'ArrowLeft') {
        const idx = LEGALITY_DOCUMENTS.findIndex((d) => d.id === activeDoc.id);
        const prev =
          LEGALITY_DOCUMENTS[
            (idx - 1 + LEGALITY_DOCUMENTS.length) % LEGALITY_DOCUMENTS.length
          ];
        setActiveDoc(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDoc]);

  const navigateModal = (direction: -1 | 1) => {
    if (!activeDoc) return;
    const currentIndex = LEGALITY_DOCUMENTS.findIndex((d) => d.id === activeDoc.id);
    const nextIndex =
      (currentIndex + direction + LEGALITY_DOCUMENTS.length) % LEGALITY_DOCUMENTS.length;
    setActiveDoc(LEGALITY_DOCUMENTS[nextIndex]);
  };

  const handleCopyRegistration = (doc: LegalityDocument) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(doc.registrationNumber).catch(() => {
        // Ignore clipboard permission errors in restricted contexts
      });
    }
    setCopiedId(doc.id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === doc.id ? null : current));
    }, 1800);
  };

  return (
    <section
      id="legalitas"
      className="border-b border-[#223029] bg-[#0B100E] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#9BD447]">
              Legalitas &amp; Kepatuhan Perusahaan
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Dokumen Perizinan, Perpajakan &amp; Penyalur Resmi
            </h2>
            <p className="mt-3 text-base text-[#BCCAC3]">
              Cari, filter, atau salin nomor registrasi perizinan OSS RBA, penetapan Wajib Pungut daerah, serta Surat Keterangan Penyalur resmi.
            </p>
          </div>

          <a
            href={COMPANY_INFO.pdfBrochurePath}
            download="Company_Profile_PT_GTR_Energi_Nusantara_2026.pdf"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-lg border border-[#2C3C34] bg-[#141C18] px-4 py-2.5 text-sm font-semibold text-[#F3F6F4] transition-colors hover:border-[#8CC63F]/60 hover:bg-[#19231E] lg:self-auto"
          >
            <Download className="h-4 w-4 text-[#9BD447]" aria-hidden="true" />
            Unduh Berkas Lengkap (PDF)
          </a>
        </div>

        {/* Category Filter Tabs + Live Search */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-b border-[#223029] pb-4 lg:flex-row lg:items-center">
          <div
            role="tablist"
            aria-label="Filter kategori dokumen legalitas"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-10 shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
                    isActive
                      ? 'bg-[#8CC63F] text-[#0B1206]'
                      : 'border border-[#26352E] bg-[#141C18] text-[#C8D4CE] hover:border-[#8CC63F]/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="legality-search-input" className="sr-only">
              Cari dokumen legalitas
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8FA299]"
              aria-hidden="true"
            />
            <input
              id="legality-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari izin atau nomor registrasi..."
              className="min-h-10 w-full rounded-lg border border-[#2A3B32] bg-[#141C18] pr-8 pl-9 text-sm text-white placeholder:text-[#788981] focus:border-[#8CC63F] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian legalitas"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-[#9FB0A8] hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Result Count */}
        <p
          data-testid="legality-count-label"
          className="mt-4 text-xs text-[#9FB0A8] tabular-nums"
        >
          Menampilkan {visibleDocs.length} dari {LEGALITY_DOCUMENTS.length} dokumen resmi
        </p>

        {/* Legality Document Cards */}
        {visibleDocs.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleDocs.map((doc) => {
              const isCopied = copiedId === doc.id;
              return (
                <article
                  key={doc.id}
                  className="flex flex-col justify-between rounded-xl border border-[#24332B] bg-[#141C18] p-6 transition-colors duration-150 hover:border-[#8CC63F]/50"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#9FB0A8]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#9BD447]">{doc.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{doc.category}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyRegistration(doc)}
                        aria-label={`Salin nomor registrasi ${doc.code}`}
                        className="inline-flex min-h-8 items-center gap-1 rounded border border-[#2B3B33] bg-[#0E1512] px-2 py-1 text-[11px] font-semibold text-[#D2DDD7] transition-colors hover:border-[#8CC63F]/60 hover:text-white"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-[#9BD447]" aria-hidden="true" />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-[#9FB0A8]" aria-hidden="true" />
                            Salin No.
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold text-white">
                      {doc.title}
                    </h3>

                    <p className="mt-2 font-mono text-xs font-medium text-[#F59E0B] tabular-nums">
                      No. {doc.registrationNumber}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-[#B6C5BE]">
                      {doc.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#24332B] pt-4">
                    <p className="text-xs text-[#9FB0A8]">
                      {doc.issuer}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-[#E5ECE8]">
                      {doc.effectivePeriod}
                    </p>

                    <button
                      type="button"
                      onClick={() => setActiveDoc(doc)}
                      aria-label={`Lihat detail dokumen ${doc.code}: ${doc.title}`}
                      className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#2E3F36] bg-[#1A241F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#8CC63F] hover:bg-[#223029] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
                    >
                      <Eye className="h-4 w-4 text-[#9BD447]" aria-hidden="true" />
                      Periksa Detail Izin
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-[#24332B] bg-[#141C18] p-8 text-center">
            <p className="text-sm font-semibold text-white">
              Tidak ditemukan dokumen legalitas yang sesuai dengan kata kunci tersebut.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-[#8CC63F] px-4 py-2 text-xs font-bold text-[#0B1206] hover:bg-[#9DD64F]"
            >
              Reset Filter Legalitas
            </button>
          </div>
        )}
      </div>

      {/* Interactive Document Verification Modal (No Raster Image) */}
      {activeDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legality-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveDoc(null);
            }
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#2C3C34] bg-[#141C18] shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#24332B] px-6 py-4">
              <div>
                <p className="text-xs font-semibold text-[#9BD447]">
                  {activeDoc.code} · {activeDoc.category}
                </p>
                <h3
                  id="legality-modal-title"
                  className="mt-0.5 font-display text-lg font-bold text-white"
                >
                  {activeDoc.title}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-[#BCCAC3] tabular-nums">
                  {activeDoc.registrationNumber} · {activeDoc.effectivePeriod}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                aria-label="Tutup dialog"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#2E3F36] text-[#CBD7D1] transition-colors hover:bg-[#1E2A24] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#0D1310] p-6">
              <div className="rounded-xl border border-[#24332B] bg-[#141C18] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="h-5 w-5 text-[#9BD447]" aria-hidden="true" />
                    <span className="font-display text-sm font-bold text-white">
                      Lembar Verifikasi Legalitas Resmi
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyRegistration(activeDoc)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#2E3F36] bg-[#1A241F] px-3 py-1.5 text-xs font-semibold text-white hover:border-[#8CC63F]"
                  >
                    {copiedId === activeDoc.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#9BD447]" aria-hidden="true" />
                        Nomor Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#9BD447]" aria-hidden="true" />
                        Salin Nomor Registrasi
                      </>
                    )}
                  </button>
                </div>

                <dl className="mt-4 grid grid-cols-1 gap-4 border-t border-[#223029] pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-[#9FB0A8]">Nomor Registrasi / Surat</dt>
                    <dd className="mt-1 font-mono text-sm font-semibold text-[#F59E0B] tabular-nums">
                      {activeDoc.registrationNumber}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#9FB0A8]">Masa Berlaku / Tanggal Terbit</dt>
                    <dd className="mt-1 font-medium text-white">
                      {activeDoc.effectivePeriod}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#9FB0A8]">Instansi Penerbit</dt>
                    <dd className="mt-1 font-medium text-white">
                      {activeDoc.issuer}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-[#9FB0A8]">Ruang Lingkup Kepatuhan</dt>
                    <dd className="mt-1 leading-relaxed text-[#BCCAC3]">
                      {activeDoc.summary}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#24332B] bg-[#141C18] px-6 py-3.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateModal(-1)}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#2E3F36] bg-[#1A241F] px-3.5 py-2 text-xs font-semibold text-[#E5ECE8] hover:border-[#8CC63F]/60"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => navigateModal(1)}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-[#2E3F36] bg-[#1A241F] px-3.5 py-2 text-xs font-semibold text-[#E5ECE8] hover:border-[#8CC63F]/60"
                >
                  Berikutnya
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                className="min-h-10 rounded-lg bg-[#8CC63F] px-4 py-2 text-xs font-bold text-[#0B1206] hover:bg-[#9DD64F]"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
