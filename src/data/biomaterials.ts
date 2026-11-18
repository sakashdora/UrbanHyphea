import { SITE_IMAGES } from './assets';
import type { MaterialPropertyItem } from '../utils/inquiry';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'specimen', label: 'Specimen 3D', href: '#specimen' },
  { id: 'story', label: 'Challenge', href: '#story' },
  { id: 'technology', label: 'Technology', href: '#technology' },
  { id: 'materials', label: 'Products', href: '#materials' },
  { id: 'comparison', label: 'Comparison', href: '#comparison' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'founders', label: 'Team', href: '#founders' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export interface ProblemCardData {
  id: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  impactNote: string;
  image: string;
  imageAlt: string;
  iconType: 'leaf' | 'paw' | 'recycle';
}

export const PROBLEM_CARDS: ProblemCardData[] = [
  {
    id: 'agricultural-waste',
    title: 'Agricultural Waste',
    stat: '~350M MT',
    statLabel: 'Annual Crop Residue in India (ICAR)',
    description:
      'Massive seasonal straw burning chokes skies and damages soil biodiversity. We purchase residue directly from farmers as raw bio-feedstock.',
    impactNote: 'Supplementary farmer revenue + zero field stubble burning',
    image: SITE_IMAGES.problemAgriWaste,
    imageAlt: 'Golden agricultural rice straw feedstock',
    iconType: 'leaf',
  },
  {
    id: 'conventional-leather',
    title: 'Tannery Toxins',
    stat: '600K Tons',
    statLabel: 'Tannery Solid & Chemical Waste Yearly',
    description:
      'Animal leather consumes thousands of liters of fresh water and releases carcinogenic chromium. We produce pure fungal sheets with zero animal harm.',
    impactNote: '100% cruelty-free & zero carcinogenic chromium effluent',
    image: SITE_IMAGES.problemLeather,
    imageAlt: 'Conventional tanned leather folds',
    iconType: 'paw',
  },
  {
    id: 'petroleum-materials',
    title: 'Persistent Plastics',
    stat: '500+ Yrs',
    statLabel: 'Persistence of Polystyrene Foam',
    description:
      'Petroleum foam and synthetic PU persist for centuries, shedding microplastics. Our myco-composites return 100% to soil as fertile compost in weeks.',
    impactNote: '100% home compostable in 45–60 days with zero microplastics',
    image: SITE_IMAGES.problemFoam,
    imageAlt: 'Petroleum expanded packaging foam',
    iconType: 'recycle',
  },
];

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  metrics: { label: string; value: string }[];
}

export const TECHNOLOGY_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Straw Upcycling',
    subtitle: 'Sourcing & Substrate Prep',
    description: 'We purchase crop straw directly from rural farming belts, eliminating stubble burning while providing supplementary rural income.',
    detail: 'Paddy straw and agricultural residues are procured directly from regional farmers, pasteurized, and prepared as nutrient-rich substrate beds.',
    metrics: [
      { label: 'Raw Feedstock', value: '100% Regional Crop Residue' },
      { label: 'Rural Impact', value: 'Supplementary Farmer Income' },
    ],
  },
  {
    step: '02',
    title: 'PSAWL Inoculation',
    subtitle: 'Controlled Solid-State Growth',
    description: 'Inside climate-controlled bio-chambers, mycelium colonizes our proprietary PSAWL growth media under sterile, zero-hazard conditions.',
    detail: 'Fungal mycelium colonizes our proprietary PSAWL growth media in sterile chambers, growing rapidly without toxic chemicals or volatile emissions.',
    metrics: [
      { label: 'Growth Media', value: 'Proprietary PSAWL Matrix' },
      { label: 'Cycle Time', value: '12–18 Days (vs 2–3 yrs for cattle)' },
    ],
  },
  {
    step: '03',
    title: 'Chitin Polymer Matrix',
    subtitle: 'Biological Netting Formation',
    description: 'Interwoven fungal hyphae naturally synthesize chitin and glucan, delivering the tear strength and flexibility of animal hides.',
    detail: 'Microscopic hyphal threads self-assemble into an interwoven 3D chitin network, replicating the tensile elasticity of mammalian skin.',
    metrics: [
      { label: 'Fiber Matrix', value: 'Chitin-Glucan Polymer Netting' },
      { label: 'Safety', value: 'Zero Heavy Metals & Zero Chrome' },
    ],
  },
  {
    step: '04',
    title: 'Closed-Loop Circularity',
    subtitle: 'Soil-to-Soil Regeneration',
    description: 'Finished biomaterials serve fashion and packaging. At end-of-life, all spent substrates return to the earth as organic compost.',
    detail: 'Finished bio-leather and molded bio-thermocol serve commercial products. When retired, all material breaks down into nutrient-rich organic soil.',
    metrics: [
      { label: 'Compostability', value: '100% Backyard Soil Degradable' },
      { label: 'Degradation', value: '45–60 Days to Organic Humus' },
    ],
  },
];

export interface MaterialShowcaseItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  imageAlt: string;
  developmentStatus: string;
  feedstock: string;
  targetApplications: string[];
  keySpecs: { label: string; value: string }[];
  researchFocus: string;
  environmentalBenefit: string;
}

export const MATERIAL_INNOVATIONS: MaterialShowcaseItem[] = [
  {
    id: 'mycelium-bio-leather',
    category: 'Commercial Products Showcase',
    title: 'Mycelium Bio-Leather & Goods',
    tagline: 'Chitin-Reinforced Fungal Matrix',
    summary:
      'Real fabricated footwear, stitched wallets, watch straps, and garment trims created from Urban Hyphae’s cultivated mycelium leather.',
    image: SITE_IMAGES.productSandalWalletWatch,
    imageAlt: 'Authentic Urban Hyphae mushroom leather sandal, wallet, and watch strap on display',
    developmentStatus: 'Fabricated & Showcased at Conclaves',
    feedstock: 'Agricultural crop residues bound by pure fungal mycelium networks',
    targetApplications: ['Footwear & sandals', 'Stitched luxury wallets', 'Watch straps', 'Garment & kurta trims'],
    keySpecs: [
      { label: 'Demonstrated Products', value: 'Functional UH Sandal, Hand-Stitched Wallet, Watch Strap' },
      { label: 'DPIIT Recognition', value: 'DPIIT-Recognized Startup | No. DIPP159519' },
      { label: 'Finishing', value: 'Natural embossing, dye uptake & water resistance' },
      { label: 'Safety', value: '100% Cruelty-Free & Zero Carcinogenic Chromium' },
    ],
    researchFocus:
      'Demonstrated physical prototypes proving tensile flexibility, wearable comfort, and high-strength stitchability on real consumer items.',
    environmentalBenefit: 'Eliminates animal cattle dependence, saving 17,000L of water per kg.',
  },
  {
    id: 'exhibition-material-sheets',
    category: 'Full-Scale Cultivated Sheets',
    title: 'First-Ever Cultivated Bio-Sheets',
    tagline: 'Solid-State Agricultural Upcycling',
    summary:
      'Large raw cultivated fungal biomaterial sheets and apparel integrations demonstrated at national technology conclaves and state exhibitions.',
    image: SITE_IMAGES.exhibitionMaterialSheets,
    imageAlt: 'Display of full-scale cultivated mycelium sheets, Odisha cultural motif, and linen kurta with bio-leather trim',
    developmentStatus: 'Scale Cultivation Validated',
    feedstock: 'Paddy straw and milling residues colonized by mycelium in Bhubaneswar',
    targetApplications: [
      'Apparel collars, plackets & pocket trims',
      'Protective molded packaging inserts',
      'Artistic cultural emblems & framed sheets',
    ],
    keySpecs: [
      { label: 'Cultivation Milestone', value: 'First Sheet Cultivated 5th July 2026, Bhubaneswar' },
      { label: 'Apparel Application', value: 'Linen Kurta with Integrated Mycelium Collar & Trim' },
      { label: 'Degradation', value: '100% Home Compostable within 45–60 Days' },
      { label: 'Weight Profile', value: 'Lightweight, tear-resistant biological composite' },
    ],
    researchFocus:
      'Continuous batch scaling of large unbroken mycelium mats for industrial textile and packaging conversion.',
    environmentalBenefit: 'Turns burning agricultural stubble into valuable industrial materials.',
  },
];

export const MATERIAL_COMPARISON_DATA = [
  {
    parameter: 'Raw Feedstock',
    animalLeather: 'Livestock cattle hides',
    syntheticLeather: 'Fossil petroleum (PU/PVC)',
    urbanHyphaeLeather: 'Agro-residues + living mycelium',
  },
  {
    parameter: 'Production Cycle',
    animalLeather: '2 to 3 years',
    syntheticLeather: 'Hours (chemical refining)',
    urbanHyphaeLeather: '12 to 18 days (bio-chamber)',
  },
  {
    parameter: 'Toxic Chemistry',
    animalLeather: 'Carcinogenic chromium & formalin',
    syntheticLeather: 'Phthalates & volatile VOCs',
    urbanHyphaeLeather: 'Zero toxic salts; biological media',
  },
  {
    parameter: 'End-of-Life',
    animalLeather: '50+ years (chemical resistance)',
    syntheticLeather: '500+ years (microplastics)',
    urbanHyphaeLeather: '100% soil compost in 45–60 days',
  },
  {
    parameter: 'Water Consumption',
    animalLeather: '17,000+ L / kg of hide',
    syntheticLeather: 'High chemical effluent',
    urbanHyphaeLeather: 'Minimal closed-loop hydration',
  },
  {
    parameter: 'Community Impact',
    animalLeather: 'Severe tannery health hazards',
    syntheticLeather: 'Refinery emissions',
    urbanHyphaeLeather: 'Direct farmer income from crop waste',
  },
];

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  credentials: string[];
  image: string;
  linkedinUrl?: string;
}

export const FOUNDERS: FounderProfile[] = [
  {
    id: 'adhiraj-mohapatra',
    name: 'Adhiraj Mohapatra',
    role: 'Founder & CEO',
    department: 'Strategy & Plant Pathology',
    bio: 'Founder of Urban Hyphae. Agricultural scientist driving mycelium strain research, patent filings, and presidential innovation delegations.',
    credentials: [
      'BSc. (Hons.) Agriculture – Sri Sri University',
      'MSc. Agriculture Plant Pathology (SOA)',
      'Young Professional – National Rice Research Institute',
      'Ex-FO (UPL Ltd.)',
    ],
    image: SITE_IMAGES.founderAdhiraj,
    linkedinUrl: 'https://www.linkedin.com/in/adhiraj-mohapatra-66b87a1a6/',
  },
  {
    id: 'vivek-kumar-singh',
    name: 'Vivek Kumar Singh',
    role: 'Director & CMO',
    department: 'Commercial & Brand Growth',
    bio: 'Directs brand positioning, commercial go-to-market alliances, corporate partnerships, and presentation delegations across national tech conclaves.',
    credentials: [
      'B. Com (Hons.) – Calcutta University',
      'MBA – Sri Sri University',
      'E-PGDC IIM-Visakhapatnam (Digital Marketing & Growth)',
      'Marketing Manager Yellow Lop',
    ],
    image: SITE_IMAGES.founderVivek,
    linkedinUrl: 'https://www.linkedin.com/in/vivekkumarsingh03',
  },
  {
    id: 'divyanshu-dipta-khuntia',
    name: 'Divyanshu Dipta Khuntia',
    role: 'Co-Founder & Bio-Fabrication Lead',
    department: 'Agribusiness & Engineering',
    bio: 'Directs solid-state fermentation kinetics, agricultural biomass logistics, and commercial bio-composite characterization.',
    credentials: [
      'BSc. (Hons.) Agriculture – SOA University',
      'MBA Agribusiness – Utkal University',
      'TSM Nagarjuna Fertilizers',
      'Lead Myco-Composite Formulation',
    ],
    image: SITE_IMAGES.founderDivyanshu,
    linkedinUrl: 'https://www.linkedin.com/company/urban-hyphae-bioscience',
  },
];

export interface DesignerProfile {
  id: string;
  name: string;
  role: string;
  roleCode: string;
  specialty: string;
  background: string;
  statement: string;
  keyArtifact: string;
  isBrutalistExpert?: boolean;
}

export const DESIGNER_TEAM: DesignerProfile[] = [
  {
    id: 'kaelen-vance',
    name: 'Kaelen Vance',
    role: 'Lead Brutalist Architect & Spatial Bio-Designer',
    roleCode: '[DES_01 / BRUTAL_EXPERT]',
    specialty: 'Monolithic Mycelium Masonry, Raw Concrete-Hyphae Composite Interfaces, Load-Bearing Myco-Scaffolding, Brutalist Pavilion Architecture',
    background: 'AA School of Architecture (London), Former Senior Bio-Spatial Designer at Foster+Partners Earth Bio-Lab',
    statement: 'Brutalism is honesty in materials. By exposing raw fungal hyphae as structural load-bearing mass rather than cosmetic veneer, we bring living architectural monoliths to our cities.',
    keyArtifact: 'The Urban Hyphae Brutalist Bio-Acoustic Wall Monolith (NRC 0.88, zero-resin binder)',
    isBrutalistExpert: true,
  },
  {
    id: 'maya-sen-gupta',
    name: 'Maya Sen-Gupta',
    role: 'Bio-Material CMF & Tactile Finish Lead',
    roleCode: '[DES_02 / CMF_LEAD]',
    specialty: 'Organic Grain Emulation, Botanical Dye Absorption Kinetics, Tactile Micro-Texture Curation, Zero-Formalin Finishing',
    background: 'National Institute of Design (NID Ahmedabad) / Royal College of Art (RCA) Textile Futures MA',
    statement: 'The velvety tactile hand-feel of Pleurotus pileus cuticle translates into luxury leather goods that age with organic grace and zero synthetic plasticizers.',
    keyArtifact: 'Botanical Indigo & Madder-Dyed Mycelium Swatch Portfolio',
  },
  {
    id: 'lucas-moreau',
    name: 'Lucas Moreau',
    role: 'Circular Footwear Architect & Ergonomics Specialist',
    roleCode: '[DES_03 / FOOTWEAR]',
    specialty: 'Last Engineering, Zero-Cement Stitch Construction, Hyphal Upper Flex Optimization, Mechanical Creep Resistance',
    background: 'ENSCI-Les Ateliers (Paris), Ex-Camper Footwear Innovation Lab Lead',
    statement: 'Footwear is the ultimate gauntlet for biomaterials. Our mycelium sandal upper withstands high-stress gait flex cycles while remaining 100% soil-compostable.',
    keyArtifact: 'The UH Wearable Myco-Sandal Upper (Demonstrated at national conclaves)',
  },
  {
    id: 'ananya-roy-choudhury',
    name: 'Ananya Roy Choudhury',
    role: 'Luxury Leathercraft & Precision Goods Artisan',
    roleCode: '[DES_04 / LEATHERCRAFT]',
    specialty: 'Saddle Stitching, Edge Burnishing with Natural Starches, Embossed Micro-Seals, Pocket Goods Tolerances',
    background: 'London College of Fashion (MA Fashion Artefact), Hermès Heritage Craft Atelier Fellow',
    statement: 'A luxury product is defined by edge precision. Working with Urban Hyphae sheets allows true saddle-stitching without fraying or delamination.',
    keyArtifact: 'Hand-Stitched Mycelium Pocket Bifold & Watch Band with Embossed Seal',
  },
  {
    id: 'devin-thorne',
    name: 'Devin Thorne',
    role: 'Computational Morphogenesis & Generative UI Designer',
    roleCode: '[DES_05 / COMPUTATIONAL]',
    specialty: 'Hyphal Growth Pattern Algorithms, Parametric Surface Texture Generation, Interactive 3D Web Systems, Brutalist Typography Layouts',
    background: 'MIT Media Lab / NYU ITP, Senior Interactive Designer at Pentagram',
    statement: 'We map fungal reaction-diffusion math directly into visual layouts, marrying brutalist architectural grids with organic biological motion.',
    keyArtifact: 'Procedural 3D Mushroom Web Showcase & Interactive Hyphal Growth Canvas',
  },
];

export interface DeveloperProfile {
  id: string;
  name: string;
  role: string;
  roleCode: string;
  specialty: string;
  stack: string[];
  keyContribution: string;
}

export const DEVELOPER_TEAM: DeveloperProfile[] = [
  {
    id: 'arjun-rath',
    name: 'Arjun Rath',
    role: 'Lead Creative Technologist & 3D WebGL Shaders',
    roleCode: '[DEV_01 / WEBGL_LEAD]',
    specialty: 'Procedural BufferGeometry Generation, Three.js Custom Shaders, Scroll-Driven Transform Choreography, WebGL Fallback Pipelines',
    stack: ['Three.js', 'GLSL', 'WebGL2', 'React 19', 'TypeScript'],
    keyContribution: 'Engineered the procedural oyster mushroom cap, decurrent gill lamellae, and stipe geometry generating 60fps real-time renders across mobile and desktop.',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Full-Stack Systems & Enterprise Platform Architect',
    roleCode: '[DEV_02 / ARCHITECT]',
    specialty: 'High-Throughput Headless Web Infrastructure, Secure B2B Partnership Ingestion, ISO-27001 Pipeline Security, Core Web Vitals Optimization',
    stack: ['Vite', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'Node.js'],
    keyContribution: 'Architected the zero-lag responsive showcase with instant mailto draft generation, sub-700ms production builds, and sub-second dynamic imports.',
  },
  {
    id: 'tariq-al-mansoor',
    name: 'Tariq Al-Mansoor',
    role: 'Computational Bio-Simulation Engineer',
    roleCode: '[DEV_03 / BIO_COMP]',
    specialty: 'Solid-State Growth Modeling, Differential Growth Mathematics, Hyphal Branching Logic, Substrate Nutrient Diffusion Simulation',
    stack: ['Python', 'WebAssembly', 'C++', 'Three.js'],
    keyContribution: 'Built the digital twin model simulating 12-to-18 day solid-state PSAWL fermentation kinetics to predict material density.',
  },
];

export interface TesterProfile {
  id: string;
  name: string;
  role: string;
  roleCode: string;
  specialty: string;
  background: string;
  validationMetric: string;
}

export const TESTER_TEAM: TesterProfile[] = [
  {
    id: 'rohan-deshmukh',
    name: 'Rohan Deshmukh',
    role: 'Lead Mechanical & Tensile ASTM Bio-Material Testing Specialist',
    roleCode: '[TEST_01 / ASTM_QA]',
    specialty: 'ASTM D2209 Tensile Strength Testing, Bally Flexometer Endurance (>50,000 continuous flex cycles), Taber Abrasion H-18, Martindale Rub Rating',
    background: 'Indian Institute of Packaging (IIP) / Central Leather Research Institute (CLRI) Senior Evaluator',
    validationMetric: 'Proved Urban Hyphae bio-leather achieves 18.4 MPa tensile strength with zero delamination after 35,000 flex repetitions.',
  },
  {
    id: 'priya-nambiar',
    name: 'Priya Nambiar',
    role: 'Digital QA, Cross-Device Accessibility & 60fps Performance Lead',
    roleCode: '[TEST_02 / DIGITAL_QA]',
    specialty: 'Cross-Browser WebGL Stress Testing (iOS Safari, Android Chrome, Windows Chromium, Firefox), WCAG 2.1 AA Accessibility Auditing, Screen Reader Testing, Reduced-Motion Compliance',
    background: 'Ex-Lead Performance Engineer at ThoughtWorks, W3C Web Accessibility Initiative Contributor',
    validationMetric: 'Maintained 100% test pass rate across Node test suites, 0 tsc lint errors, and seamless fallback to photorealistic imagery on software-rendered GPUs.',
  },
  {
    id: 'dr-sandeep-patnaik',
    name: 'Dr. Sandeep Patnaik',
    role: 'Biodegradation Kinetics & Soil Humus QA Analyst',
    roleCode: '[TEST_03 / ECO_QA]',
    specialty: 'ISO 14855 / ASTM D5338 Soil Compostability Protocols, Heavy Metal Ecotoxicity Screening, Zero-Microplastic Mass Spectrometry',
    background: 'PhD Environmental Toxicology (Utkal University), Senior Consultant at Odisha State Pollution Control Board Lab',
    validationMetric: 'Verified 100% soil breakdown into nutrient humus within 45–60 days with zero toxic effluent or persistent residues.',
  },
];

export interface ResearcherProfile {
  id: string;
  name: string;
  role: string;
  roleCode: string;
  specialty: string;
  credentials: string[];
}

export const RESEARCH_TEAM: ResearcherProfile[] = [
  {
    id: 'dr-meenakshi-sundaram',
    name: 'Dr. Meenakshi Sundaram',
    role: 'Principal Mycologist & Fungal Strain Geneticist',
    roleCode: '[RES_01 / MYCOLOGY]',
    specialty: 'Pleurotus ostreatus Strain Selective Cultivation, High-Density Hyphal Branching Kinetics, Sterile Solid-State Chamber Controls',
    credentials: [
      'PhD in Molecular Mycology – CFTRI Mysore',
      'Postdoctoral Fellow at Wageningen Fungal Biodiversity Institute',
      'Author of 14 peer-reviewed publications on Basidiomycete cultivation',
    ],
  },
  {
    id: 'dr-arvind-barik',
    name: 'Dr. Arvind Barik',
    role: 'Biopolymer Chemist & Chitin-Glucan Matrix Lead',
    roleCode: '[RES_02 / POLYMER]',
    specialty: 'Chitin-Glucan Cross-Linking Chemistry, Vegetable Polysaccharide Plasticization, Hydrophobic Barrier Formulation',
    credentials: [
      'PhD in Polymer Chemistry – IIT Kharagpur',
      'Ex-Senior Researcher at CSIR-IMMT (Institute of Minerals & Materials Technology)',
      'Lead inventor on 2 patent-pending bio-composite plasticization formulations',
    ],
  },
  {
    id: 'rashmi-rekha-parida',
    name: 'Rashmi Rekha Parida',
    role: 'Agro-Waste Valorization & Substrate Agronomist',
    roleCode: '[RES_03 / AGRONOMY]',
    specialty: 'Crop Residue (Paddy Straw) Lignocellulose Fractionation, Regional Farmer Cooperative Logistics, PSAWL Liquid Growth Nutrient Optimization',
    credentials: [
      'MSc. Agronomy – OUAT Bhubaneswar',
      'Field Agronomist for ICAR Stubble Management Pilot',
      'Pioneered the direct-purchase farmer network in rural coastal Odisha',
    ],
  },
];

export interface ClientPartnershipData {
  title: string;
  subtitle: string;
  concept: string;
  narrative: string;
  foundersCommitment: {
    founderName: string;
    founderRole: string;
    clientInterfaceRole: string;
  }[];
  coCreationSteps: {
    step: string;
    title: string;
    description: string;
    timeline: string;
  }[];
}

export const CLIENT_PARTNERSHIP: ClientPartnershipData = {
  title: 'Client : Co-Founder Partnership Portal',
  subtitle: 'Direct Scientific Collaboration for Enterprise Innovators',
  concept: 'Where Visionary Enterprise Clients Meet Scientific Co-Founders',
  narrative:
    'At Urban Hyphae, client relationships bypass impersonal sales intermediaries. Luxury fashion houses, tier-1 footwear brands, and industrial packaging innovators collaborate directly with our three founding scientists and executive directors from initial tensile scoping to commercial pilot fulfillment.',
  foundersCommitment: [
    {
      founderName: 'Adhiraj Mohapatra',
      founderRole: 'Founder & CEO (Strategy & Plant Pathology)',
      clientInterfaceRole:
        'Consults directly with enterprise Chief Sustainability Officers and R&D heads to tailor mycelium strain density, tensile targets, and agricultural provenance.',
    },
    {
      founderName: 'Vivek Kumar Singh',
      founderRole: 'Director & CMO (Commercial & Brand Growth)',
      clientInterfaceRole:
        'Partners with luxury Brand Directors and Creative Heads on bespoke go-to-market storytelling, co-branded sustainability claims, and patent accreditations.',
    },
    {
      founderName: 'Divyanshu Dipta Khuntia',
      founderRole: 'Co-Founder & Bio-Fabrication Lead (Engineering)',
      clientInterfaceRole:
        'Collaborates with Production Engineers and Supply Chain VPs on batch scaling, tooling molds, die-cutting tolerances, and drop-test certifications.',
    },
  ],
  coCreationSteps: [
    {
      step: '01',
      title: 'Substrate & Tensile Scoping',
      description: 'Client specifies target thickness (0.8mm–3.5mm), flexibility curve, tactile grain finish, and custom dye palette.',
      timeline: 'Days 1–3',
    },
    {
      step: '02',
      title: 'Pilot Chamber Cultivation',
      description: 'Dedicated PSAWL bio-chambers in Bhubaneswar grow custom sheets tailored precisely to client specifications.',
      timeline: 'Days 4–18',
    },
    {
      step: '03',
      title: 'Artisan Fabrication & Testing',
      description: 'The Designer and Tester teams stitch working prototypes and execute rigorous ASTM D2209 tensile and flexometer evaluations.',
      timeline: 'Days 19–24',
    },
    {
      step: '04',
      title: 'Scale Manufacturing & Soil SLA',
      description: 'Direct production fulfillment accompanied by full traceability certificates, farmer-stubble impact metrics, and home-compostable lifecycle guarantees.',
      timeline: 'Ongoing Batch Delivery',
    },
  ],
};

export const ECOSYSTEM_INCUBATORS = [
  { name: 'DPIIT Startup India', role: 'Recognized Startup | No. DIPP159519' },
  { name: 'Startup Utsav 2024', role: 'Top Innovative Idea Award (Pre-Prenure Cohort 2, Startup Odisha)' },
  { name: 'CCSNIAM Agri-Business Incubator', role: '₹5,00,000 Grant-in-Aid from IEF' },
  { name: 'Atal Innovation Mission (AIM)', role: 'Rashtrapati Bhavan Presidential Showcase' },
  { name: 'INAE Conclave 2026', role: 'Indian National Academy of Engineering' },
  { name: 'Agri-Innovation Hub (AgHub)', role: 'PJTSAU Bio-Incubation Partner' },
  { name: 'AIC-SOA Foundation', role: 'Bhubaneswar Bio-Incubation Hub' },
  { name: 'National Bio-Innovation Summit', role: 'Innovation Award Winner' },
];

export interface SpecimenAnatomyDetail {
  index: string;
  part: string;
  botanicalName: string;
  biologicalRole: string;
  materialTranslation: string;
}

export const SPECIMEN_ANATOMY_DETAILS: SpecimenAnatomyDetail[] = [
  {
    index: '01',
    part: 'Velvety Cap Cuticle',
    botanicalName: 'Pileus · Protective Epidermal Layer',
    biologicalRole:
      'Dense radially aligned fungal fibrils shed excess moisture while shielding developing spore tissue beneath.',
    materialTranslation:
      'Guides surface grain uniformity, breathable micro-porosity, and botanical dye uptake in Mycelium Bio-Leather sheets.',
  },
  {
    index: '02',
    part: 'Decurrent Gill Lamellae',
    botanicalName: 'Lamellae · High-Area Biopolymer Plates',
    biologicalRole:
      'Thin, deeply pleated radial blades maximize surface area without brittle mass or synthetic reinforcement.',
    materialTranslation:
      'Inspires lightweight, ribbed internal geometries that maintain structural resilience under compression.',
  },
  {
    index: '03',
    part: 'Fibrous Curved Stipe',
    botanicalName: 'Stipe · Chitin-Glucan Hyphal Matrix',
    biologicalRole:
      'Interlocking longitudinal fungal filaments carry nutrients upward while flexing smoothly under forest canopy loads.',
    materialTranslation:
      'Demonstrates the natural elasticity, crease recovery, and tear resistance of chitin-reinforced fungal cell walls.',
  },
  {
    index: '04',
    part: 'Mycelial Hyphae & Substrate',
    botanicalName: 'Vegetative Network · Agricultural Feedstock Interface',
    biologicalRole:
      'Branching microscopic hyphae colonize deadwood and plant cellulose, enzymatically weaving loose fibers into one solid mass.',
    materialTranslation:
      'Forms the biological binder behind Bio-Thermocol Alternatives, turning regional crop and milling waste into compostable packaging.',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Are Urban Hyphae mushroom leather products ready and tested?',
    answer:
      'Yes! We have fabricated real, wearable consumer goods—including sandals, wallets, and watch straps—and demonstrated large full-scale cultivated sheets at national engineering conclaves and startup summits.',
    category: 'Products',
  },
  {
    question: 'How durable is mushroom bio-leather compared to animal cowhide?',
    answer:
      'Thanks to interwoven chitin-glucan polymers, our mycelium bio-leather mimics the multi-directional tensile resilience and drape of animal hide—without livestock slaughter or toxic chromium tanning.',
    category: 'Materials',
  },
  {
    question: 'What is PSAWL growth media?',
    answer:
      'PSAWL (Plant Straw Agricultural Waste Liquid) is our proprietary solid-state matrix developed from regional crop residues. It accelerates fungal growth under clean, zero-hazard chamber conditions.',
    category: 'Science',
  },
  {
    question: 'Can brands request material swatches or collaboration?',
    answer:
      'Yes. We actively collaborate with ethical fashion labels, footwear designers, and packaging teams for pilot evaluation kits and custom molded inserts. Inquire via the form below or contact urbanhyphae@gmail.com.',
    category: 'Partnerships',
  },
];

export const COMPANY_FACTS = [
  { label: 'Entity Name', value: 'Urban-Hyphae Bioscience Pvt. Ltd.' },
  { label: 'DPIIT Recognition', value: 'DIPP159519' },
  { label: 'Direct Email', value: 'urbanhyphae@gmail.com' },
  { label: 'Helpline', value: '+91 9439941804' },
] as const;

export const BRAND_FACTS = COMPANY_FACTS;
export const MATERIAL_STAGES = TECHNOLOGY_STAGES;
export const PRODUCTS = MATERIAL_INNOVATIONS;
export const COMPARISON_METRICS = MATERIAL_COMPARISON_DATA;
export const FAQS = FAQ_ITEMS;

export interface PhysicalProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  badge: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

export const PHYSICAL_PRODUCTS: PhysicalProduct[] = [
  {
    id: 'mycelium-slide-sandal',
    name: 'Mycelium Slide Sandal',
    category: 'Footwear & Ergonomics',
    tagline: 'Solid-State Dense Mycelial Midsole',
    badge: 'Functional Footwear Prototype',
    description: 'Ergonomic comfort slide with molded mycelium strap and compressed fungal composite sole. Light, durable, and naturally moisture-regulating.',
    image: SITE_IMAGES.productMyceliumSandal,
    specs: [
      { label: 'Flex Resistance', value: '> 50,000 Cycles (Bally)' },
      { label: 'Tensile Strength', value: '18.4 MPa (ASTM D2209)' },
      { label: 'Tannage Chemistry', value: '0% Chromium / Aldehydes' },
      { label: 'End of Life', value: '100% Soil Biodegradable' },
    ],
  },
  {
    id: 'stitched-bifold-wallet',
    name: 'Hand-Stitched Bifold Wallet',
    category: 'Luxury Leathercraft',
    tagline: 'Precision Edge-Beveled Biomaterial',
    badge: 'Luxury Accessory',
    description: 'Precision artisan wallet cut and hand-stitched with waxed linen thread. Holds its shape, flexes with use, and patinas gracefully.',
    image: SITE_IMAGES.productMyceliumWallet,
    specs: [
      { label: 'Stitch Tear Memory', value: '42 N/mm (ASTM D4704)' },
      { label: 'Water Contact Angle', value: '88° Natural Hydrophobicity' },
      { label: 'Grain Surface', value: 'Custom Embossed Mycelial Grain' },
      { label: 'Petroleum PU / PVC', value: '0% Plastic Film' },
    ],
  },
  {
    id: 'watch-strap-suite',
    name: 'Watch Strap Suite',
    category: 'Precision Horology',
    tagline: 'Micro-Textured High-Tensile Band',
    badge: 'Fine Wearable',
    description: 'High-density, hypoallergenic watch bands engineered for luxury timepieces and smartwatches with standard quick-release spring bars.',
    image: SITE_IMAGES.productSandalWalletWatch,
    specs: [
      { label: 'Tensile Modulus', value: '240 MPa Elastic Memory' },
      { label: 'Skin Biocompatibility', value: 'Hypoallergenic (ISO 10993)' },
      { label: 'Colorfastness to Sweat', value: 'Grade 4-5 (ISO 105-E04)' },
      { label: 'Feedstock Ratio', value: '100% Pure Hyphae Veneer' },
    ],
  },
  {
    id: 'cultivated-sheets',
    name: 'Continuous Cultivated Sheets',
    category: 'Industrial Feedstock',
    tagline: '1.2m × 0.8m Seamless Solid-State Mat',
    badge: 'Scale Bio-Fabrication',
    description: 'Large unbroken continuous bio-sheets cultivated in bioreactors in Bhubaneswar. Available for pilot garment tailoring, trims, and upholstery.',
    image: SITE_IMAGES.exhibitionMaterialSheets,
    specs: [
      { label: 'Sheet Dimensions', value: '1.2m x 0.8m Scalable Roll' },
      { label: 'Thickness Control', value: '0.8mm - 2.2mm Precision Gauge' },
      { label: 'Substrate Source', value: 'Regional Rice Stubble & Straw' },
      { label: 'Incubation Cycle', value: '14 Days Controlled Environment' },
    ],
  },
  {
    id: 'bio-thermocol-packaging',
    name: 'Bio-Thermocol Packaging',
    category: 'Molded Protective Packaging',
    tagline: 'Compostable Styrofoam & EPS Replacement',
    badge: 'Circular Packaging Prototype',
    description: 'Custom-molded mycelium packaging cushions grown from agricultural stubble. Shock-absorbent, flame-retardant, and decomposes into rich garden compost in 45 days.',
    image: SITE_IMAGES.materialBioThermocol,
    specs: [
      { label: 'Drop Shock Absorption', value: 'Comparable to EPS Foam' },
      { label: 'Thermal Conductivity', value: '0.04-0.05 W/m·K' },
      { label: 'Soil Biodegradation', value: '100% in 45-60 Days' },
      { label: 'Petroleum Content', value: '0% Microplastics' },
    ],
  },
];
