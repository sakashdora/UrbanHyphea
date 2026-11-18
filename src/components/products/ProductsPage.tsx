import { ProductHero } from './ProductHero';
import { ProductMission } from './ProductMission';
import { ProductCategories } from './ProductCategories';
import { ProductPrototypes } from './ProductPrototypes';
import { ProductNewsletter } from './ProductNewsletter';
import { ProductFooter } from './ProductFooter';

interface ProductsPageProps {
  onNavigate?: (pageId: string) => void;
  onInquireMaterial?: (materialId: string) => void;
}

export function ProductsPage({ onNavigate, onInquireMaterial }: ProductsPageProps) {
  const handleExplore = () => {
    const el = document.getElementById('product-categories');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = (categoryName: string) => {
    if (onInquireMaterial) {
      onInquireMaterial(categoryName.toLowerCase());
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div className="w-full bg-[#FAFAF7] text-[#1A1A1A] overflow-hidden">
      {/* SECTION 02 — HERO / PRODUCT INTRODUCTION */}
      <ProductHero onExploreClick={handleExplore} />

      {/* SECTION 03 — BRAND MISSION */}
      <ProductMission />

      {/* SECTION 04 — PRODUCT CATEGORIES */}
      <ProductCategories onLearnMoreClick={handleLearnMore} />

      {/* SECTION 04.5 — ORIGINAL PHYSICAL PROTOTYPES & ARTIFACTS */}
      <ProductPrototypes onInquire={handleLearnMore} />

      {/* SECTION 05 — NEWSLETTER / EARLY ACCESS */}
      <ProductNewsletter />

      {/* SECTION 06 — FOOTER */}
      <ProductFooter onNavigate={onNavigate} />
    </div>
  );
}
