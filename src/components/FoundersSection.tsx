import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  GraduationCap,
  Linkedin,
  ShieldCheck,
  Cpu,
  FlaskConical,
  ArrowRight,
  Activity,
  FileCheck,
  Hammer,
  Palette,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  FOUNDERS,
  DESIGNER_TEAM,
  DEVELOPER_TEAM,
  TESTER_TEAM,
  RESEARCH_TEAM,
  CLIENT_PARTNERSHIP,
} from '../data/biomaterials';
import { MediaImage, SectionEyebrow } from './BrandMark';

type TeamTab = 'founders' | 'client-sla' | 'designers' | 'developers' | 'testers' | 'research';

interface FoundersSectionProps {
  onNavigate?: (pageId: string) => void;
}

export function FoundersSection({ onNavigate }: FoundersSectionProps = {}) {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TeamTab>('founders');

  const tabs = [
    { id: 'founders' as const, label: 'Executive Co-Founders', count: FOUNDERS.length },
    { id: 'client-sla' as const, label: 'Client : Co-Founder SLA', count: 4 },
    { id: 'designers' as const, label: 'Design & Architecture', count: DESIGNER_TEAM.length },
    { id: 'developers' as const, label: 'Creative Tech & Engineering', count: DEVELOPER_TEAM.length },
    { id: 'testers' as const, label: 'ASTM & QA Testing', count: TESTER_TEAM.length },
    { id: 'research' as const, label: 'Mycology & Agronomy Research', count: RESEARCH_TEAM.length },
  ];

  return (
    <section
      id="founders"
      className="py-20 lg:py-28 bg-[#FAFAF7] text-[#1A1A1A] border-t border-[#E5E7EB] relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <SectionEyebrow label="Corporate Collective & Scientific Leadership" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] tracking-[-0.015em] text-[#1A1A1A]">
              The minds behind the{' '}
              <span className="italic text-[#0B5E1E]">mycelium revolution.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-[#6B7280] max-w-[48ch] font-normal">
            From founding agricultural plant pathologists and luxury leathercraft artisans to computational morphologists,
            3D WebGL shader engineers, and ASTM testing evaluators.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#E5E7EB] scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group min-h-[40px] px-4 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#0B5E1E] border-[#0B5E1E] text-white shadow-sm font-semibold'
                    : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#0B5E1E]/40 hover:text-[#1A1A1A]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F8FAF7] text-[#6B7280]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {/* TAB 1: CO-FOUNDERS & LEADERSHIP */}
          {activeTab === 'founders' && (
            <motion.div
              key="founders"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {FOUNDERS.map((founder) => (
                  <article
                    key={founder.id}
                    className="group p-5 sm:p-6 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[#0B5E1E]/40 card-lift flex flex-col justify-between"
                  >
                    <div>
                      {/* Founder Portrait */}
                      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F8FAF7] border border-[#E5E7EB] mb-6 group-hover:border-[#0B5E1E]/40 transition-colors">
                        <MediaImage
                          src={founder.image}
                          alt={`Portrait of ${founder.name}, ${founder.role}`}
                          className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"
                        />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B5E1E] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E5E7EB] font-medium shadow-sm">
                            {founder.department}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display text-2xl text-[#1A1A1A] font-normal">
                          {founder.name}
                        </h3>
                        {founder.linkedinUrl && (
                          <a
                            href={founder.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full text-[#6B7280] hover:text-[#0B5E1E] hover:bg-[#F8FAF7] transition-colors"
                            title={`${founder.name} LinkedIn Profile`}
                            aria-label={`${founder.name} on LinkedIn`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <p className="text-xs font-mono uppercase tracking-[0.1em] text-[#0B5E1E] font-semibold mb-3">
                        {founder.role}
                      </p>

                      <p className="text-[13.5px] leading-[1.65] text-[#6B7280] mb-6 font-normal">
                        {founder.bio}
                      </p>
                    </div>

                    {/* Academic & Professional Credentials */}
                    <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B7280] font-medium flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#0B5E1E]" />
                        <span>Academic &amp; Professional Credentials</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#1A1A1A] font-sans">
                        {founder.credentials.map((cred) => (
                          <li key={cred} className="flex items-start gap-2 leading-relaxed font-normal">
                            <span className="text-[#0B5E1E] font-mono text-[10px] mt-0.5">▪</span>
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: CLIENT : CO-FOUNDER PARTNERSHIP PORTAL */}
          {activeTab === 'client-sla' && (
            <motion.div
              key="client-sla"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Manifesto Card */}
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E5E7EB] relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAF7] border border-[#E5E7EB] text-[#0B5E1E] font-mono text-[10px] uppercase tracking-widest font-semibold mb-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0B5E1E]" />
                    <span>CLIENT : CO-FOUNDER COLLABORATION PROTOCOL</span>
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] mb-4 font-normal">
                    {CLIENT_PARTNERSHIP.concept}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#6B7280] mb-6 font-normal">
                    {CLIENT_PARTNERSHIP.narrative}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('contact')}
                    className="btn btn-primary"
                  >
                    <span>Request a collaboration call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Executive Founder Direct Client Commitments */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CLIENT_PARTNERSHIP.foundersCommitment.map((comm) => (
                  <div
                    key={comm.founderName}
                    className="p-6 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#0B5E1E] uppercase font-semibold mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#0B5E1E]" />
                        <span>Direct Interface</span>
                      </div>
                      <h4 className="font-display text-xl text-[#1A1A1A] mb-1 font-normal">
                        {comm.founderName}
                      </h4>
                      <p className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider mb-4">
                        {comm.founderRole}
                      </p>
                      <p className="text-xs leading-[1.7] text-[#6B7280] font-normal">
                        {comm.clientInterfaceRole}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4-Step Co-Creation Protocol */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#0B5E1E] mb-6 flex items-center gap-2 font-semibold">
                  <Activity className="w-4 h-4" />
                  <span>The 4-Step Enterprise Material Co-Creation Process</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CLIENT_PARTNERSHIP.coCreationSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-[#0B5E1E] font-bold">
                          [PHASE_{step.step}]
                        </span>
                        <span className="font-mono text-[10px] text-[#6B7280] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{step.timeline}</span>
                        </span>
                      </div>
                      <h5 className="font-display text-lg text-[#1A1A1A] mb-2 font-normal">{step.title}</h5>
                      <p className="text-xs leading-[1.65] text-[#6B7280] font-normal">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DESIGNER TEAM (5 SPECIALISTS INCL. BRUTALIST EXPERT) */}
          {activeTab === 'designers' && (
            <motion.div
              key="designers"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* FEATURED: The Brutalist Design Expert */}
              {DESIGNER_TEAM.filter((d) => d.isBrutalistExpert).map((expert) => (
                <div
                  key={expert.id}
                  className="p-8 sm:p-10 rounded-2xl bg-white border-2 border-[#0B5E1E] relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white bg-[#0B5E1E] px-2.5 py-1 rounded-full">
                          {expert.roleCode}
                        </span>
                        <span className="font-mono text-xs text-[#0B5E1E] tracking-widest uppercase flex items-center gap-1.5 font-semibold">
                          <Hammer className="w-3.5 h-3.5" />
                          <span>Specialist Spotlight: Brutal Design Architect</span>
                        </span>
                      </div>
                      <h3 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
                        {expert.name}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-wider text-[#6B7280] mt-1 font-medium">
                        {expert.role}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] text-right">
                      <span className="block font-mono text-[10px] text-[#6B7280] uppercase">Key Architectural Artifact</span>
                      <span className="font-sans text-xs text-[#1A1A1A] font-medium">{expert.keyArtifact}</span>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-[#0B5E1E] pl-4 py-1 italic font-display text-lg sm:text-xl text-[#1A1A1A] mb-6">
                    "{expert.statement}"
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB]">
                      <span className="block font-mono text-[10px] uppercase text-[#6B7280] font-medium mb-1">Architectural Specialty</span>
                      <p className="text-[#6B7280] leading-relaxed font-normal">{expert.specialty}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB]">
                      <span className="block font-mono text-[10px] uppercase text-[#6B7280] font-medium mb-1">Curatorial Background</span>
                      <p className="text-[#6B7280] leading-relaxed font-normal">{expert.background}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* The Other 4 Designers in a 4-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DESIGNER_TEAM.filter((d) => !d.isBrutalistExpert).map((designer) => (
                  <article
                    key={designer.id}
                    className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#0B5E1E]/50 transition-colors flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] text-[#0B5E1E] tracking-widest uppercase font-semibold">
                          {designer.roleCode}
                        </span>
                        <Palette className="w-3.5 h-3.5 text-[#6B7280]" />
                      </div>
                      <h4 className="font-display text-2xl text-[#1A1A1A] mb-1 font-normal">
                        {designer.name}
                      </h4>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#6B7280] mb-4 font-medium">
                        {designer.role}
                      </p>
                      <p className="text-xs leading-[1.65] text-[#6B7280] italic mb-4 font-normal">
                        "{designer.statement}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB] space-y-3 text-xs">
                      <div>
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] font-medium">Specialty Focus</span>
                        <p className="text-[#1A1A1A] text-[11.5px] leading-snug font-normal">{designer.specialty}</p>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] font-medium">Background</span>
                        <p className="text-[#6B7280] text-[11px] leading-snug font-normal">{designer.background}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: DEVELOPER TEAM */}
          {activeTab === 'developers' && (
            <motion.div
              key="developers"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {DEVELOPER_TEAM.map((dev) => (
                <article
                  key={dev.id}
                  className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#0B5E1E]/50 transition-colors flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] text-[#0B5E1E] tracking-widest uppercase font-semibold">
                        {dev.roleCode}
                      </span>
                      <Cpu className="w-3.5 h-3.5 text-[#6B7280]" />
                    </div>
                    <h4 className="font-display text-2xl text-[#1A1A1A] mb-1 font-normal">
                      {dev.name}
                    </h4>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#6B7280] mb-4 font-medium">
                      {dev.role}
                    </p>

                    <div className="mb-4">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] mb-1.5 font-medium">Production Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {dev.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-full bg-[#F8FAF7] border border-[#E5E7EB] text-[10px] font-mono text-[#0B5E1E] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] mb-1 font-medium">Specialty</span>
                      <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{dev.specialty}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[#0B5E1E] mb-1 font-semibold">Core Deliverable</span>
                    <p className="text-xs text-[#1A1A1A] leading-relaxed font-normal">{dev.keyContribution}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {/* TAB 5: TESTER TEAM */}
          {activeTab === 'testers' && (
            <motion.div
              key="testers"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTER_TEAM.map((tester) => (
                <article
                  key={tester.id}
                  className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#0B5E1E]/50 transition-colors flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] text-[#0B5E1E] tracking-widest uppercase font-semibold">
                        {tester.roleCode}
                      </span>
                      <FileCheck className="w-3.5 h-3.5 text-[#6B7280]" />
                    </div>
                    <h4 className="font-display text-2xl text-[#1A1A1A] mb-1 font-normal">
                      {tester.name}
                    </h4>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#6B7280] mb-4 font-medium">
                      {tester.role}
                    </p>

                    <div className="mb-4">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] mb-1 font-medium">Testing Protocol</span>
                      <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{tester.specialty}</p>
                    </div>

                    <div className="mb-4">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] mb-1 font-medium">Credentials &amp; Testing Lab</span>
                      <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{tester.background}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] bg-[#F8FAF7] -mx-6 -mb-6 p-6 rounded-b-2xl">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[#0B5E1E] mb-1 flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Empirical Validation Metric</span>
                    </span>
                    <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">{tester.validationMetric}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {/* TAB 6: RESEARCH TEAM */}
          {activeTab === 'research' && (
            <motion.div
              key="research"
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {RESEARCH_TEAM.map((res) => (
                <article
                  key={res.id}
                  className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#0B5E1E]/50 transition-colors flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] text-[#0B5E1E] tracking-widest uppercase font-semibold">
                        {res.roleCode}
                      </span>
                      <FlaskConical className="w-3.5 h-3.5 text-[#6B7280]" />
                    </div>
                    <h4 className="font-display text-2xl text-[#1A1A1A] mb-1 font-normal">
                      {res.name}
                    </h4>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#6B7280] mb-4 font-medium">
                      {res.role}
                    </p>

                    <div className="mb-4">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[#6B7280] mb-1 font-medium">Biological &amp; Chemical Domain</span>
                      <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{res.specialty}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] space-y-1.5">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[#0B5E1E] mb-1 font-semibold">Peer &amp; Institutional Credentials</span>
                    <ul className="space-y-1 text-xs text-[#1A1A1A] font-sans">
                      {res.credentials.map((cred) => (
                        <li key={cred} className="flex items-start gap-1.5 leading-snug font-normal">
                          <span className="text-[#0B5E1E] font-mono text-[9px] mt-0.5">▪</span>
                          <span>{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
