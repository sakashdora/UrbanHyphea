import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, CheckCircle2, Copy, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from 'lucide-react';
import {
  buildInquiryConfirmation,
  validateInquiry,
  type InquiryFormInput,
  type InquiryInterest,
  type InquiryValidationErrors,
} from '../utils/inquiry';
import { SectionEyebrow } from './BrandMark';

interface ContactSectionProps {
  selectedInterest?: InquiryInterest;
}

export function ContactSection({ selectedInterest }: ContactSectionProps) {
  const prefersReduced = useReducedMotion();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<InquiryFormInput>({
    name: '',
    organization: '',
    email: '',
    interest: selectedInterest ?? 'bio-leather',
    message: '',
  });
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<{
    recipientName: string;
    topicLabel: string;
    summary: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (selectedInterest) {
      setForm((prev) => ({ ...prev, interest: selectedInterest }));
      setSubmittedSummary(null);
    }
  }, [selectedInterest]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateInquiry(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedSummary(buildInquiryConfirmation(form));
  };

  const handleReset = () => {
    setForm({
      name: '',
      organization: '',
      email: '',
      interest: 'bio-leather',
      message: '',
    });
    setErrors({});
    setSubmittedSummary(null);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#FAFAF7] border-t border-[#E5E7EB] relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Contact Info & Institutional Details */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <SectionEyebrow label="Get in Touch" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] leading-[1.04] tracking-[-0.015em] text-[#1A1A1A] mb-5">
              Let’s grow the future{' '}
              <span className="italic text-[#0B5E1E]">together.</span>
            </h2>
            <p className="text-base leading-[1.7] text-[#6B7280] max-w-[44ch] mb-8 font-normal">
              Whether you are an ethical fashion designer seeking bio-leather swatches, an enterprise evaluating compostable protective packaging, or an academic researcher, we welcome collaboration.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5 mb-8">
              {/* Email */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-between gap-3 group hover:border-[#0B5E1E]/40 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAF7] flex items-center justify-center text-[#0B5E1E] border border-[#E5E7EB]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#6B7280] font-medium">
                      Official Direct Email
                    </span>
                    <a
                      href="mailto:urbanhyphae@gmail.com"
                      className="text-sm font-semibold text-[#1A1A1A] hover:text-[#0B5E1E] transition-colors"
                    >
                      urbanhyphae@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('urbanhyphae@gmail.com', 'email')}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8FAF7] transition-colors"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-[#0B5E1E]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-between gap-3 group hover:border-[#0B5E1E]/40 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAF7] flex items-center justify-center text-[#0B5E1E] border border-[#E5E7EB]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#6B7280] font-medium">
                      Phone &amp; WhatsApp Helpline
                    </span>
                    <a
                      href="tel:+919439941804"
                      className="text-sm font-semibold text-[#1A1A1A] hover:text-[#0B5E1E] transition-colors font-mono"
                    >
                      +91 9439941804
                    </a>
                  </div>
                </div>
                <a
                  href="https://wa.me/919439941804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#0B5E1E] hover:bg-[#F8FAF7] transition-colors"
                  title="Chat on WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              {/* Registered Address */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] flex items-start justify-between gap-3 group hover:border-[#0B5E1E]/40 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAF7] flex items-center justify-center text-[#0B5E1E] border border-[#E5E7EB] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-[#6B7280] font-medium">
                      Corporate Registered Office
                    </span>
                    <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed mt-0.5">
                      Plot No. 804/2366, Kesura, Budheswari Colony / Koradakanta,
                      Bhubaneswar, Odisha – 751006, India
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('Plot No. 804/2366, Kesura, Budheswari Colony, Bhubaneswar, Odisha 751006, India', 'addr')}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8FAF7] transition-colors shrink-0"
                  title="Copy address"
                  aria-label="Copy address"
                >
                  {copiedKey === 'addr' ? <Check className="w-4 h-4 text-[#0B5E1E]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-xs text-[#6B7280] font-mono">
              Entity: Urban-Hyphae Bioscience Private Limited (CIN Reg. Dec 2023 · DPIIT DIPP159519)
            </div>
          </motion.div>

          {/* Right: Interactive Inquiry Form */}
          <motion.div
            id="contact-form"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          >
            {submittedSummary ? (
              <div className="py-8 text-center sm:text-left" role="status" aria-live="polite">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F8FAF7] border border-[#0B5E1E]/30 text-[#0B5E1E] mb-5 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7280] mb-2 font-medium">
                  Inquiry Received · {submittedSummary.topicLabel}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] mb-3 font-normal">
                  Thank you, {submittedSummary.recipientName}!
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#6B7280] max-w-xl mb-7 font-normal">
                  {submittedSummary.summary}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-primary"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="font-display text-2xl sm:text-[30px] text-[#1A1A1A] font-normal">
                    Material Request &amp; Partnership Inquiry
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#6B7280] mt-1 font-normal">
                    Fill out the form below to request swatch samples, evaluate custom packaging molds, or discuss agro-waste partnerships.
                  </p>
                </div>

                {/* Material Interest Radio / Buttons */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-[#0B5E1E] mb-2 font-mono">
                    Application / Material Interest *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'bio-leather', label: 'Mycelium Bio-Leather' },
                      { id: 'bio-thermocol', label: 'Bio-Thermocol Packaging' },
                      { id: 'general', label: 'General / Research' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, interest: item.id as InquiryInterest }))}
                        className={`min-h-[44px] px-3 rounded-xl border text-[13px] text-center font-medium transition-colors duration-200 ${
                          form.interest === item.id
                            ? 'bg-[#0B5E1E] text-white font-semibold border-[#0B5E1E] shadow-sm'
                            : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0B5E1E]/40 hover:text-[#1A1A1A]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-medium uppercase tracking-[0.1em] text-[#1A1A1A] mb-1.5 font-mono"
                    >
                      Your Full Name *
                    </label>
                    <input
                      ref={nameInputRef}
                      id="inquiry-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Aditi Sharma"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:outline-none focus:border-[#0B5E1E] focus:bg-white transition-colors"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-medium uppercase tracking-[0.1em] text-[#1A1A1A] mb-1.5 font-mono"
                    >
                      Email Address *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="name@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:outline-none focus:border-[#0B5E1E] focus:bg-white transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-org"
                    className="block text-xs font-medium uppercase tracking-[0.1em] text-[#1A1A1A] mb-1.5 font-mono"
                  >
                    Organization / Brand / Design Studio (Optional)
                  </label>
                  <input
                    id="inquiry-org"
                    type="text"
                    value={form.organization ?? ''}
                    onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                    placeholder="e.g. Sustainable Footwear Co."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:outline-none focus:border-[#0B5E1E] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-xs font-medium uppercase tracking-[0.1em] text-[#1A1A1A] mb-1.5 font-mono"
                  >
                    Project Details &amp; Specific Requirements *
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your target application, dimensions, timeline, or testing metrics..."
                    aria-invalid={Boolean(errors.message)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF7] border border-[#E5E7EB] text-sm text-[#1A1A1A] placeholder:text-[#6B7280]/60 focus:outline-none focus:border-[#0B5E1E] focus:bg-white transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-[11.5px] text-[#6B7280] font-normal">
                    We typically respond within 24–48 business hours with technical specifications.
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
