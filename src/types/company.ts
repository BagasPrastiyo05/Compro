export type OperationalRegion =
  | 'Semua Wilayah'
  | 'Sulawesi Tenggara'
  | 'Sulawesi Tengah'
  | 'Sulawesi Selatan'
  | 'Maluku Utara'
  | 'Papua Barat Daya';

export type LegalityCategory =
  | 'Semua'
  | 'Perizinan Pusat'
  | 'Perpajakan & WAPU'
  | 'Penyaluran Resmi';

export interface CompanyContact {
  companyName: string;
  shortBrand: string;
  tagline: string;
  headOfficeTitle: string;
  headOfficeAddress: string;
  phones: string[];
  emails: string[];
  pdfBrochurePath: string;
}

export interface MissionItem {
  number: string;
  title: string;
  description: string;
}

export interface OrgNode {
  id: string;
  role: string;
  name: string;
  department?: string;
  responsibility?: string;
  children?: OrgNode[];
}

export interface LegalityDocument {
  id: string;
  code: string;
  title: string;
  category: Exclude<LegalityCategory, 'Semua'>;
  registrationNumber: string;
  issuer: string;
  effectivePeriod: string;
  summary: string;
  imagePath: string;
}

export interface FleetUnit {
  id: string;
  vehicleType: string;
  plateNumber: string;
  coverageArea: string;
  ownership: string;
  capacityLiters: number;
}

export interface OperationalHub {
  id: string;
  city: string;
  province: Exclude<OperationalRegion, 'Semua Wilayah'>;
  role: string;
  geoCoords: [number, number];
  coordLabel: string;
  highlights: string[];
}

export interface ClientSite {
  id: string;
  siteCode: string;
  companyName: string;
  province: 'Sulawesi Tenggara' | 'Sulawesi Tengah' | 'Maluku Utara';
  locationDetail: string;
  sector: string;
}

export interface PartnerLogo {
  id: string;
  shortCode: string;
  name: string;
  sector: string;
  cooperationScope: string;
  logoPath: string;
}

export interface SupplyProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  shortLabel: string;
  summary: string;
  verificationPoint: string;
  documentRef: string;
}

export interface PrefillQuotePayload {
  region: Exclude<OperationalRegion, 'Semua Wilayah'>;
  volumeLiters: number;
  notes?: string;
  requestId: number;
}

export interface QuoteFormValues {
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  region: Exclude<OperationalRegion, 'Semua Wilayah'>;
  monthlyVolumeLiters: string;
  notes: string;
}

export interface QuoteFormErrors {
  companyName?: string;
  picName?: string;
  email?: string;
  phone?: string;
  monthlyVolumeLiters?: string;
}

export interface TankerAllocationPlan {
  requestedLiters: number;
  trucks15k: number;
  trucks10k: number;
  totalTrips: number;
  allocatedCapacityLiters: number;
}
