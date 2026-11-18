// Authentic Brand Logo
const logoUrbanHyphae = new URL('../assets/images/logo_urban_hyphae.jpg', import.meta.url).href;

// Authentic Founder Portraits
const founderVivek = new URL('../assets/images/founder_vivek_kumar_singh.png', import.meta.url).href;
const founderAdhiraj = new URL('../assets/images/founder_adhiraj_mohapatra.jpg', import.meta.url).href;
const founderDivyanshu = new URL('../assets/images/founder_divyanshu_dipta_khuntia.jpg', import.meta.url).href;
const teamInfographic = new URL('../assets/images/team_founders_infographic.jpg', import.meta.url).href;

// Authentic Real Products & Material Sheets
const productSandalWalletWatch = new URL('../assets/images/product_sandal_wallet_watch.jpg', import.meta.url).href;
const productMyceliumSandal = new URL('../assets/images/product_mycelium_sandal.jpg', import.meta.url).href;
const productMyceliumWallet = new URL('../assets/images/product_mycelium_wallet.jpg', import.meta.url).href;
const exhibitionMaterialSheets = new URL('../assets/images/exhibition_material_sheets_kurta.jpg', import.meta.url).href;
const productCategoryJackets = new URL('../assets/images/product_category_jackets.jpg', import.meta.url).href;
const productCategoryBags = new URL('../assets/images/product_category_bags.jpg', import.meta.url).href;
const productCategoryShoes = new URL('../assets/images/product_category_shoes.jpg', import.meta.url).href;

// Authentic Achievements & Conclave Photographs
const achievementFirstSheet = new URL('../assets/images/achievement_first_sheet_showcase.jpg', import.meta.url).href;
const achievementInaeConclave = new URL('../assets/images/achievement_inae_conclave.jpg', import.meta.url).href;
const achievementSrustiSparkAward = new URL('../assets/images/achievement_srusti_spark_award.jpg', import.meta.url).href;
const achievementPitchPresentation = new URL('../assets/images/achievement_pitch_presentation.jpg', import.meta.url).href;
const achievementBoothDelegation = new URL('../assets/images/achievement_booth_delegation.jpg', import.meta.url).href;
const achievementAdhirajSpeaking = new URL('../assets/images/achievement_adhiraj_speaking.jpg', import.meta.url).href;

// Environmental Context & Feedstock
const heroMushrooms = new URL('../assets/images/hero_oyster_mushrooms_1794677737087.jpg', import.meta.url).href;
const problemAgriWaste = new URL('../assets/images/problem_agricultural_waste_1794677736497.jpg', import.meta.url).href;
const problemLeather = new URL('../assets/images/problem_conventional_leather_1794677736432.jpg', import.meta.url).href;
const problemFoam = new URL('../assets/images/problem_petroleum_foam_1794677737042.jpg', import.meta.url).href;
const techMycelium = new URL('../assets/images/tech_mycelium_network_1794677737610.jpg', import.meta.url).href;
const circularForest = new URL('../assets/images/circular_forest_landscape_1794677738886.jpg', import.meta.url).href;
const aboutLab = new URL('../assets/images/about_biotech_lab_1794677739323.jpg', import.meta.url).href;
const materialBioThermocol = new URL('../assets/images/material_bio_thermocol_1794677738673.jpg', import.meta.url).href;

// Official Section Backgrounds from Client Design
const bgHeroSection = new URL('../assets/images/bg_hero_section.jpg', import.meta.url).href;
const bgMissionSection = new URL('../assets/images/bg_mission_section.jpg', import.meta.url).href;
const bgProductsSection = new URL('../assets/images/bg_products_section.jpg', import.meta.url).href;
const bgNewsletterSection = new URL('../assets/images/bg_newsletter_section.jpg', import.meta.url).href;
const bgFooterSection = new URL('../assets/images/bg_footer_section.jpg', import.meta.url).href;
const bgFullPage = new URL('../assets/images/bg_full_page.jpg', import.meta.url).href;

export const SITE_IMAGES = {
  // Brand Logo
  logoUrbanHyphae,

  // Founders
  founderVivek,
  founderAdhiraj,
  founderDivyanshu,
  teamInfographic,

  // Real Products & Materials
  productSandalWalletWatch,
  productMyceliumSandal,
  productMyceliumWallet,
  exhibitionMaterialSheets,
  productCategoryJackets,
  productCategoryBags,
  productCategoryShoes,

  // Achievements
  achievementFirstSheet,
  achievementInaeConclave,
  achievementSrustiSparkAward,
  achievementPitchPresentation,
  achievementBoothDelegation,
  achievementAdhirajSpeaking,

  // Context & Science
  heroMushrooms,
  problemAgriWaste,
  problemLeather,
  problemFoam,
  techMycelium,
  circularForest,
  aboutLab,
  materialBioThermocol,

  // Section Backgrounds
  bgHeroSection,
  bgMissionSection,
  bgProductsSection,
  bgNewsletterSection,
  bgFooterSection,
  bgFullPage,
} as const;
