import { motion } from 'motion/react';
import { Diamond, Leaf, HeartHandshake } from 'lucide-react';
import { SITE_IMAGES } from '../../data/assets';

export function ProductMission() {
  const expectations = [
    {
      title: 'Premium Quality',
      description: 'Durable materials that match traditional leather performance.',
      icon: Diamond,
    },
    {
      title: '100% Sustainable',
      description: 'Completely biodegradable and environmentally friendly.',
      icon: Leaf,
    },
    {
      title: 'Cruelty-Free',
      description: 'No animals harmed in the production process.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      className="py-20 lg:py-28 bg-[#FAFAF7] bg-cover bg-left sm:bg-center bg-no-repeat border-t border-[#E5E7EB] relative overflow-hidden"
      style={{ backgroundImage: `url(${SITE_IMAGES.bgMissionSection})` }}
    >
      {/* Mobile-only overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#FAFAF7]/70 lg:hidden pointer-events-none"
      />

      <div className="relative max-w-[1320px] mx-auto w-full px-5 sm:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center min-h-[500px]">
          {/* Left: Arched Mycelium Root Photography with Organic Mask (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Soft decorative backplate glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[44px] bg-gradient-to-tr from-[#A7C957]/20 to-[#5A7F3F]/15 blur-xl transform -rotate-1 -z-10 pointer-events-none"
            />

            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[36px] sm:rounded-[44px] overflow-hidden border border-[#E5E7EB] bg-[#F8FAF7] shadow-[0_12px_36px_rgba(0,0,0,0.06)] group">
              <img
                src={SITE_IMAGES.techMycelium}
                alt="Living fungal mycelium root network in bio-fabrication cultivation"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-xs font-mono text-[#0B5E1E] flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0B5E1E] animate-pulse" />
                <span className="font-semibold">Pure Cultivated Mycelium Network</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Mission Narrative & Glass-like Information Panel (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-6 h-px bg-[#0B5E1E]/50" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0B5E1E]">
                OUR MISSION
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-normal leading-[1.05] tracking-[-0.015em] text-[#1A1A1A] mb-5">
              Something <span className="italic text-[#0B5E1E] font-medium">Amazing</span> is Coming
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#374151] font-normal leading-[1.7] mb-8 max-w-2xl">
              We're crafting the future of sustainable materials. Our innovative mycelium-based products will revolutionize how you think about leather, fashion, and environmental responsibility.
            </p>

            {/* Glass-like Information Panel: "What to Expect" */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              {/* Panel Heading with Separator Lines */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 sm:w-16 h-px bg-[#A7C957]/60" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#0B5E1E]">
                  What to Expect
                </span>
                <span className="w-8 sm:w-16 h-px bg-[#A7C957]/60" />
              </div>

              {/* Three Columns Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
                {expectations.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`flex flex-col items-start ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
                    >
                      {/* Botanical Icon inside soft Sage Green circular background */}
                      <div className="w-10 h-10 rounded-full bg-[#A7C957]/25 border border-[#A7C957]/40 flex items-center justify-center text-[#0B5E1E] mb-3 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-lg text-[#1A1A1A] font-medium leading-snug mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#4B5563] leading-[1.6] font-normal">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
