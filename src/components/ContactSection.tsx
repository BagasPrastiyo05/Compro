import { useEffect, useRef, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyProfile';
import type {
  OperationalRegion,
  PrefillQuotePayload,
  QuoteFormErrors,
  QuoteFormValues,
  TankerAllocationPlan,
} from '../types/company';
import {
  WHATSAPP_QUOTE_DISPLAY,
  WHATSAPP_QUOTE_NUMBER,
  buildWhatsAppQuoteMessage,
  buildWhatsAppQuoteUrl,
  estimateTankerAllocation,
  formatLiters,
  validateQuoteForm,
} from '../utils/companyHelpers';

interface ContactSectionProps {
  prefillQuote: PrefillQuotePayload | null;
}

const INITIAL_FORM: QuoteFormValues = {
  companyName: '',
  picName: '',
  email: '',
  phone: '',
  region: 'Sulawesi Tenggara',
  monthlyVolumeLiters: '25000',
  notes: '',
};

const REGION_OPTIONS: Array<Exclude<OperationalRegion, 'Semua Wilayah'>> = [
  'Sulawesi Tenggara',
  'Sulawesi Tengah',
  'Sulawesi Selatan',
  'Maluku Utara',
  'Papua Barat Daya',
];

export function ContactSection({ prefillQuote }: ContactSectionProps) {
  const [values, setValues] = useState<QuoteFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [copiedMessage, setCopiedMessage] = useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const [submittedPlan, setSubmittedPlan] = useState<{
    inquiry: QuoteFormValues;
    plan: TankerAllocationPlan;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!prefillQuote) return;
    setSubmittedPlan(null);
    setCopiedMessage(false);
    setErrors({});
    setValues((prev) => ({
      ...prev,
      region: prefillQuote.region,
      monthlyVolumeLiters: String(prefillQuote.volumeLiters),
      notes: prefillQuote.notes ?? prev.notes,
    }));
  }, [prefillQuote]);

  const handleFieldChange = <K extends keyof QuoteFormValues>(
    field: K,
    value: QuoteFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateQuoteForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const plan = estimateTankerAllocation(Number(values.monthlyVolumeLiters));
    setErrors({});
    setCopiedMessage(false);
    setSubmittedPlan({ inquiry: values, plan });
  };

  const handleCopyMessage = (message: string) => {
    setCopiedMessage(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedMessage(false);
      copyTimerRef.current = null;
    }, 2500);
    navigator.clipboard?.writeText(message).catch(() => {});
  };

  return (
    <section
      id="kontak"
      className="bg-[#0B100E] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Office & Contact Channels */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#9BD447]">
              Kontak &amp; Pengadaan
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Diskusikan Kebutuhan BBM Solar Industri Anda
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#BCCAC3]">
              Tim Supply Chain &amp; Komersial kami siap menyiapkan penawaran harga, jadwal pengiriman, serta kelengkapan administrasi pengadaan B2B.
            </p>

            <div className="mt-8 space-y-6 border-t border-[#223029] pt-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#9BD447]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {COMPANY_INFO.headOfficeTitle}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#B6C5BE]">
                    {COMPANY_INFO.headOfficeAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#9BD447]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Telepon &amp; WhatsApp Operasional
                  </h3>
                  <ul className="mt-1.5 space-y-2">
                    {COMPANY_INFO.phones.map((phone) => {
                      const cleanDigits = phone.replace(/[^\d]/g, '');
                      const isQuoteWhatsApp = cleanDigits === WHATSAPP_QUOTE_NUMBER;
                      return (
                        <li key={phone} className="flex flex-wrap items-center gap-2.5">
                          <a
                            href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                            className="font-mono text-sm font-medium text-[#E5ECE8] tabular-nums hover:text-[#9BD447] hover:underline"
                          >
                            {phone}
                          </a>
                          {isQuoteWhatsApp && (
                            <a
                              href={`https://wa.me/${WHATSAPP_QUOTE_NUMBER}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded border border-[#8CC63F]/40 bg-[#8CC63F]/10 px-2 py-0.5 text-xs font-semibold text-[#9BD447] hover:bg-[#8CC63F]/20"
                            >
                              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                              WhatsApp Penawaran
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#9BD447]" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Email Resmi Perusahaan
                  </h3>
                  <ul className="mt-1 space-y-1">
                    {COMPANY_INFO.emails.map((email) => (
                      <li key={email}>
                        <a
                          href={`mailto:${email}`}
                          className="text-sm font-medium text-[#E5ECE8] hover:text-[#9BD447] hover:underline"
                        >
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated RFQ Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#24332B] bg-[#141C18] p-6 sm:p-8">
              {submittedPlan ? (
                (() => {
                  const whatsappMessage = buildWhatsAppQuoteMessage(submittedPlan.inquiry);
                  const whatsappUrl = buildWhatsAppQuoteUrl(submittedPlan.inquiry);

                  return (
                    <div data-testid="rfq-confirmation" className="space-y-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#9BD447]" />
                        <div>
                          <h3 className="font-display text-xl font-bold text-white">
                            Permintaan Penawaran Siap Dikirim
                          </h3>
                          <p className="mt-1 text-sm text-[#BCCAC3]">
                            Terima kasih,{' '}
                            <span className="font-semibold text-white">
                              {submittedPlan.inquiry.picName}
                            </span>{' '}
                            ({submittedPlan.inquiry.companyName}). Rincian pengadaan Anda telah disiapkan untuk dikirim via WhatsApp ke{' '}
                            <span className="font-mono font-semibold whitespace-nowrap text-[#9BD447] tabular-nums">
                              {WHATSAPP_QUOTE_DISPLAY}
                            </span>
                            .
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-[#283830] bg-[#0D1310] p-5">
                        <p className="text-xs font-semibold tracking-wide text-[#9FB0A8] uppercase">
                          Ringkasan Permintaan Penawaran
                        </p>
                        <dl className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="text-xs text-[#9FB0A8]">Wilayah Tujuan</dt>
                            <dd className="mt-0.5 font-semibold text-white">
                              {submittedPlan.inquiry.region}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-[#9FB0A8]">Volume Diminta</dt>
                            <dd className="mt-0.5 font-mono font-semibold text-[#9BD447] tabular-nums">
                              {formatLiters(submittedPlan.plan.requestedLiters)}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-4 border-t border-[#223029] pt-3">
                          <p className="text-xs font-semibold text-[#9FB0A8]">
                            Pratinjau Pesan WhatsApp
                          </p>
                          <pre className="mt-2 whitespace-pre-wrap rounded border border-[#1E2A23] bg-[#080C0A] p-3 font-sans text-xs leading-relaxed text-[#D7E2DC]">
                            {whatsappMessage}
                          </pre>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#8CC63F] px-5 py-2.5 text-sm font-bold text-[#0B1206] hover:bg-[#9DD64F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F]"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          Kirim via WhatsApp ({WHATSAPP_QUOTE_DISPLAY})
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyMessage(whatsappMessage)}
                          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#2C3C34] bg-[#1A241F] px-4 py-2.5 text-sm font-semibold text-[#E5ECE8] hover:border-[#8CC63F]/60"
                        >
                          {copiedMessage ? (
                            <>
                              <Check className="h-4 w-4 text-[#9BD447]" aria-hidden="true" />
                              Pesan Tersalin
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" aria-hidden="true" />
                              Salin Pesan
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedPlan(null);
                            setCopiedMessage(false);
                            setValues(INITIAL_FORM);
                          }}
                          className="min-h-11 rounded-lg border border-[#2C3C34] bg-[#141C18] px-4 py-2.5 text-sm font-semibold text-[#BCCAC3] hover:border-[#8CC63F]/60 hover:text-white"
                        >
                          Buat Permintaan Baru
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Formulir Permintaan Penawaran (RFQ)
                    </h3>
                    <p className="mt-1 text-xs text-[#9FB0A8]">
                      Lengkapi data kebutuhan BBM Solar Industri (HSD) untuk mendapatkan penawaran harga dan jadwal suplai resmi.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rfq-company"
                        className="block text-xs font-semibold text-[#D7E2DC]"
                      >
                        Nama Perusahaan *
                      </label>
                      <input
                        id="rfq-company"
                        type="text"
                        value={values.companyName}
                        onChange={(e) => handleFieldChange('companyName', e.target.value)}
                        placeholder="PT. Contoh Tambang Nusantara"
                        aria-invalid={Boolean(errors.companyName)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2 text-sm text-white placeholder:text-[#66776F] focus:border-[#8CC63F] focus:outline-none"
                      />
                      {errors.companyName && (
                        <p role="alert" className="mt-1 text-xs font-medium text-red-400">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-pic"
                        className="block text-xs font-semibold text-[#D7E2DC]"
                      >
                        Nama Penanggung Jawab (PIC) *
                      </label>
                      <input
                        id="rfq-pic"
                        type="text"
                        value={values.picName}
                        onChange={(e) => handleFieldChange('picName', e.target.value)}
                        placeholder="Nama lengkap PIC"
                        aria-invalid={Boolean(errors.picName)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2 text-sm text-white placeholder:text-[#66776F] focus:border-[#8CC63F] focus:outline-none"
                      />
                      {errors.picName && (
                        <p role="alert" className="mt-1 text-xs font-medium text-red-400">
                          {errors.picName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rfq-email"
                        className="block text-xs font-semibold text-[#D7E2DC]"
                      >
                        Email Korporat / Pribadi *
                      </label>
                      <input
                        id="rfq-email"
                        type="email"
                        value={values.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="procurement@perusahaan.co.id"
                        aria-invalid={Boolean(errors.email)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2 text-sm text-white placeholder:text-[#66776F] focus:border-[#8CC63F] focus:outline-none"
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1 text-xs font-medium text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-phone"
                        className="block text-xs font-semibold text-[#D7E2DC]"
                      >
                        Nomor Telepon / WhatsApp *
                      </label>
                      <input
                        id="rfq-phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder="+62 812-xxxx-xxxx"
                        aria-invalid={Boolean(errors.phone)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2 text-sm text-white placeholder:text-[#66776F] focus:border-[#8CC63F] focus:outline-none"
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1 text-xs font-medium text-red-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rfq-region"
                        className="block text-xs font-semibold text-[#D7E2DC]"
                      >
                        Wilayah Pengiriman
                      </label>
                      <select
                        id="rfq-region"
                        value={values.region}
                        onChange={(e) =>
                          handleFieldChange(
                            'region',
                            e.target.value as Exclude<OperationalRegion, 'Semua Wilayah'>
                          )
                        }
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2 text-sm text-white focus:border-[#8CC63F] focus:outline-none"
                      >
                        {REGION_OPTIONS.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="rfq-volume"
                        className="block text-xs font-semibold text-[#D7E2DC]"
                      >
                        Estimasi Kebutuhan (Liter / Pengiriman) *
                      </label>
                      <input
                        id="rfq-volume"
                        type="number"
                        min={5000}
                        step={1000}
                        value={values.monthlyVolumeLiters}
                        onChange={(e) =>
                          handleFieldChange('monthlyVolumeLiters', e.target.value)
                        }
                        aria-invalid={Boolean(errors.monthlyVolumeLiters)}
                        className="mt-1.5 min-h-11 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2 font-mono text-sm text-white tabular-nums focus:border-[#8CC63F] focus:outline-none"
                      />
                      {errors.monthlyVolumeLiters && (
                        <p role="alert" className="mt-1 text-xs font-medium text-red-400">
                          {errors.monthlyVolumeLiters}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rfq-notes"
                      className="block text-xs font-semibold text-[#D7E2DC]"
                    >
                      Catatan Lokasi Jetty / Site &amp; Jadwal Pengiriman
                    </label>
                    <textarea
                      id="rfq-notes"
                      rows={3}
                      value={values.notes}
                      onChange={(e) => handleFieldChange('notes', e.target.value)}
                      placeholder="Contoh: Pengiriman ke jetty site Morowali setiap awal bulan."
                      className="mt-1.5 w-full rounded-lg border border-[#2A3B32] bg-[#0D1310] px-3.5 py-2.5 text-sm text-white placeholder:text-[#66776F] focus:border-[#8CC63F] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#8CC63F] px-6 py-3 text-sm font-bold text-[#0B1206] transition-colors hover:bg-[#9DD64F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] sm:w-auto"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Kirim Permintaan Penawaran
                    </button>
                    <p className="text-xs text-[#9FB0A8]">
                      Diteruskan via WhatsApp{' '}
                      <span className="font-mono font-semibold text-[#D7E2DC] tabular-nums">
                        {WHATSAPP_QUOTE_DISPLAY}
                      </span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
