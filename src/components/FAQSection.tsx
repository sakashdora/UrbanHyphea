import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/biomaterials';
import { SectionEyebrow } from './BrandMark';

export function FAQSection() {
  const prefersReduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-[#FAFAF7] border-t border-[#E5E7EB] relative"
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionEyebrow label="Frequently Asked Questions" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] tracking-[-0.015em] text-[#1A1A1A]">
              Everything you need to know about <span className="italic text-[#0B5E1E]">myco-materials.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-[#6B7280] max-w-[42ch] font-normal">
            Clear answers on mechanical durability, our proprietary PSAWL cultivation media, and ordering commercial pilot samples.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={item.question}
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden transition-all duration-200 hover:border-[#0B5E1E]/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-7 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5E1E]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl sm:text-[22px] text-[#1A1A1A] font-normal leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#0B5E1E] text-white border-[#0B5E1E] rotate-180'
                        : 'bg-[#F8FAF7] text-[#6B7280] border-[#E5E7EB]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-[15px] leading-[1.7] text-[#6B7280] border-t border-[#E5E7EB] font-normal">
                        <p>{item.answer}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B5E1E] bg-[#F8FAF7] px-2.5 py-0.5 rounded-full border border-[#E5E7EB] font-medium">
                            Category: {item.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
