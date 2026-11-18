import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, Sparkles, X } from 'lucide-react';
import { PHYSICAL_PRODUCTS, type PhysicalProduct } from '../data/biomaterials';
import { SectionEyebrow } from './BrandMark';

interface MaterialsSectionProps {
  onInquireMaterial?: (materialId: string) => void;
}

export function MaterialsSection({ onInquireMaterial }: MaterialsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<PhysicalProduct | null>(null);

  const handleInquire = (prod: PhysicalProduct) => {
    setSelectedProduct(null);
    onInquireMaterial?.(prod.id);
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#fafaf7] border-b border-[#e5e7eb] relative">
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <SectionEyebrow label="Physical Prototypes & Commercial Products" />
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] mb-4">
            Real Products. Proven <span className="italic text-[#0b5e1e]">Strength.</span>
          </h2>
          <p className="text-base sm:text-lg leading-[1.65] text-[#6b7280]">
            Genuine consumer goods fabricated from our cultivated mycelium sheets—demonstrated live at national technology conclaves and state exhibitions.
          </p>
        </div>

        {/* 4-Item Luxury Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PHYSICAL_PRODUCTS.map((prod, idx) => (
            <motion.article
              key={prod.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:border-[#0b5e1e]/60 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f8faf7]">
                <img
                  src={prod.image}
                  alt={prod.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#e5e7eb] text-[11px] font-mono text-[#0b5e1e] shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#0b5e1e]" />
                  <span>{prod.badge}</span>
                </div>

                <div className="absolute top-4 right-4 text-xs font-mono text-[#6b7280] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#e5e7eb]">
                  [0{idx + 1}]
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#0b5e1e] uppercase tracking-wider mb-2 font-semibold">
                    {prod.category}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1a1a1a] mb-2">
                    {prod.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6b7280] mb-6">
                    {prod.description}
                  </p>

                  {/* Technical Specs 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-[#f8faf7] border border-[#e5e7eb]">
                    {prod.specs.map((spec) => (
                      <div key={spec.label}>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#6b7280]">
                          {spec.label}
                        </p>
                        <p className="text-xs font-semibold text-[#1a1a1a] font-mono mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#e5e7eb] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(prod)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6b7280] hover:text-[#0b5e1e] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0b5e1e]" />
                    <span>View Technical Dossier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInquire(prod)}
                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#0b5e1e] hover:bg-[#084817] text-white text-xs font-medium transition-all shadow-xs"
                  >
                    <span>Request Swatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Technical Specimen Lightbox Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-3xl bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb] bg-[#fafaf7]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0b5e1e]" />
                <span className="font-mono text-xs text-[#0b5e1e] uppercase tracking-wider font-semibold">
                  Technical Specimen File · {selectedProduct.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-[#f8faf7]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e5e7eb] font-mono text-xs text-[#0b5e1e] font-semibold">
                {selectedProduct.badge}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-3xl font-normal text-[#1a1a1a] mb-1">
                {selectedProduct.name}
              </h3>
              <p className="text-sm font-mono text-[#0b5e1e] mb-4">
                {selectedProduct.tagline}
              </p>
              <p className="text-sm leading-relaxed text-[#6b7280] mb-6">
                {selectedProduct.description}
              </p>

              {/* Full Specs Table */}
              <div className="mb-8 border border-[#e5e7eb] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-[#f8faf7] border-b border-[#e5e7eb] font-mono text-xs text-[#6b7280] uppercase">
                  ASTM &amp; ISO Performance Calibration Metrics
                </div>
                <div className="divide-y divide-[#e5e7eb]">
                  {selectedProduct.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-2 px-4 py-3 text-xs font-mono">
                      <span className="text-[#6b7280]">{s.label}</span>
                      <span className="text-[#1a1a1a] font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e5e7eb] justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-2.5 rounded-full border border-[#e5e7eb] text-xs font-mono text-[#6b7280] hover:text-[#1a1a1a]"
                >
                  Close Dossier
                </button>
                <button
                  type="button"
                  onClick={() => handleInquire(selectedProduct)}
                  className="px-6 py-2.5 rounded-full bg-[#0b5e1e] text-white font-mono text-xs font-semibold hover:bg-[#084817] transition-colors"
                >
                  Request Material Swatch Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
