import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { MushroomObservatory } from './MushroomObservatory';

interface HeroProps {
  onExploreProducts: () => void;
  onLearnMore: () => void;
  onNavigateAchievements?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const METRICS = [
  { value: '100%', label: 'Cruelty-free' },
  { value: '12–18d', label: 'Growth cycle' },
  { value: '0%', label: 'Chromium / PU' },
];

export function Hero({ onExploreProducts, onLearnMore }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Copy drifts up and fades a touch as you scroll past; the model lags behind for depth.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, prefersReduced ? 1 : 0.2]);
  const modelY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 80]);

  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const scrollToNext = () => {
    document.getElementById('home-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center bg-[#FAFAF7] overflow-hidden min-h-[calc(100svh-var(--nav-height))] py-12 sm:py-16 lg:py-10"
    >
      {/* Ambient organic light */}
      <div
        aria-hidden="true"
        className="absolute right-[-10%] top-[-5%] w-[640px] h-[640px] rounded-full bg-[#A7C957]/12 blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-[-12%] bottom-[-10%] w-[520px] h-[520px] rounded-full bg-[#E8E2D2]/50 blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-[1320px] mx-auto w-full px-5 sm:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Copy */}
          <motion.div
            style={{ y: copyY, opacity: copyOpacity }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col"
          >
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#0B5E1E] text-[11px] sm:text-xs font-mono mb-6 w-fit max-w-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="tracking-wide font-semibold truncate">DPIIT Startup India · DIPP159519</span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="font-display text-[44px] leading-[1.02] sm:text-[60px] xl:text-[76px] font-normal tracking-[-0.02em] text-[#1A1A1A] mb-6"
            >
              A better future with{' '}
              <span className="italic text-[#0B5E1E] font-medium whitespace-nowrap">biomaterials.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="text-base sm:text-lg leading-[1.7] text-[#374151] max-w-[48ch] mb-9"
            >
              Innovating with nature for a sustainable tomorrow. We turn regional crop residue into cruelty-free mushroom
              bio-leather and home-compostable packaging through fungal biotechnology.
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="flex flex-col min-[420px]:flex-row gap-3 sm:gap-4 mb-12">
              <button type="button" onClick={onExploreProducts} className="btn btn-lg btn-primary">
                <span>Explore products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={onLearnMore} className="btn btn-lg btn-outline">
                <span>Our story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.dl
              {...fadeUp(0.32)}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-7 border-t border-[#E5E7EB] max-w-lg"
            >
              {METRICS.map((m) => (
                <div key={m.label}>
                  <dd className="font-display text-[28px] sm:text-[34px] text-[#0B5E1E] leading-none mb-2">{m.value}</dd>
                  <dt className="text-[10px] sm:text-[11px] text-[#4B5563] font-semibold uppercase tracking-[0.12em] font-mono">
                    {m.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* 3D specimen — lives only in the hero */}
          <motion.div
            style={{ y: modelY }}
            className="lg:col-span-6 xl:col-span-6 w-full max-w-[560px] lg:max-w-none mx-auto"
          >
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              className="relative"
            >
              <MushroomObservatory />
              <p className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#6B7280] whitespace-nowrap pointer-events-none">
                Pleurotus ostreatus · drag to rotate
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to products"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-[#6B7280] hover:text-[#0B5E1E] transition-colors"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
    </section>
  );
}
