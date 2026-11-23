import { useMemo, useState } from 'react';
import { UserCheck } from 'lucide-react';
import { ORGANIZATION_TREE } from '../data/companyProfile';
import type { OrgNode } from '../types/company';

export function OrganizationSection() {
  const komisaris = ORGANIZATION_TREE;
  const direktur = komisaris.children?.[0];
  const divisions = direktur?.children ?? [];

  const allNodes = useMemo(() => {
    const nodes: OrgNode[] = [komisaris];
    if (direktur) {
      nodes.push(direktur);
      for (const div of divisions) {
        nodes.push(div);
        if (div.children) {
          nodes.push(...div.children);
        }
      }
    }
    return nodes;
  }, [komisaris, direktur, divisions]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    direktur?.id ?? komisaris.id
  );

  const selectedNode =
    allNodes.find((n) => n.id === selectedNodeId) ?? komisaris;

  return (
    <section
      id="organisasi"
      className="border-b border-[#223029] bg-[#101714] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#9BD447]">
            Struktur Organisasi
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Tata Kelola &amp; Tim Manajemen Profesional
          </h2>
          <p className="mt-3 text-base text-[#BCCAC3]">
            Klik setiap jabatan pada bagan di bawah untuk melihat ruang lingkup tanggung jawab dan koordinasi operasional.
          </p>
        </div>

        {/* Tier 1 & Tier 2: Komisaris (GEN Crimson) -> Direktur (GEN Green) */}
        <div className="mt-10 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setSelectedNodeId(komisaris.id)}
            aria-pressed={selectedNodeId === komisaris.id}
            className={`w-full max-w-xs rounded-xl border px-6 py-4 text-center text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
              selectedNodeId === komisaris.id
                ? 'border-[#F59E0B] bg-[#991B1B] ring-2 ring-[#F59E0B]/40'
                : 'border-[#DC2626]/70 bg-[#991B1B] hover:border-[#F59E0B]/80'
            }`}
          >
            <p className="text-xs font-semibold tracking-wide text-red-200 uppercase">
              {komisaris.role}
            </p>
            <p className="mt-1 font-display text-lg font-bold">
              {komisaris.name}
            </p>
          </button>

          <div aria-hidden="true" className="h-7 w-px bg-[#2E4137]" />

          {direktur && (
            <button
              type="button"
              onClick={() => setSelectedNodeId(direktur.id)}
              aria-pressed={selectedNodeId === direktur.id}
              className={`w-full max-w-xs rounded-xl border px-6 py-4 text-center text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
                selectedNodeId === direktur.id
                  ? 'border-[#F59E0B] bg-[#4D7C0F] ring-2 ring-[#8CC63F]/50'
                  : 'border-[#8CC63F]/60 bg-[#4D7C0F] hover:border-[#9BD447]'
              }`}
            >
              <p className="text-xs font-semibold tracking-wide text-lime-200 uppercase">
                {direktur.role}
              </p>
              <p className="mt-1 font-display text-lg font-bold">
                {direktur.name}
              </p>
            </button>
          )}

          {/* Connector bar on desktop */}
          <div aria-hidden="true" className="hidden h-7 w-px bg-[#2E4137] md:block" />
          <div
            aria-hidden="true"
            className="hidden h-px w-full max-w-4xl bg-[#2E4137] md:block"
          />
        </div>

        {/* Tier 3 & Tier 4: Divisions & Supporting Staff */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-0 md:grid-cols-3">
          {divisions.map((division) => {
            const isDivSelected = selectedNodeId === division.id;
            return (
              <div key={division.id} className="flex flex-col items-center">
                <div aria-hidden="true" className="hidden h-6 w-px bg-[#2E4137] md:block" />

                <div className="w-full rounded-xl border border-[#24332B] bg-[#151E19] p-5 text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(division.id)}
                    aria-pressed={isDivSelected}
                    className={`w-full rounded-lg border px-4 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
                      isDivSelected
                        ? 'border-[#8CC63F] bg-[#1C2822]'
                        : 'border-transparent hover:border-[#2E3F36] hover:bg-[#19231E]'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#F59E0B]">
                      {division.role}
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-white">
                      {division.name}
                    </p>
                    {division.department && (
                      <p className="mt-1 text-xs text-[#9FB0A8]">
                        {division.department}
                      </p>
                    )}
                  </button>

                  {division.children && division.children.length > 0 && (
                    <div className="mt-4 border-t border-[#24332B] pt-4">
                      {division.children.map((staff) => {
                        const isStaffSelected = selectedNodeId === staff.id;
                        return (
                          <button
                            key={staff.id}
                            type="button"
                            onClick={() => setSelectedNodeId(staff.id)}
                            aria-pressed={isStaffSelected}
                            className={`w-full rounded-lg border px-4 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
                              isStaffSelected
                                ? 'border-[#8CC63F] bg-[#213028]'
                                : 'border-[#283830] bg-[#1A251F] hover:border-[#8CC63F]/60'
                            }`}
                          >
                            <p className="text-xs font-medium text-[#9BD447]">
                              {staff.role}
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-white">
                              {staff.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Role Responsibility Panel */}
        <div
          data-testid="org-role-detail"
          className="mt-8 rounded-xl border border-[#283830] bg-[#141C18] p-5 sm:p-6"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9BD447]" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#F59E0B] uppercase">
                  {selectedNode.role}
                  {selectedNode.department ? ` · ${selectedNode.department}` : ''}
                </p>
                <h3 className="mt-0.5 font-display text-lg font-bold text-white">
                  {selectedNode.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#BCCAC3]">
                  {selectedNode.responsibility}
                </p>
              </div>
            </div>

            {(selectedNode.id === 'scm' || selectedNode.id === 'purchasing') && (
              <a
                href="#kontak"
                className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#8CC63F] px-4 py-2 text-xs font-bold text-[#0B1206] transition-colors hover:bg-[#9DD64F]"
              >
                Koordinasi Penawaran
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
