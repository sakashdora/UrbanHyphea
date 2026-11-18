import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { SITE_IMAGES } from '../../data/assets';

export function ProductNewsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  const benefits = ['Early Access', 'Launch Updates', 'Special Offers'];

  return (
    <section className="py-16 lg:py-24 bg-[#FAFAF7] border-t border-[#E5E7EB] relative">
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#0B5E1E] bg-cover bg-left sm:bg-center bg-no-repeat text-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl p-8 sm:p-12 lg:p-14"
          style={{ backgroundImage: `url(${SITE_IMAGES.bgNewsletterSection})` }}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#A7C957]/15 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-10 w-[350px] h-[350px] rounded-full bg-white/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Natural Mushroom Cluster Photography */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-black/20 shrink-0 group">
                <img
                  src={SITE_IMAGES.heroMushrooms}
                  alt="Natural oyster mushroom cluster on living moss"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                />
              </div>
            </div>

            {/* Middle Column: Heading & Description */}
            <div className="lg:col-span-5 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-[#A7C957]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A7C957]">
                  STAY AHEAD
                </span>
                <span className="w-6 h-px bg-[#A7C957]" />
              </div>

              {/* Main Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.08] tracking-tight text-white mb-3">
                Be the <span className="italic text-[#A7C957] font-medium">First</span> to Know
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-white/85 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                Get exclusive updates, early access, and special launch offers when our products are ready.
              </p>
            </div>

            {/* Right Column: Interactive Email Subscription Form & Benefits */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              {isSubscribed ? (
                <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-white">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1 text-[#A7C957]">
                    <Check className="w-4 h-4" />
                    <span>You're on the early access list!</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    We will notify you first when our cultivated mycelium jackets, bags, and shoes launch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 rounded-full p-2 bg-white border border-white/40 shadow-lg">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email address"
                      aria-label="Enter your email address"
                      className="w-full px-5 py-3 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#6B7280] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary shrink-0"
                    >
                      <span>Notify Me</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  {error && <p className="text-xs text-red-200 pl-3">{error}</p>}

                  {/* Privacy Information */}
                  <p className="text-[11px] text-white/75 flex items-center justify-center lg:justify-start gap-1.5 pl-1 font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A7C957]" />
                    <span>We respect your privacy. Unsubscribe at any time.</span>
                  </p>
                </form>
              )}

              {/* Three Benefits */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 mt-5 text-[11px] font-mono text-white/90">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#A7C957]" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
