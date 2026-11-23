import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import {
  MISSION_ITEMS,
  SUPPLY_PROCESS_STEPS,
  VISION_TEXT,
} from '../data/companyProfile';

export function AboutVisionSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [highlightedMission, setHighlightedMission] = useState<string>(
    MISSION_ITEMS[0].number
  );

  const activeStep = SUPPLY_PROCESS_STEPS[activeStepIndex];

  const handleStepShift = (delta: -1 | 1) => {
    setActiveStepIndex(
      (prev) =>
        (prev + delta + SUPPLY_PROCESS_STEPS.length) % SUPPLY_PROCESS_STEPS.length
    );
  };

  return (
    <section
      id="profil"
      className="border-b border-[#223029] bg-[#101714] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative + Interactive 4-Step Quality & Supply Pipeline (No Photo) */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#9BD447]">
              Profil Perusahaan
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Komitmen Keandalan Pasokan Energi Industri
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#BCCAC3]">
              PT. GTR Energi Nusantara (GEN) hadir sebagai mitra strategis sektor pertambangan, perkebunan, konstruksi, dan manufaktur dalam memenuhi kebutuhan Bahan Bakar Minyak Solar Industri (High Speed Diesel / HSD) secara tepat mutu, tepat jumlah, dan tepat waktu.
            </p>

            {/* Interactive Supply Workflow Stepper */}
            <div className="mt-6 rounded-xl border border-[#24332B] bg-[#151E19] p-5">
              <div className="flex items-center justify-between gap-2 border-b border-[#24332B] pb-3">
                <span className="text-xs font-semibold tracking-wide text-[#9BD447] uppercase">
                  Alur Penyaluran &amp; Kontrol Mutu
                </span>
                <span className="font-mono text-xs text-[#F59E0B] tabular-nums">
                  Tahap {activeStep.stepNumber} / 0{SUPPLY_PROCESS_STEPS.length}
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Tahapan penyaluran BBM Solar Industri"
                className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2"
              >
                {SUPPLY_PROCESS_STEPS.map((step, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStepIndex(index)}
                      className={`min-h-10 rounded-lg px-3 py-2 text-left text-xs font-bold transition-colors whitespace-nowrap truncate ${
                        isActive
                          ? 'bg-[#8CC63F] text-[#0B1206]'
                          : 'border border-[#2A3B32] bg-[#0E1411] text-[#C8D4CE] hover:border-[#8CC63F]/60 hover:text-white'
                      }`}
                    >
                      {step.stepNumber}. {step.shortLabel}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-lg border border-[#223029] bg-[#0D1310] p-4">
                <h3 className="font-display text-base font-bold text-white">
                  {activeStep.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#BCCAC3]">
                  {activeStep.summary}
                </p>
                <div className="mt-3 flex items-start gap-2 border-t border-[#1F2B25] pt-3 text-xs text-[#A3B4AC]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9BD447]" aria-hidden="true" />
                  <span>{activeStep.verificationPoint}</span>
                </div>
                <p className="mt-2 font-mono text-xs font-medium text-[#F59E0B] tabular-nums">
                  Referensi: {activeStep.documentRef}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleStepShift(-1)}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#2A3B32] bg-[#101714] px-3 py-1.5 text-xs font-semibold text-[#D2DDD7] hover:border-[#8CC63F]/60 hover:text-white"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Tahap Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => handleStepShift(1)}
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[#2A3B32] bg-[#101714] px-3 py-1.5 text-xs font-semibold text-[#D2DDD7] hover:border-[#8CC63F]/60 hover:text-white"
                >
                  Tahap Berikutnya
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visi & Interactive Misi Selector */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#24332B] bg-[#151E19] p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wide text-[#9BD447] uppercase">
                Visi Perusahaan
              </p>
              <blockquote className="mt-3 font-display text-lg leading-relaxed font-semibold text-white sm:text-xl">
                &ldquo;{VISION_TEXT}&rdquo;
              </blockquote>

              <div className="mt-8 border-t border-[#24332B] pt-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-[#F59E0B] uppercase">
                    Misi Perusahaan
                  </p>
                  <span className="text-xs text-[#9FB0A8]">
                    Klik poin misi untuk menyoroti komitmen operasional
                  </span>
                </div>

                <ol className="mt-5 space-y-3">
                  {MISSION_ITEMS.map((item, idx) => {
                    const isFocused = highlightedMission === item.number;
                    return (
                      <li key={item.number}>
                        <button
                          type="button"
                          onClick={() => {
                            setHighlightedMission(item.number);
                            setActiveStepIndex(idx % SUPPLY_PROCESS_STEPS.length);
                          }}
                          aria-pressed={isFocused}
                          className={`grid w-full grid-cols-1 gap-2 rounded-lg border p-4 text-left transition-colors sm:grid-cols-12 sm:gap-4 ${
                            isFocused
                              ? 'border-[#8CC63F]/70 bg-[#1A251F]'
                              : 'border-[#24332B] bg-[#101714]/60 hover:border-[#394E43]'
                          }`}
                        >
                          <div className="sm:col-span-4">
                            <span className="font-mono text-xs font-semibold text-[#9BD447] tabular-nums">
                              {item.number}.
                            </span>
                            <h3 className="mt-0.5 font-display text-sm font-semibold text-white sm:text-base">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm leading-relaxed text-[#B6C5BE] sm:col-span-8">
                            {item.description}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
