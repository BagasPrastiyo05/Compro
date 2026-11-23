import { COMPANY_INFO } from '../data/companyProfile';

export function Footer() {
  return (
    <footer className="border-t border-[#223029] bg-[#070B09] text-[#B6C5BE]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-white/95 px-2 py-1">
                <img
                  src="/assets/images/gen-logo.png"
                  alt="Logo PT. GTR Energi Nusantara"
                  referrerPolicy="no-referrer"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="font-display text-base font-bold text-white">
                {COMPANY_INFO.companyName}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9FB0A8]">
              {COMPANY_INFO.tagline}
            </p>
            <p className="mt-3 font-mono text-xs text-[#9BD447] tabular-nums">
              NIB 1103250053715 · NPWP 1000 0000 0076 6110
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-wide text-white uppercase">
              Navigasi
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#profil" className="hover:text-[#9BD447]">
                  Profil &amp; Visi Misi
                </a>
              </li>
              <li>
                <a href="#operasional" className="hover:text-[#9BD447]">
                  Peta Distribusi
                </a>
              </li>
              <li>
                <a href="#organisasi" className="hover:text-[#9BD447]">
                  Struktur Organisasi
                </a>
              </li>
              <li>
                <a href="#legalitas" className="hover:text-[#9BD447]">
                  Legalitas Perusahaan
                </a>
              </li>
              <li>
                <a href="#klien" className="hover:text-[#9BD447]">
                  Mitra &amp; Klien
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold tracking-wide text-white uppercase">
              {COMPANY_INFO.headOfficeTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9FB0A8]">
              {COMPANY_INFO.headOfficeAddress}
            </p>
            <p className="mt-3 font-mono text-xs text-[#E5ECE8] tabular-nums">
              {COMPANY_INFO.phones.join(' · ')}
            </p>
            <p className="mt-1 text-xs text-[#9FB0A8]">
              {COMPANY_INFO.emails[0]}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#1B2620] pt-6 text-xs text-[#8D9E96] sm:flex-row sm:items-center">
          <p>
            &copy; 2026 {COMPANY_INFO.companyName}. Seluruh hak cipta dilindungi.
          </p>
          <a
            href={COMPANY_INFO.pdfBrochurePath}
            download="Company_Profile_PT_GTR_Energi_Nusantara_2026.pdf"
            className="font-medium text-[#C8D4CE] hover:text-[#9BD447] hover:underline"
          >
            Unduh Dokumen Company Profile (PDF)
          </a>
        </div>
      </div>
    </footer>
  );
}
