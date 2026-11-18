import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LaunchCountdown } from './LaunchCountdown';
import { SITE_IMAGES } from '../../data/assets';

interface ProductHeroProps {
  onExploreClick?: () => void;
}

export function ProductHero({ onExploreClick }: ProductHeroProps) {
  const scrollToCategories = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('product-categories');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] flex items-center bg-[#FAFAF7] pt-12 pb-12 lg:pt-16 lg:pb-16 overflow-hidden"
    >
      {/* Fluid Responsive Hero Background Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={SITE_IMAGES.bgHeroSection}
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-[75%_center] lg:object-[84%_center] xl:object-right"
          loading="eager"
          decoding="async"
        />
        {/* Soft mobile/tablet scrim: ensures text is 100% readable without washing out the desktop photography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#FAFAF7]/95 via-[#FAFAF7]/80 to-transparent lg:hidden pointer-events-none"
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto w-full px-5 sm:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, CTA & Countdown (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
          >
            {/* Small Uppercase Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#0B5E1E]/60" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0B5E1E]">
                INNOVATING WITH NATURE
              </span>
            </div>

            {/* Main Heading: "Our Products" */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[68px] xl:text-[74px] font-normal leading-[1.04] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Our <span className="italic text-[#0B5E1E] font-medium">Products</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#374151] font-normal leading-[1.6] max-w-[40ch] mb-6">
              Revolutionary sustainable materials coming soon
            </p>

            {/* CTA Button: "Explore Products →" */}
            <div className="mb-8">
              <button
                type="button"
                onClick={scrollToCategories}
                className="btn btn-lg btn-primary"
              >
                <span>Explore products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile-only Mushroom Preview Window */}
            <div className="lg:hidden mb-6 w-full max-w-sm rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-md bg-white">
              <img
                src={SITE_IMAGES.bgHeroSection}
                alt="Oyster mushrooms growing naturally on moss"
                className="w-full h-44 object-cover object-[84%_center]"
                loading="eager"
              />
            </div>

            {/* Launch Countdown Panel */}
            <div className="w-full max-w-lg">
              <LaunchCountdown />
            </div>
          </motion.div>

          {/* Right Column: Dedicated natural space for the background oyster mushrooms to shine through (6 Cols) */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 min-h-[480px] pointer-events-none" />
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={scrollToCategories}
            className="group inline-flex flex-col items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#4B5563] hover:text-[#0B5E1E] transition-colors p-2"
            aria-label="Scroll down to product categories"
          >
            <div className="w-5 h-8 rounded-full border-2 border-[#6B7280]/60 group-hover:border-[#0B5E1E] flex items-start justify-center p-1 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-[#0B5E1E]"
              />
            </div>
            <span className="font-medium tracking-widest text-[10px]">Scroll Down</span>
          </button>
        </div>
      </div>
    </section>
  );
}
