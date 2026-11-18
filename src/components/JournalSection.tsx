import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { milestones } from '../data/studio';
import { MediaImage, SectionEyebrow } from './BrandMark';

interface JournalSectionProps {
  onNavigate: (pageId: string) => void;
}

export function JournalSection({ onNavigate }: JournalSectionProps) {
  const prefersReduced = useReducedMotion();
  const [lead, ...rest] = milestones;

  return (
    <section id="journal" className="py-16 lg:py-24 bg-[#FAFAF7]">
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <SectionEyebrow label="Journal" />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] leading-[1.04] tracking-[-0.02em] text-[#1A1A1A]">
              Field notes from the <span className="italic text-[#0B5E1E]">grow room.</span>
            </h1>
          </div>
          <p className="text-[15px] leading-[1.7] text-[#4B5563] max-w-[42ch]">
            Stories from our lab, the exhibition floor and the people shaping mycelium materials in Odisha.
          </p>
        </div>

        {/* Lead story */}
        <motion.article
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden bg-white border border-[#E5E7EB] mb-10 card-lift"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-[#F1F3EC]">
            <MediaImage
              src={lead.photo}
              alt={lead.title}
              lazy={false}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#0B5E1E] font-semibold mb-3">
              {lead.label}
            </span>
            <h2 className="font-display text-3xl sm:text-[38px] leading-[1.1] text-[#1A1A1A] mb-4">{lead.title}</h2>
            <p className="text-[15px] leading-[1.7] text-[#4B5563] mb-8">{lead.description}</p>
            <button type="button" onClick={() => onNavigate('achievements')} className="btn-link w-fit">
              <span>See the milestone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.article>

        {/* Story grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {rest.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (idx < 2 ? idx : idx - 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] card-lift ${
                idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              } ${idx === rest.length - 1 && rest.length % 2 === 1 ? 'sm:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden bg-[#F1F3EC] ${idx < 2 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                <MediaImage
                  src={post.photo}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#0B5E1E] font-semibold mb-2">
                  {post.label}
                </span>
                <h3 className="font-display text-2xl leading-snug text-[#1A1A1A] mb-2">{post.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B5563] flex-1">{post.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B5E1E]/[0.08] text-[#0B5E1E] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-[#1A1A1A] mb-1">More stories are growing.</h3>
              <p className="text-sm text-[#4B5563]">Long-form articles on our process and research are on the way.</p>
            </div>
          </div>
          <button type="button" onClick={() => onNavigate('contact')} className="btn btn-primary shrink-0">
            <span>Get updates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
