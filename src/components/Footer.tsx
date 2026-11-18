import { useState } from 'react';
import { ArrowUp, Check, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { UrbanHyphaeLogo } from './BrandMark';

interface FooterProps {
  onNavigate?: (pageId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
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
    <footer className="bg-[#F8FAF7] text-[#6B7280] border-t border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 py-16 lg:py-20">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#E5E7EB]">
          {/* Column 1: Brand Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleLink(e, 'home')}
              aria-label="Urban Hyphae Home"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5E1E] rounded-sm mb-5"
            >
              <UrbanHyphaeLogo showSubtext />
            </a>
            <p className="font-display italic text-lg text-[#1A1A1A] mb-4">
              "Nature's finest, reimagined for modern wellness and sustainable luxury."
            </p>
            <p className="text-xs leading-relaxed text-[#6B7280] mb-6 font-normal">
              Urban-Hyphae Bioscience Private Limited is an Indian biotechnology pioneer converting agricultural stubble and crop residue into cruelty-free mycelium bio-leather and home-compostable protective packaging.
            </p>
            <div className="space-y-2 text-xs text-[#6B7280] font-mono">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0B5E1E] shrink-0" />
                <span>Plot No. 804/2366, Kesura, Budheswari Colony, Bhubaneswar, Odisha 751006</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0B5E1E] shrink-0" />
                <a href="mailto:urbanhyphae@gmail.com" className="hover:text-[#0B5E1E] transition-colors">
                  urbanhyphae@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0B5E1E] shrink-0" />
                <a href="tel:+919439941804" className="hover:text-[#0B5E1E] transition-colors">
                  +91 9439941804
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-semibold mb-5">
              Quick Links
            </p>
            <nav aria-label="Footer Quick Links" className="flex flex-col space-y-2.5 text-sm">
              <a href="#home" onClick={(e) => handleLink(e, 'home')} className="hover:text-[#0B5E1E] transition-colors">
                Home
              </a>
              <a href="#about" onClick={(e) => handleLink(e, 'about')} className="hover:text-[#0B5E1E] transition-colors">
                About &amp; Ecological Mission
              </a>
              <a href="#products" onClick={(e) => handleLink(e, 'products')} className="hover:text-[#0B5E1E] transition-colors">
                Our Products &amp; Prototypes
              </a>
              <a href="#technology" onClick={(e) => handleLink(e, 'technology')} className="hover:text-[#0B5E1E] transition-colors">
                PSAWL Biotechnology
              </a>
              <a href="#achievements" onClick={(e) => handleLink(e, 'achievements')} className="hover:text-[#0B5E1E] transition-colors">
                Conclave Achievements
              </a>
              <a href="#about" onClick={(e) => handleLink(e, 'about')} className="hover:text-[#0B5E1E] transition-colors">
                Founders &amp; Designer Collective
              </a>
              <a href="#contact" onClick={(e) => handleLink(e, 'contact')} className="hover:text-[#0B5E1E] transition-colors">
                Contact &amp; Swatch Requests
              </a>
            </nav>
          </div>

          {/* Column 3: Legal & Accreditations (2 Cols) */}
          <div className="lg:col-span-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-semibold mb-5">
              Legal &amp; Policy
            </p>
            <nav aria-label="Footer Legal Links" className="flex flex-col space-y-2.5 text-sm">
              <a href="#contact" onClick={(e) => handleLink(e, 'contact')} className="hover:text-[#0B5E1E] transition-colors">
                Privacy Policy
              </a>
              <a href="#contact" onClick={(e) => handleLink(e, 'contact')} className="hover:text-[#0B5E1E] transition-colors">
                Terms of Service
              </a>
              <a href="#achievements" onClick={(e) => handleLink(e, 'achievements')} className="hover:text-[#0B5E1E] transition-colors">
                DPIIT Reg: DIPP159519
              </a>
              <a href="#about" onClick={(e) => handleLink(e, 'about')} className="hover:text-[#0B5E1E] transition-colors">
                Client Co-Creation SLA
              </a>
              <a href="#technology" onClick={(e) => handleLink(e, 'technology')} className="hover:text-[#0B5E1E] transition-colors">
                ASTM Compliance Data
              </a>
            </nav>
          </div>

          {/* Column 4: Newsletter & Lead Capture (3 Cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-semibold mb-3">
              Stay in the Mycelial Loop
            </p>
            <p className="text-xs text-[#6B7280] mb-4 font-normal leading-relaxed">
              Receive quarterly breakthroughs on solid-state fungal bio-polymers and commercial pilot openings.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-full overflow-hidden border border-[#E5E7EB] bg-white focus-within:border-[#0B5E1E] shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  aria-label="Your Email"
                  className="w-full px-4 py-3 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 bg-[#0B5E1E] text-white text-xs font-semibold hover:bg-[#084817] transition-colors shrink-0"
                >
                  Go
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-[#0B5E1E] flex items-center gap-1.5 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed to Urban Hyphae dispatches.</span>
                </p>
              )}
            </form>

            <div className="mt-6 pt-5 border-t border-[#E5E7EB] flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/urban-hyphae-bioscience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#0B5E1E] hover:border-[#0B5E1E] transition-colors shadow-sm"
                title="Urban Hyphae LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] font-mono text-[#6B7280]">Follow our bio-fabrication journey</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Utility Cube Technologies Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B7280]">
          <div>
            © 2026 Urban Hyphae. All Rights Reserved. · Designed in technical alliance with{' '}
            <a
              href="https://www.utilitycube.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B5E1E] hover:underline font-medium"
            >
              Utility Cube Technologies
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn btn-sm btn-ghost bg-white"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
