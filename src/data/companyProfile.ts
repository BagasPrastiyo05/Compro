import type {
  ClientSite,
  CompanyContact,
  FleetUnit,
  LegalityDocument,
  MissionItem,
  OperationalHub,
  OrgNode,
  PartnerLogo,
  SupplyProcessStep,
} from '../types/company';

export const COMPANY_INFO: CompanyContact = {
  companyName: 'PT. GTR Energi Nusantara',
  shortBrand: 'GEN',
  tagline:
    'Badan usaha hilir minyak dan gas bumi (migas) resmi yang memegang peranan penting dalam rantai pasok energi sektor industri.',
  headOfficeTitle: 'Head Office',
  headOfficeAddress:
    'Ruko Golden Madrid X Blok B-12, Jl. Letnan Sutopo 2, Rawa Mekarjaya, Serpong, Kota Tangerang Selatan, Banten 15310',
  phones: ['+62 812-2385-3229', '+62 858-4695-1691'],
  emails: ['ptgtrenerginusantara@gmail.com', 'supplychaingtr@gmail.com'],
  pdfBrochurePath: '/assets/aistudio/Compro_GEN_2026_9d43e332.pdf',
};

export const KEY_METRICS = [
  {
    value: 'HSD Industri',
    label: 'BBM Solar Standar MIGAS',
    detail: 'Mutu teruji & penyaluran resmi B2B',
  },
  {
    value: '8 Site',
    label: 'Site Pertambangan Aktif',
    detail: 'Sulawesi & Maluku Utara',
  },
  {
    value: '4 Provinsi',
    label: 'Jangkauan Koridor Timur',
    detail: 'Sultra, Sulteng, Sulsel, Malut & Sorong',
  },
  {
    value: '6 Dokumen',
    label: 'Legalitas Resmi Terverifikasi',
    detail: 'NIB, NPWP/SPPKP, SK AHU, WAPU & SKP',
  },
];

export const VISION_TEXT =
  'Menjadi mitra penyedia dan distributor BBM Solar Industri yang terpercaya, dinamis, dan berkembang pesat, dengan komitmen penuh pada kehandalan layanan untuk mendukung kelancaran bisnis pelanggan.';

export const MISSION_ITEMS: MissionItem[] = [
  {
    number: '01',
    title: 'Kualitas BBM Terjamin Standar MIGAS',
    description:
      'Menyediakan produk BBM Solar Industri (HSD) dengan kualitas yang terjamin sesuai spesifikasi dan standar Ditjen MIGAS.',
  },
  {
    number: '02',
    title: 'Logistik Responsif & Tepat Waktu',
    description:
      'Memberikan pelayanan logistik yang responsif, fleksibel, dan tepat waktu untuk memastikan operasional klien berjalan tanpa hambatan.',
  },
  {
    number: '03',
    title: 'Ekspansi Jaringan & Kemitraan Transparan',
    description:
      'Memperluas jangkauan area layanan serta membangun hubungan kerja sama yang erat, transparan, dan saling menguntungkan dengan berbagai sektor industri, terutama pertambangan.',
  },
  {
    number: '04',
    title: 'Organisasi Profesional & Berkelanjutan',
    description:
      'Membangun tim yang kompeten, profesional, dan adaptif untuk memperkuat fondasi perusahaan agar terus bertumbuh secara sehat dan berkelanjutan.',
  },
];

export const SUPPLY_PROCESS_STEPS: SupplyProcessStep[] = [
  {
    id: 'step-sourcing',
    stepNumber: '01',
    title: 'Pengadaan Sumber BBM Resmi',
    shortLabel: 'Sumber Resmi',
    summary:
      'Suplai BBM Solar Industri (HSD) bersumber dari badan usaha pemegang izin niaga umum resmi sesuai penunjukan Agen Penyalur (SKP).',
    verificationPoint: 'Kesesuaian kuota, izin niaga asal, dan dokumen loading order resmi.',
    documentRef: 'SKP No. 001/SKP/BEB/I/2026',
  },
  {
    id: 'step-sampling',
    stepNumber: '02',
    title: 'Kontrol Mutu & Uji Sampling',
    shortLabel: 'Uji Sampling',
    summary:
      'Setiap pengiriman menjalani pemeriksaan densitas, kejernihan, dan kesesuaian spesifikasi teknis Direktorat Jenderal Minyak dan Gas Bumi.',
    verificationPoint: 'Pemeriksaan segel sampel produk dan catatan mutu berkala untuk pelaporan Ditjen Migas.',
    documentRef: 'Standar Mutu Ditjen MIGAS',
  },
  {
    id: 'step-fleet',
    stepNumber: '03',
    title: 'Penyaluran Terjadwal & Segel Resmi',
    shortLabel: 'Logistik Suplai',
    summary:
      'Pengiriman BBM Solar Industri terjadwal dengan jalur terpantau untuk menjangkau wilayah pertambangan di Sulawesi dan Maluku Utara.',
    verificationPoint: 'Segel pengiriman terverifikasi dan surat jalan penyalur resmi pada setiap pengantaran.',
    documentRef: 'Surat Jalan & Segel Resmi Penyalur',
  },
  {
    id: 'step-handover',
    stepNumber: '04',
    title: 'Serah Terima & Kepatuhan Pajak Daerah',
    shortLabel: 'Serah Terima & WAPU',
    summary:
      'Serah terima volume di lokasi tambang atau jetty disertai pemungutan dan pelaporan PBB-KB Non Subsidi serta faktur pajak PKP yang transparan.',
    verificationPoint: 'Berita acara serah terima volume, uji sampel ulang bersama PIC klien, dan bukti WAPU.',
    documentRef: 'WAPU Sultra & Malut · PKP Serpong',
  },
];

export const ORGANIZATION_TREE: OrgNode = {
  id: 'komisaris',
  role: 'Komisaris',
  name: 'Heryanto',
  responsibility:
    'Pengawasan strategis, tata kelola perusahaan, serta kepatuhan kebijakan jangka panjang PT. GTR Energi Nusantara.',
  children: [
    {
      id: 'direktur',
      role: 'Direktur',
      name: 'Riyanto Kamri S.',
      responsibility:
        'Pengambilan keputusan operasional, pengembangan kemitraan strategis pertambangan, dan penanggung jawab penuh perizinan usaha.',
      children: [
        {
          id: 'hrga',
          role: 'HRGA',
          name: 'Adani Hanifati',
          department: 'Human Resources & General Affairs',
          responsibility:
            'Pengelolaan sumber daya manusia, kesiapan keselamatan kerja operasional, serta administrasi umum Head Office Tangerang Selatan.',
        },
        {
          id: 'scm',
          role: 'Supply Chain Management',
          name: 'Bagas Prastiyo',
          department: 'Distribusi, Logistik & Pengadaan',
          responsibility:
            'Koordinasi penjadwalan penyaluran, pengadaan stok HSD, serta pemantauan pengiriman hingga ke site tambang dan jetty.',
          children: [
            {
              id: 'purchasing',
              role: 'Purchasing Staff',
              name: 'Hernia Amalia',
              responsibility:
                'Pengadaan kebutuhan suplai energi, koordinasi loading order dengan mitra penyalur resmi, dan pengendalian dokumen pembelian.',
            },
          ],
        },
        {
          id: 'fat',
          role: 'Finance, Accounting & Tax',
          name: 'Anna Dawayani',
          department: 'Keuangan, Akuntansi & Perpajakan',
          responsibility:
            'Manajemen arus kas pengadaan B2B, penagihan kontrak, serta kepatuhan pelaporan perpajakan pusat dan PBB-KB daerah.',
          children: [
            {
              id: 'tax-staff',
              role: 'Tax & Accounting Staff',
              name: 'Husnah Adlyna W.',
              responsibility:
                'Administrasi faktur pajak PKP, pemungutan & pelaporan WAPU Sulawesi Tenggara dan Maluku Utara, serta pembukuan transaksi.',
            },
          ],
        },
      ],
    },
  ],
};

export const FLEET_UNITS: FleetUnit[] = [
  {
    id: 'fleet-1',
    vehicleType: 'Truk Tangki BBM Industri',
    plateNumber: 'Unit 01',
    coverageArea: 'Sulawesi Selatan, Sulawesi Tenggara, Sulawesi Tengah',
    ownership: 'Milik Sendiri',
    capacityLiters: 15000,
  },
  {
    id: 'fleet-2',
    vehicleType: 'Truk Tangki BBM Industri',
    plateNumber: 'Unit 02',
    coverageArea: 'Sulawesi Selatan, Sulawesi Tenggara, Sulawesi Tengah',
    ownership: 'Milik Sendiri',
    capacityLiters: 10000,
  },
  {
    id: 'fleet-3',
    vehicleType: 'Truk Tangki BBM Industri',
    plateNumber: 'Unit 03',
    coverageArea: 'Sulawesi Selatan, Sulawesi Tenggara, Sulawesi Tengah',
    ownership: 'Milik Sendiri',
    capacityLiters: 10000,
  },
];

export const OPERATIONAL_HUBS: OperationalHub[] = [
  {
    id: 'hub-makassar',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    role: 'Hub Logistik & Pengiriman Sulawesi Selatan',
    geoCoords: [119.43, -5.14],
    coordLabel: '5.14° LS · 119.43° BT',
    highlights: [
      'Cakupan wilayah penyaluran SKP PT Bhumi Energi Barakah',
      'Jalur suplai pendukung menuju Sulawesi Tengah & Tenggara',
    ],
  },
  {
    id: 'hub-kendari',
    city: 'Kendari',
    province: 'Sulawesi Tenggara',
    role: 'Kantor Cabang Operasional & Titik Distribusi Tambang',
    geoCoords: [122.51, -3.99],
    coordLabel: '3.99° LS · 122.51° BT',
    highlights: [
      'Wajib Pungut (WAPU) PBB-KB Non Subsidi Prov. Sulawesi Tenggara',
      'Melayani 4 site pertambangan aktif (IBM, MLP, BKU, Bososi)',
    ],
  },
  {
    id: 'hub-sulteng',
    city: 'Morowali / Sulawesi Tengah',
    province: 'Sulawesi Tengah',
    role: 'Wilayah Suplai Nikel & Industri Sulawesi Tengah',
    geoCoords: [121.95, -2.68],
    coordLabel: '2.68° LS · 121.95° BT',
    highlights: [
      'Melayani Site PUL (PT. Prima Utama Lestari) & Site PAM (PT. PAM Mineral Tbk)',
      'Dukungan penyaluran BBM Solar Industri berizin resmi',
    ],
  },
  {
    id: 'hub-malut',
    city: 'Halmahera & Pulau Gebe',
    province: 'Maluku Utara',
    role: 'Wilayah Penyaluran BBM Industri Maluku Utara',
    geoCoords: [128.45, 0.35],
    coordLabel: '0.35° LU · 128.45° BT',
    highlights: [
      'Penetapan WAPU Gubernur Maluku Utara No. 359/KPTS/MU/2026',
      'Melayani Site MJL Mabapura & Site Kawi Pulau Gebe',
    ],
  },
  {
    id: 'hub-sorong',
    city: 'Sorong',
    province: 'Papua Barat Daya',
    role: 'Titik Jangkauan Koridor Timur Papua',
    geoCoords: [131.26, -0.87],
    coordLabel: '0.87° LS · 131.26° BT',
    highlights: [
      'Titik strategis perluasan rantai pasok energi Indonesia Timur',
      'Dukungan pengadaan dan pengiriman BBM industri skala proyek',
    ],
  },
];

export const LEGALITY_DOCUMENTS: LegalityDocument[] = [
  {
    id: 'doc-nib',
    code: 'NIB',
    title: 'Nomor Induk Berusaha (OSS RBA)',
    category: 'Perizinan Pusat',
    registrationNumber: '1103250053715',
    issuer: 'Menteri Investasi dan Hilirisasi / Kepala BKPM RI',
    effectivePeriod: 'Diterbitkan 11 Maret 2025',
    summary:
      'Perizinan Berusaha Berbasis Risiko untuk KBLI 47301 & 47302 (Perdagangan Eceran Bahan Bakar Minyak, BBG, dan LPG pada sarana pengisian darat, laut, dan udara).',
    imagePath: '/assets/docs/doc-nib.png',
  },
  {
    id: 'doc-npwp',
    code: 'NPWP & SPPKP',
    title: 'NPWP & Pengukuhan Pengusaha Kena Pajak',
    category: 'Perpajakan & WAPU',
    registrationNumber: '1000 0000 0076 6110 · S-00380/SPPKP-CT/KPP.0803/2025',
    issuer: 'Direktorat Jenderal Pajak — KPP Pratama Serpong',
    effectivePeriod: 'NPWP 11 Maret 2025 · PKP 16 Juni 2025',
    summary:
      'Terdaftar resmi sebagai Wajib Pajak Badan dan dikukuhkan sebagai Pengusaha Kena Pajak (PKP) dengan kewajiban perpajakan penuh untuk transaksi B2B.',
    imagePath: '/assets/docs/doc-npwp.png',
  },
  {
    id: 'doc-ahu',
    code: 'SK AHU',
    title: 'Keputusan Menteri Hukum RI (Pengesahan Perseroan)',
    category: 'Perizinan Pusat',
    registrationNumber: 'AHU-0002554.AH.01.02.TAHUN 2026',
    issuer: 'Direktorat Jenderal Administrasi Hukum Umum, Kemenkum RI',
    effectivePeriod: 'Ditetapkan 20 Januari 2026',
    summary:
      'Persetujuan Perubahan Anggaran Dasar Perseroan Terbatas PT GTR Energi Nusantara berdasarkan Akta Notaris Astri Primadiasti Andini, S.H., M.Kn. No. 01.',
    imagePath: '/assets/docs/doc-sk-menkumham.png',
  },
  {
    id: 'doc-wapu-sultra',
    code: 'WAPU SULTRA',
    title: 'Persetujuan Wajib Pungut PBB-KB Sulawesi Tenggara',
    category: 'Perpajakan & WAPU',
    registrationNumber: '900.1.13.1/695/04.2026/BP',
    issuer: 'Badan Pendapatan Daerah Provinsi Sulawesi Tenggara',
    effectivePeriod: '23 April 2026 – 23 April 2027',
    summary:
      'Persetujuan resmi sebagai Wajib Pungut Pajak Bahan Bakar Kendaraan Bermotor (PBB-KB) Non Subsidi di wilayah Provinsi Sulawesi Tenggara.',
    imagePath: '/assets/docs/doc-wapu-sultra.png',
  },
  {
    id: 'doc-wapu-malut',
    code: 'WAPU MALUT',
    title: 'Penetapan Wajib Pungut PBBKB Maluku Utara',
    category: 'Perpajakan & WAPU',
    registrationNumber: 'Kepgub No. 359/KPTS/MU/2026',
    issuer: 'Gubernur Provinsi Maluku Utara',
    effectivePeriod: 'Ditetapkan 6 April 2026',
    summary:
      'Keputusan Gubernur Maluku Utara tentang penetapan PT GTR Energi Nusantara sebagai Wajib Pungut PBBKB Non Subsidi Industri (tarif 10%) di Maluku Utara.',
    imagePath: '/assets/docs/doc-wapu-malut.png',
  },
  {
    id: 'doc-skp',
    code: 'SKP',
    title: 'Surat Keterangan Penyalur Resmi (Agen BBM)',
    category: 'Penyaluran Resmi',
    registrationNumber: '001/SKP/BEB/I/2026',
    issuer: 'PT Bhumi Energi Barakah (BU-PIUNU 29122100203870004)',
    effectivePeriod: 'Dikeluarkan 20 Februari 2026',
    summary:
      'Penunjukan resmi sebagai Agen BBM Solar Industri (HSD) sesuai spesifikasi teknis dan standar mutu Direktorat Jenderal Minyak dan Gas Bumi.',
    imagePath: '/assets/docs/doc-skp.png',
  },
];

export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: 'partner-npm',
    shortCode: 'NPM',
    name: 'PT. Natural Persada Mandiri',
    sector: 'Pertambangan & Kontraktor Energi',
    cooperationScope: 'Dukungan pasokan BBM Solar Industri (HSD) terintegrasi untuk operasional alat berat.',
    logoPath: '/assets/images/client-npm.png',
  },
  {
    id: 'partner-irm',
    shortCode: 'IRM',
    name: 'IRM — Inti Resources Mandiri',
    sector: 'Pengelolaan Sumber Daya & Tambang',
    cooperationScope: 'Kemitraan penyaluran energi berkelanjutan di koridor pertambangan Indonesia Timur.',
    logoPath: '/assets/images/client-irm.png',
  },
];

export const CLIENT_SITES: ClientSite[] = [
  {
    id: 'site-ibm',
    siteCode: 'SITE IBM',
    companyName: 'PT. Indrabakti Mustika',
    province: 'Sulawesi Tenggara',
    locationDetail: 'Sulawesi Tenggara',
    sector: 'Pertambangan Mineral',
  },
  {
    id: 'site-mlp',
    siteCode: 'SITE MLP',
    companyName: 'PT. Makmur Lestari Primatama',
    province: 'Sulawesi Tenggara',
    locationDetail: 'Sulawesi Tenggara',
    sector: 'Pertambangan Nikel',
  },
  {
    id: 'site-bku',
    siteCode: 'SITE BKU',
    companyName: 'PT. Bhakti Karya Utama',
    province: 'Sulawesi Tenggara',
    locationDetail: 'Sulawesi Tenggara',
    sector: 'Kontraktor Pertambangan',
  },
  {
    id: 'site-bososi',
    siteCode: 'SITE BOSOSI',
    companyName: 'Site Operasi Bososi',
    province: 'Sulawesi Tenggara',
    locationDetail: 'Sulawesi Tenggara',
    sector: 'Pertambangan',
  },
  {
    id: 'site-pul',
    siteCode: 'SITE PUL',
    companyName: 'PT. Prima Utama Lestari',
    province: 'Sulawesi Tengah',
    locationDetail: 'Sulawesi Tengah',
    sector: 'Pertambangan Mineral',
  },
  {
    id: 'site-pam',
    siteCode: 'SITE PAM',
    companyName: 'PT. PAM Mineral Tbk',
    province: 'Sulawesi Tengah',
    locationDetail: 'Sulawesi Tengah',
    sector: 'Pertambangan Nikel',
  },
  {
    id: 'site-mjl',
    siteCode: 'SITE MJL MABAPURA',
    companyName: 'PT. Makmur Jaya Lestari',
    province: 'Maluku Utara',
    locationDetail: 'Mabapura, Maluku Utara',
    sector: 'Pertambangan',
  },
  {
    id: 'site-kawi',
    siteCode: 'SITE KAWI',
    companyName: 'PT. Karya Wijaya',
    province: 'Maluku Utara',
    locationDetail: 'Pulau Gebe, Maluku Utara',
    sector: 'Pertambangan Nikel',
  },
];
