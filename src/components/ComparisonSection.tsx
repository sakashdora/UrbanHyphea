import { motion, useReducedMotion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { MATERIAL_COMPARISON_DATA } from '../data/biomaterials';
import { SectionEyebrow } from './BrandMark';

interface ComparisonSectionProps {
  onRequestKit?: () => void;
}

export function ComparisonSection({ onRequestKit }: ComparisonSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="comparison"
      className="py-20 lg:py-28 bg-[#fafaf7] border-b border-[#e5e7eb] relative"
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow label="Material Benchmark Analysis" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] tracking-[-0.015em] text-[#1a1a1a] mb-4">
            How we compare to <span className="italic text-[#0b5e1e]">legacy materials.</span>
          </h2>
          <p className="text-[15px] leading-[1.65] text-[#6b7280]">
            A rigorous comparison across environmental footprint, toxicity, production cycles, and community impact.
          </p>
        </div>

        {/* Comparison Table / Grid */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#e5e7eb] overflow-hidden bg-white shadow-xs"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#f8faf7] border-b border-[#e5e7eb] py-4 px-4 sm:px-6 text-xs font-mono uppercase tracking-wider text-[#6b7280]">
            <div className="col-span-4 sm:col-span-3 text-[#1a1a1a] font-semibold">
              Evaluation Parameter
            </div>
            <div className="col-span-4 sm:col-span-3 hidden sm:block">
              Traditional Animal Leather
            </div>
            <div className="col-span-4 sm:col-span-3 hidden sm:block">
              Synthetic PU / PVC Pleather
            </div>
            <div className="col-span-8 sm:col-span-3 text-[#0b5e1e] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0b5e1e]" />
              <span>Urban Hyphae Myco-Leather</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#e5e7eb]">
            {MATERIAL_COMPARISON_DATA.map((row) => (
              <div
                key={row.parameter}
                className="grid grid-cols-12 py-4 px-4 sm:px-6 items-center text-xs sm:text-sm hover:bg-[#f8faf7] transition-colors"
              >
                <div className="col-span-12 sm:col-span-3 font-semibold text-[#1a1a1a] mb-2 sm:mb-0">
                  {row.parameter}
                </div>
                <div className="col-span-6 sm:col-span-3 text-[#6b7280] pr-2 sm:pr-4 mb-2 sm:mb-0">
                  <span className="sm:hidden block text-[10px] uppercase font-mono text-[#6b7280] mb-0.5">Animal Leather:</span>
                  {row.animalLeather}
                </div>
                <div className="col-span-6 sm:col-span-3 text-[#6b7280] pr-2 sm:pr-4 mb-2 sm:mb-0">
                  <span className="sm:hidden block text-[10px] uppercase font-mono text-[#6b7280] mb-0.5">Synthetic Pleather:</span>
                  {row.syntheticLeather}
                </div>
                <div className="col-span-12 sm:col-span-3 p-2.5 rounded-xl bg-[#0b5e1e]/5 border border-[#0b5e1e]/30 font-medium text-[#0b5e1e] shadow-xs">
                  <span className="sm:hidden block text-[10px] uppercase font-mono text-[#0b5e1e] mb-0.5">Urban Hyphae:</span>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0b5e1e] shrink-0" strokeWidth={2.5} />
                    <span>{row.urbanHyphaeLeather}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Summary Banner */}
          <div className="bg-[#f8faf7] p-5 sm:p-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6b7280] text-center sm:text-left">
              <span className="font-semibold text-[#1a1a1a]">Key Takeaway:</span> Mycelium biomaterials eliminate 100% of animal slaughter and carcinogenic chrome tanning while offering rapid agricultural circularity.
            </div>
            {onRequestKit && (
              <button
                type="button"
                onClick={onRequestKit}
                className="btn btn-sm btn-primary shrink-0"
              >
                Order evaluation kit
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
