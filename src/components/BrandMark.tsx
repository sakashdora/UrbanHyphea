import { useState } from 'react';
import { Sprout } from 'lucide-react';
import { SITE_IMAGES } from '../data/assets';

interface LogoProps {
  className?: string;
  showSubtext?: boolean;
}

export function UrbanHyphaeLogo({ className = '', showSubtext = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      {/* Authentic Brand Logo Image */}
      <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-[#e5e7eb] shadow-sm flex items-center justify-center bg-white transition-transform duration-200 group-hover:scale-105">
        <img
          src={SITE_IMAGES.logoUrbanHyphae}
          alt="Urban Hyphae Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <span className="flex flex-col leading-none">
        <span className="font-display text-lg md:text-[21px] font-bold tracking-[0.08em] text-[#0b5e1e] uppercase whitespace-nowrap">
          Urban Hyphae
        </span>
        {showSubtext && (
          <span className="font-mono text-[9px] md:text-[9.5px] tracking-[0.16em] text-[#6b7280] uppercase mt-1 whitespace-nowrap">
            Bioscience Pvt. Ltd.
          </span>
        )}
      </span>
    </span>
  );
}

interface SectionEyebrowProps {
  label: string;
  tone?: 'primary' | 'muted';
  withTrailingLine?: boolean;
}

export function SectionEyebrow({
  label,
  tone = 'primary',
  withTrailingLine = false,
}: SectionEyebrowProps) {
  const textColor = tone === 'primary' ? 'text-[#0b5e1e]' : 'text-[#6b7280]';
  const lineColor = 'bg-[#0b5e1e]/40';

  return (
    <div className="inline-flex items-center gap-3 mb-3">
      <span className={`w-6 h-px ${lineColor}`} aria-hidden="true" />
      <span
        className={`font-sans text-[11px] font-bold tracking-[0.2em] uppercase ${textColor}`}
      >
        {label}
      </span>
      {withTrailingLine && <span className={`w-6 h-px ${lineColor}`} aria-hidden="true" />}
    </div>
  );
}

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
}

export function MediaImage({ src, alt, className = '', lazy = true }: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#f8faf7] text-[#6b7280] p-6 text-center border border-[#e5e7eb] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sprout className="w-8 h-8 mb-2 opacity-70 text-[#0b5e1e]" strokeWidth={1.5} />
        <span className="text-xs text-[#6b7280] max-w-[20ch] leading-relaxed">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
