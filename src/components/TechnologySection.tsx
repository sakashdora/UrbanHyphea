import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, ChevronRight, Dna, Microscope, Sparkles } from 'lucide-react';
import { SITE_IMAGES } from '../data/assets';
import { TECHNOLOGY_STAGES } from '../data/biomaterials';
import { MediaImage, SectionEyebrow } from './BrandMark';

interface TechnologySectionProps {
  onInspectProducts?: () => void;
}

export function TechnologySection({ onInspectProducts }: TechnologySectionProps) {
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<string>('01');
  const selectedStage =
    TECHNOLOGY_STAGES.find((stage) => stage.step === activeStep) ?? TECHNOLOGY_STAGES[0];

  return (
    <section
      id="technology"
      className="py-20 lg:py-28 bg-[#fafaf7] border-b border-[#e5e7eb] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <SectionEyebrow label="Proprietary Biotechnology & Science" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] font-normal mb-4">
            Powered by Fungi. Engineered via <span className="italic text-[#0b5e1e]">PSAWL Media.</span>
          </h2>
          <p className="text-base sm:text-lg leading-[1.65] text-[#6b7280]">
            Transforming agricultural lignocellulosic waste into high-tensile chitin-glucan matrices inside sterile solid-state growth chambers in Bhubaneswar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Microscopic Mycelium Network Photography */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative min-h-[360px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-[#e5e7eb] bg-white shadow-xs flex flex-col justify-between"
          >
            <MediaImage
              src={SITE_IMAGES.techMycelium}
              alt="Macro photograph of living white fungal mycelium hyphae branching across organic substrate"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"
            />

            {/* Top pill */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#e5e7eb] text-[11px] font-mono uppercase tracking-wider text-[#0b5e1e] shadow-xs">
                <Microscope className="w-3.5 h-3.5" />
                <span>Hyphal Microstructure</span>
              </span>
              <span className="text-[11px] font-mono text-[#1a1a1a] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#e5e7eb]">
                1000x Cellular Scale
              </span>
            </div>

            {/* Bottom info */}
            <div className="relative z-10 p-6 border-t border-[#e5e7eb] bg-white/95 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <Dna className="w-4 h-4 text-[#0b5e1e]" />
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#0b5e1e]">
                  Chitin-Glucan Polymer Synthesis
                </p>
              </div>
              <p className="text-xs text-[#6b7280] leading-relaxed">
                Branching micro-filaments self-assemble into a 3D interwoven biological architecture, replicating the multi-directional tear strength and elasticity of animal leather without synthetic crosslinkers.
              </p>
            </div>
          </motion.div>

          {/* Right: 4-Stage Interactive Process */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Step Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TECHNOLOGY_STAGES.map((stage) => {
                const isSelected = stage.step === activeStep;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStep(stage.step)}
                    className={`p-4 rounded-xl border text-left transition-colors duration-200 ${
                      isSelected
                        ? 'bg-[#0b5e1e] border-[#0b5e1e] text-white shadow-sm'
                        : 'bg-white border-[#e5e7eb] hover:border-[#0b5e1e]/40 hover:bg-[#f8faf7]'
                    }`}
                  >
                    <span className={`block font-mono text-xs font-semibold mb-1 ${isSelected ? 'text-[#a7c957]' : 'text-[#6b7280]'}`}>
                      Stage {stage.step}
                    </span>
                    <span className={`block text-xs font-medium leading-snug truncate ${isSelected ? 'text-white font-semibold' : 'text-[#1a1a1a]'}`}>
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Card */}
            <motion.div
              key={selectedStage.step}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e5e7eb] flex-1 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#0b5e1e]">
                    Stage {selectedStage.step} · {selectedStage.subtitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#5a7f3f] font-mono bg-[#f8faf7] px-3 py-1 rounded-full border border-[#e5e7eb]">
                    <Sparkles className="w-3 h-3 text-[#0b5e1e]" />
                    <span>Bio-Fabrication Protocol</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] font-normal mb-3">
                  {selectedStage.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6b7280] mb-8 font-normal">
                  {selectedStage.detail}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#e5e7eb] mb-6">
                  {selectedStage.metrics.map((m) => (
                    <div key={m.label} className="p-3.5 rounded-xl bg-[#f8faf7] border border-[#e5e7eb]">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6b7280] mb-1">
                        {m.label}
                      </span>
                      <span className="block text-sm font-semibold text-[#1a1a1a] font-mono">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#e5e7eb]">
                <span className="text-xs text-[#6b7280] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0b5e1e]" />
                  <span>100% Zero hazardous chromium, petrochemicals, or toxic runoff</span>
                </span>
                {onInspectProducts && (
                  <button
                    type="button"
                    onClick={onInspectProducts}
                    className="btn-link"
                  >
                    <span>See the products</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
