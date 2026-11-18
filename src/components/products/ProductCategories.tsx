import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ArrowRight, Sparkles, X, Check, ShieldCheck } from 'lucide-react';
import { SITE_IMAGES } from '../../data/assets';

interface ProductCategoryItem {
  id: string;
  name: string;
  description: string;
  iconSymbol: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  details: string;
}

interface ProductCategoriesProps {
  onLearnMoreClick?: (categoryName: string) => void;
}

export function ProductCategories({ onLearnMoreClick }: ProductCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryItem | null>(null);

  const categories: ProductCategoryItem[] = [
    {
      id: 'jackets',
      name: 'Jackets',
      description: 'Stylish & sustainable outerwear',
      iconSymbol: '🧥',
      image: SITE_IMAGES.productCategoryJackets,
      features: ['Weather Resistant', 'Eco-Friendly', 'Durable'],
      specs: [
        { label: 'Tensile Strength', value: '18.4 MPa (ASTM D2209)' },
        { label: 'Tannage Chemistry', value: '0% Chromium / Formalin' },
        { label: 'Grain Texture', value: 'Embossed Mycelial Nappa' },
        { label: 'Biodegradability', value: '100% Home Compostable' },
      ],
      details:
        'Crafted from continuous solid-state mycelium sheets, our outerwear jackets deliver the tactile warmth, structured drape, and resilience of premium cowhide with zero animal slaughter and zero petrochemical coatings.',
    },
    {
      id: 'bags',
      name: 'Bags',
      description: 'Elegant & sustainable handbags',
      iconSymbol: '🎒',
      image: SITE_IMAGES.productCategoryBags,
      features: ['Premium Quality', 'Cruelty-Free', 'Stylish'],
      specs: [
        { label: 'Stitch Tear Resistance', value: '42 N/mm (ASTM D4704)' },
        { label: 'Water Contact Angle', value: '88° Natural Hydrophobicity' },
        { label: 'Hardware Compatibility', value: 'Riveted & Stitched Brass' },
        { label: 'Petroleum PU / PVC', value: '0% Plastic Film' },
      ],
      details:
        'Engineered for everyday utility and sophisticated silhouettes. Deep botanical forest green hue dyed with non-toxic earth pigments, featuring reinforced stress corners and organic cotton lining.',
    },
    {
      id: 'shoes',
      name: 'Shoes',
      description: 'Comfortable & sustainable footwear',
      iconSymbol: '👟',
      image: SITE_IMAGES.productCategoryShoes,
      features: ['Comfortable', 'Water Resistant'],
      specs: [
        { label: 'Flex Cycles (Bally)', value: '> 50,000 Repeated Flexes' },
        { label: 'Breathability', value: 'Natural Chitin Micro-Pores' },
        { label: 'Sole Bonding', value: 'Natural Latex & Mycelium Foam' },
        { label: 'Feedstock Base', value: 'Odisha Rice Crop Stubble' },
      ],
      details:
        'Ergonomic lifestyle footwear balancing athletic flexibility and luxury suede textures. Breathable cellular structure naturally regulates temperature while offering natural water resistance.',
    },
  ];

  const handleCardClick = (cat: ProductCategoryItem) => {
    setSelectedCategory(cat);
  };

  const handleModalInquiry = (cat: ProductCategoryItem) => {
    setSelectedCategory(null);
    onLearnMoreClick?.(cat.name);
  };

  return (
    <section
      id="product-categories"
      className="py-20 lg:py-28 bg-[#FAFAF7] bg-cover bg-center bg-no-repeat border-t border-[#E5E7EB] relative"
      style={{ backgroundImage: `url(${SITE_IMAGES.bgProductsSection})` }}
    >
      <div className="max-w-[1320px] mx-auto w-full px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#0B5E1E]/50" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0B5E1E]">
              OUR PRODUCTS
            </span>
            <span className="w-8 h-px bg-[#0B5E1E]/50" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-normal leading-[1.05] tracking-[-0.015em] text-[#1A1A1A]">
            Product <span className="italic text-[#0B5E1E] font-medium">Categories</span>
          </h2>
        </div>

        {/* Three Equally Sized Premium Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.article
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-[20px] overflow-hidden hover:border-[#0B5E1E]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              {/* Upper Image Area with Dark Gradient and Title */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAF7]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Subtle Dark Gradient at bottom of image for text readability */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
                />

                {/* Small Circular Icon Badge at top-left */}
                <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] flex items-center justify-center text-sm shadow-xs">
                  <span>{cat.iconSymbol}</span>
                </div>

                {/* White Product Title & Description over bottom of image */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="font-display text-2xl font-normal leading-tight drop-shadow-xs">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/90 font-light drop-shadow-xs mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Lower Card Area: Feature Pills & Footer */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                {/* Feature Tags in subtle green pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {cat.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#FAFAF7] text-[#5A7F3F] border border-[#E5E7EB]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Clean Footer: Availability status & CTA */}
                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0B5E1E] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#0B5E1E]" />
                    <span>Coming Soon</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCardClick(cat)}
                    className="btn btn-sm btn-outline group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Detailed Category Specification Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E5E7EB]"
            >
              {/* Header Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#F8FAF7]">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] flex items-center justify-center text-[#1A1A1A] hover:bg-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E5E7EB] text-xs font-mono text-[#0B5E1E] font-semibold">
                  {selectedCategory.iconSymbol} {selectedCategory.name} Specification
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-normal text-[#1A1A1A] mb-1">
                  {selectedCategory.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#0B5E1E] mb-3">
                  {selectedCategory.description}
                </p>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-5 font-normal">
                  {selectedCategory.details}
                </p>

                {/* Specs Table */}
                <div className="mb-6 border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="px-3.5 py-1.5 bg-[#F8FAF7] border-b border-[#E5E7EB] font-mono text-[10px] text-[#6B7280] uppercase tracking-wider">
                    Performance Standards
                  </div>
                  <div className="divide-y divide-[#E5E7EB]">
                    {selectedCategory.specs.map((s) => (
                      <div key={s.label} className="grid grid-cols-2 px-3.5 py-2 text-xs font-mono">
                        <span className="text-[#6B7280]">{s.label}</span>
                        <span className="text-[#1A1A1A] font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className="btn btn-sm btn-ghost"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModalInquiry(selectedCategory)}
                    className="btn btn-sm btn-primary"
                  >
                    Notify me when available
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
