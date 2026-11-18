import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { PHYSICAL_PRODUCTS } from '../../data/biomaterials';
import { SITE_IMAGES } from '../../data/assets';

interface ProductPrototypesProps {
  onInquire?: (productId: string) => void;
}

export function ProductPrototypes({ onInquire }: ProductPrototypesProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF7] border-t border-[#E5E7EB] relative overflow-hidden">
      {/* Subtle organic light backdrop */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-[-5%] w-[500px] h-[500px] rounded-full bg-[#A7C957]/10 blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-[-5%] w-[450px] h-[450px] rounded-full bg-[#E8E2D2]/30 blur-[130px] pointer-events-none"
      />

      <div className="relative max-w-[1320px] mx-auto w-full px-5 sm:px-8 z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-6 h-px bg-[#0B5E1E]/50" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0B5E1E]">
                AUTHENTIC BIOLOGICAL PROTOTYPES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-normal leading-[1.05] tracking-[-0.015em] text-[#1A1A1A]">
              Original <span className="italic text-[#0B5E1E] font-medium">Artifacts & Sheets</span>
            </h2>
          </div>
          <p className="text-base text-[#374151] font-normal leading-[1.7] max-w-lg">
            Physically fabricated in Bhubaneswar from regional agricultural crop residues. Tested for tensile resilience, flex endurance, and home biodegradability.
          </p>
        </div>

        {/* 5-Item Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {PHYSICAL_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#0B5E1E]/50 card-lift"
            >
              <div>
                {/* High Quality Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAF7]">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"
                  />
                  <div className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] text-[10px] font-mono text-[#0B5E1E] font-semibold shadow-xs">
                    <Sparkles className="w-3 h-3 shrink-0 text-[#0B5E1E]" />
                    <span className="truncate">{prod.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B5E1E] font-bold block mb-1">
                    {prod.category}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-[#1A1A1A] font-medium mb-1.5 leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#4B5563] line-clamp-2 mb-3.5 font-normal">
                    {prod.description}
                  </p>

                  {/* Primary Spec Box */}
                  <div className="p-2.5 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] text-[11px] font-mono flex items-baseline justify-between gap-2">
                    <span className="text-[#6B7280] shrink-0">{prod.specs[0]?.label}</span>
                    <span className="text-[#1A1A1A] font-semibold text-right">{prod.specs[0]?.value}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0 border-t border-[#E5E7EB] mt-2 pt-3.5">
                <button
                  type="button"
                  onClick={() => onInquire?.(prod.id)}
                  className="btn btn-sm btn-primary w-full"
                >
                  <span>Request swatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
