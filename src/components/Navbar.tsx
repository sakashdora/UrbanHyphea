import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { UrbanHyphaeLogo } from './BrandMark';

export interface NavPageItem {
  id: string;
  label: string;
}

export const PAGES: NavPageItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'technology', label: 'Technology' },
  { id: 'blogs', label: 'Journal' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0);
      setIsScrolled(window.scrollY > 12);
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close the drawer with Escape and when growing past the mobile breakpoint
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [mobileOpen]);

  const handleLinkClick = (pageId: string) => {
    setMobileOpen(false);
    onNavigate(pageId);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[var(--nav-height)] transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled || mobileOpen
          ? 'bg-[#fafaf7]/90 backdrop-blur-xl border-b border-[#e5e7eb] shadow-[0_6px_24px_-12px_rgba(0,0,0,0.12)]'
          : 'bg-[#fafaf7]/70 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#0b5e1e] to-[#a7c957]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="max-w-[1320px] mx-auto w-full h-full px-5 sm:px-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="group shrink-0 flex items-center text-left rounded-md"
          aria-label="Urban Hyphae home"
        >
          <UrbanHyphaeLogo showSubtext />
        </button>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {PAGES.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 py-2 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive ? 'text-[#0b5e1e]' : 'text-[#4b5563] hover:text-[#0b5e1e]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[#0b5e1e]/[0.07]"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="tel:+919439941804"
            className="hidden 2xl:inline-flex items-center gap-1.5 px-2 text-[#4b5563] hover:text-[#0b5e1e] transition-colors"
            title="Call Urban Hyphae"
          >
            <Phone className="w-3.5 h-3.5 text-[#0b5e1e]" />
            <span className="font-mono text-[11px]">+91 9439941804</span>
          </a>

          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="btn btn-sm btn-primary hidden sm:inline-flex"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#E5E7EB] bg-white text-[#1A1A1A] hover:border-[#0B5E1E] hover:text-[#0B5E1E] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full inset-x-0 h-[100svh] bg-black/20"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full inset-x-0 bg-[#FAFAF7] border-b border-[#E5E7EB] shadow-xl max-h-[calc(100svh-var(--nav-height))] overflow-y-auto"
            >
              <nav aria-label="Mobile" className="max-w-[1320px] mx-auto px-5 sm:px-8 py-5 flex flex-col gap-1">
                {PAGES.map((item, i) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.03 * i }}
                    onClick={() => handleLinkClick(item.id)}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                    className={`text-left text-[17px] font-medium py-3 px-4 rounded-xl transition-colors ${
                      currentPage === item.id
                        ? 'text-[#0B5E1E] font-semibold bg-[#0B5E1E]/[0.07]'
                        : 'text-[#374151] hover:text-[#0B5E1E] hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-4 mt-3 border-t border-[#E5E7EB] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleLinkClick('contact')}
                    className="btn btn-primary w-full"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="tel:+919439941804"
                    className="w-full text-center py-3 text-xs text-[#4b5563] font-mono hover:text-[#0b5e1e]"
                  >
                    Call +91 9439941804
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
