import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, Cpu, Award } from 'lucide-react';
import { Navbar, PAGES } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { TechnologySection } from './components/TechnologySection';
import { ComparisonSection } from './components/ComparisonSection';
import { AchievementsSection } from './components/AchievementsSection';
import { FoundersSection } from './components/FoundersSection';
import { FAQSection } from './components/FAQSection';
import { ConversionBanner } from './components/ConversionBanner';
import { ContactSection } from './components/ContactSection';
import { JournalSection } from './components/JournalSection';
import { Footer } from './components/Footer';
import { ProductsPage } from './components/products/ProductsPage';
import { PHYSICAL_PRODUCTS } from './data/biomaterials';
import type { InquiryInterest } from './utils/inquiry';

const EASE = [0.16, 1, 0.3, 1] as const;

function pageFromHash(): string {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return PAGES.find((p) => p.id === hash)?.id ?? 'home';
}

function PageTransition({ id, children }: { id: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={id}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
      exit={{ opacity: 0, y: reduce ? 0 : -8, transition: { duration: 0.22, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  );
}

const PILLARS = [
  {
    icon: Leaf,
    title: 'Ecological mission',
    body: 'Turning crop residue that would otherwise be burned into renewable, cruelty-free materials made in Odisha.',
    cta: 'Learn about our mission',
    page: 'about',
  },
  {
    icon: Cpu,
    title: 'PSAWL biotechnology',
    body: 'A proprietary solid-state fungal fermentation matrix reaching 18.4 MPa tensile strength in ASTM D2209 testing.',
    cta: 'Inspect the technology',
    page: 'technology',
  },
  {
    icon: Award,
    title: 'Recognised & registered',
    body: 'Registered under DPIIT Startup India (DIPP159519) and built on documented bio-fabrication protocols.',
    cta: 'View milestones',
    page: 'achievements',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(pageFromHash);
  const [selectedInterest, setSelectedInterest] = useState<InquiryInterest>('bio-leather');
  const pendingScrollTop = useRef(false);

  const goTo = useCallback((pageId: string) => {
    setCurrentPage((prev) => {
      if (prev === pageId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return prev;
      }
      pendingScrollTop.current = true;
      return pageId;
    });
  }, []);

  // Hashes double as page ids (and some section ids), so stop the browser from jumping to them.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Back/forward and manual hash edits
  useEffect(() => {
    const onHashChange = () => goTo(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [goTo]);

  const handleNavigate = useCallback(
    (pageId: string) => {
      if (window.location.hash.replace('#', '') !== pageId) {
        history.pushState(null, '', `#${pageId}`);
      }
      goTo(pageId);
    },
    [goTo]
  );

  // Jump to top in the gap between the old page fading out and the new page fading in,
  // so the new page never appears mid-scroll.
  const handleExitComplete = useCallback(() => {
    if (pendingScrollTop.current) {
      pendingScrollTop.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  const handleInquireMaterial = useCallback(
    (materialId: string) => {
      if (materialId.includes('leather')) setSelectedInterest('bio-leather');
      else if (materialId.includes('thermocol') || materialId.includes('packaging')) setSelectedInterest('bio-thermocol');
      else setSelectedInterest('general');
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  const [featured, ...others] = PHYSICAL_PRODUCTS;

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#0B5E1E] focus:text-white focus:text-xs focus:rounded-full focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main id="main-content" className="pt-[var(--nav-height)]">
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          {currentPage === 'home' && (
            <PageTransition id="home" key="home">
              <Hero
                onExploreProducts={() => handleNavigate('products')}
                onLearnMore={() => handleNavigate('about')}
                onNavigateAchievements={() => handleNavigate('achievements')}
              />

              {/* Real products */}
              <section id="home-products" className="py-20 lg:py-28 bg-white border-y border-[#E5E7EB]">
                <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-semibold block mb-3">
                        Real prototypes
                      </span>
                      <h2 className="font-display text-[34px] sm:text-[42px] lg:text-[50px] leading-[1.06] tracking-[-0.015em] text-[#1A1A1A]">
                        Original products. <span className="italic text-[#0B5E1E]">Proven in hand.</span>
                      </h2>
                    </div>
                    <p className="text-[15px] leading-[1.7] text-[#4B5563] max-w-md">
                      Every item below is a physical prototype grown from crop residue in Bhubaneswar and shown at state
                      and national conclaves.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 mb-14">
                    {[featured, ...others].map((prod, idx) => {
                      const isFeatured = idx === 0;
                      return (
                        <motion.article
                          key={prod.id}
                          initial={{ opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: EASE }}
                          className={`group flex flex-col bg-[#FAFAF7] border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#0B5E1E]/40 card-lift ${
                            isFeatured ? 'sm:col-span-2 lg:col-span-6 lg:row-span-2' : 'lg:col-span-3'
                          }`}
                        >
                          <div
                            className={`relative overflow-hidden bg-[#EEF0E8] ${
                              isFeatured ? 'aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[340px]' : 'aspect-[4/3]'
                            }`}
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            />
                            <div className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono text-[#0B5E1E] font-semibold shadow-sm">
                              <Sparkles className="w-3 h-3 shrink-0" />
                              <span className="truncate">{prod.badge}</span>
                            </div>
                          </div>

                          <div className={`flex flex-col ${isFeatured ? 'p-6 sm:p-8' : 'p-5'} ${isFeatured ? '' : 'flex-1'}`}>
                            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#0B5E1E] font-bold mb-1.5">
                              {prod.category}
                            </span>
                            <h3
                              className={`font-display text-[#1A1A1A] leading-snug mb-2 ${
                                isFeatured ? 'text-[30px] sm:text-[34px]' : 'text-[22px]'
                              }`}
                            >
                              {prod.name}
                            </h3>
                            <p
                              className={`leading-relaxed text-[#4B5563] mb-5 ${
                                isFeatured ? 'text-[15px] max-w-[52ch]' : 'text-[13px] line-clamp-2'
                              }`}
                            >
                              {prod.description}
                            </p>

                            {isFeatured ? (
                              <dl className="grid grid-cols-2 gap-px bg-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden mb-6">
                                {prod.specs.slice(0, 4).map((spec) => (
                                  <div key={spec.label} className="bg-white px-4 py-3">
                                    <dt className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#6B7280] mb-1">
                                      {spec.label}
                                    </dt>
                                    <dd className="text-[13px] font-semibold text-[#1A1A1A] leading-snug">{spec.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            ) : (
                              prod.specs[0] && (
                                <div className="mt-auto mb-5 flex items-baseline justify-between gap-3 py-2.5 border-y border-[#E5E7EB] text-[11px] font-mono">
                                  <span className="text-[#6B7280] shrink-0">{prod.specs[0].label}</span>
                                  <span className="text-[#1A1A1A] font-semibold text-right">{prod.specs[0].value}</span>
                                </div>
                              )
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleInquireMaterial(prod.id)}
                                className={`btn btn-sm btn-primary ${isFeatured ? '' : 'flex-1'}`}
                              >
                                <span>Request swatch</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleNavigate('products')}
                                className="btn btn-sm btn-ghost"
                              >
                                Specs
                              </button>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <button type="button" onClick={() => handleNavigate('products')} className="btn btn-lg btn-outline">
                      <span>Explore all products &amp; packaging</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Pillars */}
              <section className="py-20 lg:py-28 bg-[#FAFAF7]">
                <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#0B5E1E] font-semibold block mb-3">
                      Vision &amp; approach
                    </span>
                    <h2 className="font-display text-[34px] sm:text-[42px] leading-[1.08] text-[#1A1A1A]">
                      Pioneering circular materials <span className="italic text-[#0B5E1E]">from nature.</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {PILLARS.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <motion.div
                          key={p.title}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                          className="group p-8 lg:p-9 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#0B5E1E]/40 card-lift flex flex-col"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#0B5E1E]/[0.07] flex items-center justify-center text-[#0B5E1E] mb-7 transition-colors duration-300 group-hover:bg-[#0B5E1E] group-hover:text-white">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-display text-[26px] text-[#1A1A1A] mb-3">{p.title}</h3>
                          <p className="text-[14.5px] leading-relaxed text-[#4B5563] mb-8 flex-1">{p.body}</p>
                          <button type="button" onClick={() => handleNavigate(p.page)} className="btn-link w-fit">
                            <span>{p.cta}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <ConversionBanner
                onExploreProducts={() => handleNavigate('products')}
                onGetInTouch={() => handleNavigate('contact')}
              />
            </PageTransition>
          )}

          {currentPage === 'about' && (
            <PageTransition id="about" key="about">
              <ProblemSection onExploreTech={() => handleNavigate('technology')} />
              <FoundersSection onNavigate={handleNavigate} />
            </PageTransition>
          )}

          {currentPage === 'products' && (
            <PageTransition id="products" key="products">
              <ProductsPage onNavigate={handleNavigate} onInquireMaterial={handleInquireMaterial} />
            </PageTransition>
          )}

          {currentPage === 'technology' && (
            <PageTransition id="technology" key="technology">
              <TechnologySection onInspectProducts={() => handleNavigate('products')} />
              <ComparisonSection onRequestKit={() => handleInquireMaterial('bio-leather')} />
            </PageTransition>
          )}

          {currentPage === 'blogs' && (
            <PageTransition id="blogs" key="blogs">
              <JournalSection onNavigate={handleNavigate} />
            </PageTransition>
          )}

          {currentPage === 'achievements' && (
            <PageTransition id="achievements" key="achievements">
              <AchievementsSection />
              <section className="py-20 bg-white text-center border-t border-[#E5E7EB]">
                <div className="max-w-xl mx-auto px-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0B5E1E]/[0.08] text-[#0B5E1E] mb-5">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-3xl text-[#1A1A1A] mb-3">Recognised by national innovation bodies</h3>
                  <p className="text-[15px] leading-relaxed text-[#4B5563] mb-8">
                    Urban-Hyphae Bioscience is registered under DPIIT Startup India (DIPP159519) and supported by
                    institutional biotechnology incubation.
                  </p>
                  <button type="button" onClick={() => handleNavigate('contact')} className="btn btn-primary">
                    <span>Request an investor briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            </PageTransition>
          )}

          {currentPage === 'contact' && (
            <PageTransition id="contact" key="contact">
              <ContactSection selectedInterest={selectedInterest} />
              <FAQSection />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {currentPage !== 'products' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
