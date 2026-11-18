import { useState } from 'react';
import { ArrowUp, Check, Linkedin, Youtube, Instagram } from 'lucide-react';
import { UrbanHyphaeLogo } from '../BrandMark';
import { SITE_IMAGES } from '../../data/assets';

interface ProductFooterProps {
  onNavigate?: (pageId: string) => void;
}

export function ProductFooter({ onNavigate }: ProductFooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e: React.MouseEvent, pageId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
      scrollToTop();
    }
  };

  return (
    <footer
      className="bg-[#FAFAF7] bg-cover bg-bottom bg-no-repeat text-[#6B7280] border-t border-[#E5E7EB] relative overflow-hidden"
      style={{ backgroundImage: `url(${SITE_IMAGES.bgFooterSection})` }}
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16 relative z-10">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#E5E7EB]">
          {/* COLUMN 01 — BRAND (4 Cols) */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleLink(e, 'home')}
              aria-label="Urban Hyphae Home"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5E1E] rounded-sm mb-4"
            >
              <UrbanHyphaeLogo showSubtext />
            </a>
            <p className="font-display italic text-lg text-[#1A1A1A] mb-3">
              "A better future with biomaterials"
            </p>
            <p className="text-xs leading-relaxed text-[#6B7280] max-w-sm font-normal">
              Innovating with nature for a sustainable tomorrow. Converting agricultural stubble and crop residue into cruelty-free mycelium bio-leather and home-compostable packaging.
            </p>
          </div>

          {/* COLUMN 02 — QUICK LINKS (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-bold mb-4">
              Quick Links
            </h4>
            <nav aria-label="Quick Links Navigation" className="flex flex-col space-y-2.5 text-sm">
              <a
                href="#home"
                onClick={(e) => handleLink(e, 'home')}
                className="hover:text-[#0B5E1E] transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleLink(e, 'about')}
                className="hover:text-[#0B5E1E] transition-colors"
              >
                About Us
              </a>
              <a
                href="#products"
                onClick={(e) => handleLink(e, 'products')}
                className="text-[#0B5E1E] font-medium transition-colors"
              >
                Products
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLink(e, 'contact')}
                className="hover:text-[#0B5E1E] transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* COLUMN 03 — LEGAL (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-bold mb-4">
              Legal
            </h4>
            <nav aria-label="Legal Links" className="flex flex-col space-y-2.5 text-sm">
              <a
                href="#faq"
                onClick={(e) => handleLink(e, 'contact')}
                className="hover:text-[#0B5E1E] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#faq"
                onClick={(e) => handleLink(e, 'contact')}
                className="hover:text-[#0B5E1E] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#faq"
                onClick={(e) => handleLink(e, 'contact')}
                className="hover:text-[#0B5E1E] transition-colors"
              >
                Disclaimer
              </a>
            </nav>
          </div>

          {/* COLUMN 04 — NEWSLETTER & SOCIALS (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-bold mb-2">
              Newsletter
            </h4>
            <p className="text-xs text-[#6B7280] mb-3.5 font-normal leading-relaxed">
              Subscribe for updates and special offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 mb-6">
              <div className="flex rounded-full overflow-hidden border border-[#E5E7EB] bg-white focus-within:border-[#0B5E1E] shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  aria-label="Your Email"
                  className="w-full px-4 py-2.5 bg-transparent text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/70 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0B5E1E] text-white text-xs font-semibold hover:bg-[#084817] transition-all shrink-0 active:scale-[0.98]"
                >
                  Go
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-[#0B5E1E] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Urban Hyphae.</span>
                </p>
              )}
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/urban-hyphae-bioscience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:text-[#0B5E1E] hover:border-[#0B5E1E] hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="Urban Hyphae LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {/* X icon */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:text-[#0B5E1E] hover:border-[#0B5E1E] hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="Urban Hyphae on X"
              >
                <span className="font-bold text-xs leading-none">𝕏</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:text-[#0B5E1E] hover:border-[#0B5E1E] hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="Urban Hyphae YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:text-[#0B5E1E] hover:border-[#0B5E1E] hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="Urban Hyphae Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B7280]">
          <div>
            © 2026 Urban Hyphae. All Rights Reserved. | Website Developed in India by{' '}
            <a
              href="https://www.utilitycube.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B5E1E] hover:underline font-semibold"
            >
              Utility Cube Technologies
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn btn-sm btn-ghost bg-white"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle organic wave shapes at bottom using Sage Green and Forest Green */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-[#A7C957]/30 via-[#0B5E1E]/20 to-[#A7C957]/30 pointer-events-none"
      />
    </footer>
  );
}
