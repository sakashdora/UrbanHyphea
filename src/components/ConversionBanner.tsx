import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface ConversionBannerProps {
  onExploreProducts?: () => void;
  onGetInTouch?: () => void;
}

export function ConversionBanner({ onExploreProducts, onGetInTouch }: ConversionBannerProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="conversion"
      className="relative z-10 w-full bg-[#0B5E1E] text-white py-20 lg:py-28 px-5 sm:px-8 overflow-hidden"
    >
      {/* Background subtle radial ambient highlight */}
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -left-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-[#A7C957]/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-mono font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#A7C957]" />
          <span>The Next Frontier of Circular Materials</span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.08] tracking-tight text-white mb-6 max-w-4xl mx-auto">
          Join the Biological Revolution in <span className="italic text-[#A7C957]">Sustainable Luxury.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Partner with Urban Hyphae to replace toxic animal skins and petroleum plastics with custom-grown mycelium bio-leather and regenerative packaging.
        </p>

        {/* Action Buttons */}
        <div className="relative z-10 flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center justify-center gap-3 sm:gap-4 mb-12">
          <button
            type="button"
            onClick={() => {
              if (onExploreProducts) onExploreProducts();
              else scrollTo('materials');
            }}
            className="btn btn-lg btn-light"
          >
            <span>Explore our products</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (onGetInTouch) onGetInTouch();
              else scrollTo('contact');
            }}
            className="btn btn-lg btn-on-dark"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14 pt-8 border-t border-white/20 font-mono text-xs sm:text-sm font-medium text-white/90">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A7C957]" />
            <span>100% Sustainable Bio-Fabrication</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A7C957]" />
            <span>Cruelty-Free &amp; Zero Bovine Hide</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A7C957]" />
            <span>Naturally Biodegradable</span>
          </div>
        </div>
      </div>
    </section>
  );
}
