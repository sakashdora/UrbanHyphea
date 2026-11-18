import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Flame, Skull, Trash2, Sprout, CheckCircle2, Award } from 'lucide-react';
import { PROBLEM_CARDS, FOUNDERS } from '../data/biomaterials';
import { MediaImage, SectionEyebrow } from './BrandMark';

function ProblemIcon({ type }: { type: 'leaf' | 'paw' | 'recycle' }) {
  const iconClass = 'w-4 h-4 text-[#0b5e1e]';
  switch (type) {
    case 'leaf':
      return <Flame className={iconClass} strokeWidth={2} />;
    case 'paw':
      return <Skull className={iconClass} strokeWidth={2} />;
    case 'recycle':
      return <Trash2 className={iconClass} strokeWidth={2} />;
  }
}

interface ProblemSectionProps {
  onExploreTech?: () => void;
}

export function ProblemSection({ onExploreTech }: ProblemSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#fafaf7] border-b border-[#e5e7eb] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <SectionEyebrow label="About Urban Hyphae" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[50px] leading-[1.08] tracking-[-0.015em] text-[#1a1a1a] mb-5 font-normal">
            Revolutionizing materials through <span className="italic text-[#0b5e1e]">nature's wisdom.</span>
          </h2>
          <p className="text-base sm:text-lg leading-[1.65] text-[#6b7280] font-normal">
            Urban-Hyphae Bioscience Pvt. Ltd. is an Indian biotechnology startup headquartered in Bhubaneswar, Odisha (DPIIT Reg: DIPP159519). We upcycle regional agricultural crop residue into cruelty-free bio-leather and home-compostable packaging through solid-state fungal biotechnology.
          </p>
        </div>

        {/* 3 Ecological Problem-Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PROBLEM_CARDS.map((card, index) => (
            <motion.article
              key={card.id}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:border-[#0b5e1e]/40 card-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f8faf7]">
                <MediaImage
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md border border-[#e5e7eb] shadow-xs">
                  <ProblemIcon type={card.iconType} />
                </div>
                <div className="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#e5e7eb]">
                  <span className="font-display text-xl font-bold text-[#1a1a1a]">
                    {card.stat}
                  </span>
                  <p className="text-[10px] font-mono text-[#0b5e1e] leading-tight mt-0.5">
                    {card.statLabel}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-normal leading-snug text-[#1a1a1a] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6b7280] mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e5e7eb] text-xs text-[#0b5e1e] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0b5e1e] shrink-0" />
                  <span>{card.impactNote}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Waste to Wealth Banner & Tech Action */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#f8faf7] border border-[#e5e7eb] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-[#0b5e1e]">
              <Sprout className="w-4 h-4 text-[#0b5e1e]" />
              <span>Waste-to-Wealth Agrarian Model</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] mb-2 font-normal">
              Direct farmer partnerships across coastal Odisha.
            </h3>
            <p className="text-sm leading-relaxed text-[#6b7280]">
              By procuring crop residues directly from agrarian belts, we eliminate hazardous stubble burning while channeling secondary revenue directly to local farmers.
            </p>
          </div>

          {onExploreTech && (
            <button
              type="button"
              onClick={onExploreTech}
              className="btn btn-primary shrink-0"
            >
              <span>Explore our technology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
