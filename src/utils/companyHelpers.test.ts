import test from 'node:test';
import assert from 'node:assert/strict';
import { CLIENT_SITES, LEGALITY_DOCUMENTS } from '../data/companyProfile';
import {
  WHATSAPP_QUOTE_NUMBER,
  buildWhatsAppQuoteMessage,
  buildWhatsAppQuoteUrl,
  estimateTankerAllocation,
  filterClientSites,
  filterLegalityDocs,
  getRegionComplianceNote,
  searchClientSites,
  searchLegalityDocs,
  validateQuoteForm,
} from './companyHelpers';

test('filterClientSites returns all 8 sites when region is Semua Site', () => {
  const result = filterClientSites(CLIENT_SITES, 'Semua Site');
  assert.equal(result.length, 8);
});

test('filterClientSites filters Maluku Utara sites accurately', () => {
  const result = filterClientSites(CLIENT_SITES, 'Maluku Utara');
  assert.equal(result.length, 2);
  assert.deepEqual(
    result.map((s) => s.siteCode),
    ['SITE MJL MABAPURA', 'SITE KAWI']
  );
});

test('searchClientSites filters by province and search keyword', () => {
  const nikel = searchClientSites(CLIENT_SITES, 'Semua Site', 'Nikel');
  assert.equal(nikel.length, 3);
  const gebe = searchClientSites(CLIENT_SITES, 'Maluku Utara', 'Gebe');
  assert.equal(gebe.length, 1);
  assert.equal(gebe[0].siteCode, 'SITE KAWI');
});

test('filterLegalityDocs filters by category cleanly', () => {
  const taxDocs = filterLegalityDocs(LEGALITY_DOCUMENTS, 'Perpajakan & WAPU');
  assert.equal(taxDocs.length, 3);
  assert.equal(filterLegalityDocs(LEGALITY_DOCUMENTS, 'Semua').length, 6);
});

test('searchLegalityDocs filters by keyword across number, code, and title', () => {
  const wapuDocs = searchLegalityDocs(LEGALITY_DOCUMENTS, 'Semua', 'WAPU');
  assert.equal(wapuDocs.length, 2);
  const nibDoc = searchLegalityDocs(LEGALITY_DOCUMENTS, 'Perizinan Pusat', '1103250053715');
  assert.equal(nibDoc.length, 1);
  assert.equal(nibDoc[0].code, 'NIB');
});

test('getRegionComplianceNote returns province-specific regulatory guidance', () => {
  const malut = getRegionComplianceNote('Maluku Utara');
  assert.match(malut.badge, /359\/2026/);
  const sultra = getRegionComplianceNote('Sulawesi Tenggara');
  assert.match(sultra.note, /900\.1\.13\.1/);
});

test('validateQuoteForm catches empty and invalid fields', () => {
  const errors = validateQuoteForm({
    companyName: 'PT',
    picName: '',
    email: 'invalid-email',
    phone: '123',
    region: 'Sulawesi Tenggara',
    monthlyVolumeLiters: '1000',
    notes: '',
  });

  assert.ok(errors.companyName);
  assert.ok(errors.picName);
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.ok(errors.monthlyVolumeLiters);
});

test('validateQuoteForm passes valid corporate RFQ submission', () => {
  const errors = validateQuoteForm({
    companyName: 'PT Tambang Nusantara Sejahtera',
    picName: 'Budi Santoso',
    email: 'procurement@tambang.co.id',
    phone: '+62 812-3456-7890',
    region: 'Sulawesi Tenggara',
    monthlyVolumeLiters: '25000',
    notes: 'Pengiriman mingguan ke jetty Kendari.',
  });

  assert.deepEqual(errors, {});
});

test('estimateTankerAllocation computes exact fleet combination for 25,000 L', () => {
  const plan = estimateTankerAllocation(25000);
  assert.equal(plan.trucks15k, 1);
  assert.equal(plan.trucks10k, 1);
  assert.equal(plan.totalTrips, 2);
  assert.equal(plan.allocatedCapacityLiters, 25000);
});

test('estimateTankerAllocation assigns single 10k tanker for 8,000 L', () => {
  const plan = estimateTankerAllocation(8000);
  assert.equal(plan.trucks15k, 0);
  assert.equal(plan.trucks10k, 1);
  assert.equal(plan.allocatedCapacityLiters, 10000);
});

test('buildWhatsAppQuoteMessage and buildWhatsAppQuoteUrl format wa.me link for 6285846951691', () => {
  const payload = {
    companyName: 'PT Mineral Sulawesi Jaya',
    picName: 'Andi Pratama',
    email: 'andi@mineralsulawesi.co.id',
    phone: '+62 811-4455-6677',
    region: 'Sulawesi Tengah' as const,
    monthlyVolumeLiters: '30000',
    notes: 'Pengiriman jetty Morowali minggu depan.',
  };

  const message = buildWhatsAppQuoteMessage(payload);
  assert.match(message, /PT Mineral Sulawesi Jaya/);
  assert.match(message, /Andi Pratama/);
  assert.match(message, /Sulawesi Tengah/);
  assert.match(message, /30\.000 L/);
  assert.match(message, /Pengiriman jetty Morowali minggu depan\./);

  const url = buildWhatsAppQuoteUrl(payload);
  assert.equal(WHATSAPP_QUOTE_NUMBER, '6285846951691');
  assert.ok(url.startsWith('https://wa.me/6285846951691?text='));

  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.equal(decoded, message);
});

