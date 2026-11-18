import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateInquiry,
  buildInquiryConfirmation,
  filterPropertiesByClassification,
  type InquiryFormInput,
  type MaterialPropertyItem,
} from './inquiry';

test('validateInquiry accepts valid complete form data', () => {
  const input: InquiryFormInput = {
    name: 'Ananya Sen',
    organization: 'Kalinga Textiles',
    email: 'ananya@kalingatextiles.in',
    interest: 'bio-leather',
    message: 'Interested in evaluating mycelium bio-leather samples for small accessories.',
  };

  const result = validateInquiry(input);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateInquiry rejects missing name, invalid email, and short message', () => {
  const input: InquiryFormInput = {
    name: 'A',
    organization: '',
    email: 'invalid-email',
    interest: 'general',
    message: 'Hi',
  };

  const result = validateInquiry(input);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('buildInquiryConfirmation formats summary cleanly with optional organization', () => {
  const withOrg = buildInquiryConfirmation({
    name: 'Rohan Das',
    organization: 'EcoPack Labs',
    email: 'rohan@ecopack.in',
    interest: 'bio-thermocol',
    message: 'Exploring molded bio-thermocol cushioning for fragile shipments.',
  });

  assert.equal(withOrg.topicLabel, 'Bio-Thermocol Packaging Alternative');
  assert.match(withOrg.summary, /Rohan Das \(EcoPack Labs\)/);

  const withoutOrg = buildInquiryConfirmation({
    name: 'Meera Patel',
    organization: '   ',
    email: 'meera@example.com',
    interest: 'research-collaboration',
    message: 'Academic substrate collaboration inquiry.',
  });

  assert.equal(withoutOrg.topicLabel, 'Research & R&D Collaboration');
  assert.match(withoutOrg.summary, /Thank you, Meera Patel\. Your inquiry/);
});

test('filterPropertiesByClassification filters accurately', () => {
  const sample: MaterialPropertyItem[] = [
    {
      id: 'biodegradable',
      title: 'Biodegradable',
      shortDesc: 'Designed to return safely to natural ecosystems.',
      classification: 'design-objective',
      classificationLabel: 'Design Objective',
      scientificNote: 'Formulated from lignocellulosic substrates and fungal biomass.',
    },
    {
      id: 'chitin',
      title: 'Chitin-Reinforced Structure',
      shortDesc: 'Natural structural biopolymer matrix.',
      classification: 'lab-focus',
      classificationLabel: 'Lab Characterization',
      scientificNote: 'Ongoing microstructural analysis of chitin-glucan cross-linking.',
    },
  ];

  assert.equal(filterPropertiesByClassification(sample, 'all').length, 2);
  assert.equal(filterPropertiesByClassification(sample, 'design-objective')[0].id, 'biodegradable');
  assert.equal(filterPropertiesByClassification(sample, 'lab-focus')[0].id, 'chitin');
});
