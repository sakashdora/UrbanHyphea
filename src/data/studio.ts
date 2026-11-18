import { SITE_IMAGES as images } from './assets';

export const collection = [
  { name: 'Mycelium leather', group: 'Materials', use: 'Flexible sheets', image: new URL('../assets/images/material_bio_leather_1794677738235.jpg', import.meta.url).href, detail: 'We grow fungal fibres on agricultural residue to make a flexible sheet. Explore its grain, drape and finish for accessories, footwear and garment trims.' },
  { name: 'Moulded packaging', group: 'Materials', use: 'Protective forms', image: images.materialBioThermocol, detail: 'Mycelium binds pieces of crop residue into a lightweight form. Share your product dimensions with us to discuss a fitted packaging prototype.' },
  { name: 'Mycelium slide', group: 'Prototypes', use: 'Footwear', image: images.productMyceliumSandal, detail: 'Our slide sandal takes the material off the sample table. The broad upper shows how a cultivated sheet can be cut and shaped for footwear.' },
  { name: 'Bifold wallet', group: 'Prototypes', use: 'Leathercraft', image: images.productMyceliumWallet, detail: 'A hand-stitched bifold puts our mycelium sheet through the folds, seams and small details of everyday leathercraft.' },
  { name: 'Accessory collection', group: 'Prototypes', use: 'Watch strap & accessories', image: images.productSandalWalletWatch, detail: 'A watch strap, wallet and sandal bring three different uses of the same material together in our exhibition collection.' },
  { name: 'Sheets & garment trims', group: 'Prototypes', use: 'Apparel', image: images.exhibitionMaterialSheets, detail: 'Our exhibition display pairs a cultivated sheet with a finished garment, showing how the material can move from a swatch to a wearable detail.' },
] as const;

export type Product = typeof collection[number];

export const milestones = [
  { title: 'Our first cultivated sheet', label: 'Bhubaneswar · July 2026', photo: images.achievementFirstSheet, description: 'Adhiraj and Vivek unveil a continuous mycelium sheet grown from regional agricultural waste.' },
  { title: 'National Innovation award', label: 'Bio-Innovation summit · 2026', photo: images.achievementSrustiSparkAward, description: 'The team receives the national bio-innovation award for its groundbreaking work on mycelium materials.' },
  { title: 'On stage at INAE', label: 'Technology conclave · 2026', photo: images.achievementInaeConclave, description: 'Our founders present the material at the Indian National Academy of Engineering Technology Conclave.' },
  { title: 'A hands-on demonstration', label: 'Material showcase', photo: images.achievementPitchPresentation, description: 'An evaluation panel gets a closer look at the texture and flexibility of a cultivated sheet.' },
  { title: 'At the exhibition booth', label: 'Industry & academia', photo: images.achievementBoothDelegation, description: 'Our team brings the prototypes to the exhibition floor to meet industry and academic mentors.' },
  { title: 'Sharing the science', label: 'Founder keynote', photo: images.achievementAdhirajSpeaking, description: 'Adhiraj shares the agricultural research behind our materials with the summit audience.' },
];
