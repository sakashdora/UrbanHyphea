import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, Trophy } from 'lucide-react';
import { SITE_IMAGES } from '../data/assets';
import { ECOSYSTEM_INCUBATORS } from '../data/biomaterials';
import { MediaImage, SectionEyebrow } from './BrandMark';

export function AchievementsSection() {
  const prefersReduced = useReducedMotion();

  const conclaveMoments = [
    {
      title: 'INAE Conclave 2026 Stage Presentation',
      img: SITE_IMAGES.achievementInaeConclave,
      caption: 'Vivek & Adhiraj addressing the National Academy of Engineering at SOA',
    },
    {
      title: 'Live Pitch to Evaluation Panel',
      img: SITE_IMAGES.achievementPitchPresentation,
      caption: 'Demonstrating material flexibility & tensile memory directly to judges',
    },
    {
      title: 'Official Exhibition Pavilion',
      img: SITE_IMAGES.achievementBoothDelegation,
      caption: 'Urban Hyphae team hosting academic leaders & industrial mentors',
    },
    {
      title: 'Founder Keynote Address',
      img: SITE_IMAGES.achievementAdhirajSpeaking,
      caption: 'Adhiraj Mohapatra detailing the PSAWL matrix & rural economic model',
    },
  ];

  return (
    <section
      id="achievements"
      className="py-20 lg:py-28 bg-[#FAFAF7] text-[#1A1A1A] border-t border-[#E5E7EB] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionEyebrow label="Verified Milestones & Conclaves" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] tracking-[-0.015em] text-[#1A1A1A]">
              Real breakthroughs.{' '}
              <span className="italic text-[#0B5E1E]">Proven on stage.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-[#374151] max-w-[42ch] font-normal">
            Documented achievements from the INAE Technology Conclave, National Bio-Innovation summits, and official enterprise delegations.
          </p>
        </div>

        {/* Featured Two Major Real Achievement Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Card: First Sheet Unveiling */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-3xl bg-white border border-[#E5E7EB] overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] group hover:border-[#0B5E1E]/50 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F8FAF7]">
              <MediaImage
                src={SITE_IMAGES.achievementFirstSheet}
                alt="Vivek Kumar Singh and Adhiraj Mohapatra unveiling the first cultivated mycelium leather sheet"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] text-xs font-mono uppercase tracking-wider text-[#0B5E1E] shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B5E1E]" />
                <span>DPIIT Startup India · DIPP159519</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0B5E1E] font-semibold block mb-2">
                Bhubaneswar Bio-Fabrication · 5th July 2026
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#1A1A1A] mb-3 font-normal">
                First Cultivated Agricultural Waste &amp; Mycelium Sheet
              </h3>
              <p className="text-sm leading-[1.7] text-[#6B7280] font-normal">
                Co-founders Vivek Kumar Singh and Adhiraj Mohapatra formally unveiled the first continuous mycelium leather sheet grown from regional crop waste, validating scalable solid-state bio-fabrication in Odisha.
              </p>
            </div>
          </motion.div>

          {/* Secondary Card: SRUSTI SPARK Award Stage */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-3xl bg-white border border-[#E5E7EB] overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] group hover:border-[#0B5E1E]/50 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F8FAF7]">
              <MediaImage
                src={SITE_IMAGES.achievementSrustiSparkAward}
                alt="Adhiraj Mohapatra and team receiving the National Bio-Innovation award trophy on stage"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] text-xs font-mono uppercase tracking-wider text-[#0B5E1E] shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-[#0B5E1E]" />
                <span>National Bio-Innovation Award Winner</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0B5E1E] font-semibold block mb-2">
                MoE’s Innovation Cell &amp; Atal Incubation Centre
              </span>
              <h3 className="font-display text-2xl text-[#1A1A1A] mb-3 font-normal">
                State Innovation Felicitation
              </h3>
              <p className="text-sm leading-[1.7] text-[#374151] font-normal">
                Felicitation by dignitaries at the Innovation Summit for pioneering sustainable circular alternatives to toxic conventional leather.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4-Item Photo Grid of Authentic Conclave Moments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {conclaveMoments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] group hover:border-[#0B5E1E]/40 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F8FAF7]">
                <MediaImage
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="font-display text-base text-[#1A1A1A] font-medium leading-snug mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B7280] leading-tight font-normal">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institutional Backers Strip */}
        <div className="pt-8 border-t border-[#E5E7EB]">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#6B7280] mb-5 text-center sm:text-left font-medium">
            Institutional Ecosystem, Conclaves &amp; Startup Accreditations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ECOSYSTEM_INCUBATORS.map((inc) => (
              <div
                key={inc.name}
                className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] text-center flex flex-col justify-center min-h-[82px] hover:border-[#0B5E1E]/40 hover:bg-[#F8FAF7] transition-colors shadow-sm"
              >
                <p className="text-xs font-semibold text-[#1A1A1A] leading-snug">
                  {inc.name}
                </p>
                <p className="text-[10px] text-[#6B7280] mt-1 line-clamp-1">
                  {inc.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
