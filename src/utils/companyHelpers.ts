import type {
  ClientSite,
  LegalityCategory,
  LegalityDocument,
  OperationalRegion,
  QuoteFormErrors,
  QuoteFormValues,
  TankerAllocationPlan,
} from '../types/company';

export function filterClientSites(
  sites: ClientSite[],
  region: OperationalRegion | 'Semua Site'
): ClientSite[] {
  if (region === 'Semua Wilayah' || region === 'Semua Site') {
    return sites;
  }
  return sites.filter((site) => site.province === region);
}

export function searchClientSites(
  sites: ClientSite[],
  region: OperationalRegion | 'Semua Site',
  query: string
): ClientSite[] {
  const byRegion = filterClientSites(sites, region);
  const q = query.trim().toLowerCase();
  if (!q) {
    return byRegion;
  }
  return byRegion.filter(
    (site) =>
      site.siteCode.toLowerCase().includes(q) ||
      site.companyName.toLowerCase().includes(q) ||
      site.locationDetail.toLowerCase().includes(q) ||
      site.sector.toLowerCase().includes(q)
  );
}

export function filterLegalityDocs(
  docs: LegalityDocument[],
  category: LegalityCategory
): LegalityDocument[] {
  if (category === 'Semua') {
    return docs;
  }
  return docs.filter((doc) => doc.category === category);
}

export function searchLegalityDocs(
  docs: LegalityDocument[],
  category: LegalityCategory,
  query: string
): LegalityDocument[] {
  const byCategory = filterLegalityDocs(docs, category);
  const q = query.trim().toLowerCase();
  if (!q) {
    return byCategory;
  }
  return byCategory.filter(
    (doc) =>
      doc.code.toLowerCase().includes(q) ||
      doc.title.toLowerCase().includes(q) ||
      doc.registrationNumber.toLowerCase().includes(q) ||
      doc.issuer.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q)
  );
}

export function getRegionComplianceNote(
  region: Exclude<OperationalRegion, 'Semua Wilayah'>
): { badge: string; note: string } {
  switch (region) {
    case 'Sulawesi Tenggara':
      return {
        badge: 'WAPU Sultra Aktif · SKP Resmi',
        note: 'Wajib Pungut PBB-KB No. 900.1.13.1/695/04.2026/BP melayani site pertambangan di Sulawesi Tenggara.',
      };
    case 'Sulawesi Tengah':
      return {
        badge: 'Koridor Industri Nikel · SKP Resmi',
        note: 'Jangkauan suplai BBM Solar Industri (HSD) berizin resmi untuk site pertambangan di Sulawesi Tengah.',
      };
    case 'Sulawesi Selatan':
      return {
        badge: 'Hub Logistik Utama · SKP Resmi',
        note: 'Titik hub distribusi Makassar & Sulawesi Selatan untuk penyaluran B2B standar Ditjen MIGAS.',
      };
    case 'Maluku Utara':
      return {
        badge: 'WAPU Malut Kepgub 359/2026',
        note: 'Penetapan Wajib Pungut PBBKB Non Subsidi Industri (tarif 10%) untuk wilayah Halmahera & Pulau Gebe.',
      };
    case 'Papua Barat Daya':
      return {
        badge: 'Jangkauan Proyek Koridor Timur',
        note: 'Penyaluran BBM industri skala proyek untuk wilayah Sorong dan sekitarnya.',
      };
  }
}

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!values.companyName.trim() || values.companyName.trim().length < 3) {
    errors.companyName = 'Masukkan nama perusahaan minimal 3 karakter.';
  }

  if (!values.picName.trim() || values.picName.trim().length < 2) {
    errors.picName = 'Masukkan nama penanggung jawab (PIC).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim() || !emailPattern.test(values.email.trim())) {
    errors.email = 'Masukkan alamat email korporat atau pribadi yang valid.';
  }

  const digitsOnly = values.phone.replace(/[^\d]/g, '');
  if (digitsOnly.length < 9 || digitsOnly.length > 15) {
    errors.phone = 'Masukkan nomor telepon atau WhatsApp aktif (9–15 digit).';
  }

  const parsedVolume = Number(values.monthlyVolumeLiters);
  if (!Number.isFinite(parsedVolume) || parsedVolume < 5000) {
    errors.monthlyVolumeLiters = 'Estimasi kebutuhan minimum adalah 5.000 liter.';
  }

  return errors;
}

/**
 * Estimates an efficient dispatch mix for scheduling validation.
 */
export function estimateTankerAllocation(volumeLiters: number): TankerAllocationPlan {
  const safeVolume = Math.max(0, Math.round(volumeLiters));
  if (safeVolume === 0) {
    return {
      requestedLiters: 0,
      trucks15k: 0,
      trucks10k: 0,
      totalTrips: 0,
      allocatedCapacityLiters: 0,
    };
  }

  if (safeVolume <= 10000) {
    return {
      requestedLiters: safeVolume,
      trucks15k: 0,
      trucks10k: 1,
      totalTrips: 1,
      allocatedCapacityLiters: 10000,
    };
  }

  if (safeVolume <= 15000) {
    return {
      requestedLiters: safeVolume,
      trucks15k: 1,
      trucks10k: 0,
      totalTrips: 1,
      allocatedCapacityLiters: 15000,
    };
  }

  let best15 = 0;
  let best10 = Math.ceil(safeVolume / 10000);
  let bestCap = best10 * 10000;
  let bestTrips = best10;

  const max15 = Math.ceil(safeVolume / 15000);
  for (let c15 = 0; c15 <= max15; c15++) {
    const remaining = Math.max(0, safeVolume - c15 * 15000);
    const c10 = Math.ceil(remaining / 10000);
    const cap = c15 * 15000 + c10 * 10000;
    const trips = c15 + c10;

    if (
      trips < bestTrips ||
      (trips === bestTrips && cap < bestCap)
    ) {
      best15 = c15;
      best10 = c10;
      bestCap = cap;
      bestTrips = trips;
    }
  }

  return {
    requestedLiters: safeVolume,
    trucks15k: best15,
    trucks10k: best10,
    totalTrips: bestTrips,
    allocatedCapacityLiters: bestCap,
  };
}

export function formatLiters(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value) + ' L';
}

export const WHATSAPP_QUOTE_NUMBER = '6285846951691';
export const WHATSAPP_QUOTE_DISPLAY = '+62 858-4695-1691';

export function buildWhatsAppQuoteMessage(values: QuoteFormValues): string {
  const volumeNumber = Number(values.monthlyVolumeLiters);
  const formattedVolume =
    Number.isFinite(volumeNumber) && volumeNumber > 0
      ? formatLiters(Math.round(volumeNumber))
      : `${values.monthlyVolumeLiters} L`;
  const notesText = values.notes.trim() || '-';

  return [
    'Halo Tim PT. GTR Energi Nusantara,',
    'Saya ingin mengajukan Permintaan Penawaran (RFQ) BBM Solar Industri (HSD) dengan rincian berikut:',
    '',
    `Perusahaan: ${values.companyName.trim()}`,
    `Nama PIC: ${values.picName.trim()}`,
    `Email: ${values.email.trim()}`,
    `No. Telepon / WA: ${values.phone.trim()}`,
    `Wilayah Pengiriman: ${values.region}`,
    `Estimasi Kebutuhan: ${formattedVolume}`,
    `Catatan Jetty / Site: ${notesText}`,
  ].join('\n');
}

export function buildWhatsAppQuoteUrl(
  values: QuoteFormValues,
  phoneDigits: string = WHATSAPP_QUOTE_NUMBER
): string {
  const sanitizedPhone = phoneDigits.replace(/[^\d]/g, '') || WHATSAPP_QUOTE_NUMBER;
  const message = buildWhatsAppQuoteMessage(values);
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

