import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  FOUNDERS,
  DESIGNER_TEAM,
  DEVELOPER_TEAM,
  TESTER_TEAM,
  RESEARCH_TEAM,
  CLIENT_PARTNERSHIP,
  BRAND_FACTS,
  COMPANY_FACTS,
  MATERIAL_STAGES,
  TECHNOLOGY_STAGES,
  PRODUCTS,
  MATERIAL_INNOVATIONS,
  COMPARISON_METRICS,
  MATERIAL_COMPARISON_DATA,
  FAQS,
  FAQ_ITEMS,
  NAV_ITEMS,
} from './biomaterials';

test('DESIGNER_TEAM contains exactly 5 specialists including a Brutalist Design Expert', () => {
  assert.equal(DESIGNER_TEAM.length, 5, 'Designer team must have exactly 5 specialists');

  // Verify Brutal Design Expert
  const brutalExpert = DESIGNER_TEAM.find((d) => d.isBrutalistExpert);
  assert.ok(brutalExpert, 'Must include a designated Brutal Design Expert');
  assert.equal(brutalExpert.name, 'Kaelen Vance');
  assert.ok(brutalExpert.roleCode.includes('BRUTAL_EXPERT'), 'Role code must identify brutal expert');
  assert.ok(brutalExpert.statement.length > 20, 'Statement must be meaningful');
  assert.ok(brutalExpert.keyArtifact.includes('Brutalist Bio-Acoustic Wall Monolith'), 'Key artifact must be specified');

  // Verify all 5 designers have complete fields
  for (const designer of DESIGNER_TEAM) {
    assert.ok(designer.id.length > 0, 'Designer ID must be non-empty');
    assert.ok(designer.name.length > 0, 'Designer name must be non-empty');
    assert.ok(designer.role.length > 0, 'Designer role must be non-empty');
    assert.ok(designer.roleCode.startsWith('[DES_'), 'Role code must start with [DES_');
    assert.ok(designer.specialty.length > 0, 'Specialty must be non-empty');
    assert.ok(designer.background.length > 0, 'Background must be non-empty');
    assert.ok(designer.statement.length > 0, 'Statement must be non-empty');
    assert.ok(designer.keyArtifact.length > 0, 'Key artifact must be non-empty');
  }
});

test('DEVELOPER_TEAM, TESTER_TEAM, and RESEARCH_TEAM are fully configured with genuine details', () => {
  // Developer Team
  assert.ok(DEVELOPER_TEAM.length >= 3, 'Developer team must have at least 3 members');
  for (const dev of DEVELOPER_TEAM) {
    assert.ok(dev.roleCode.startsWith('[DEV_'), 'Developer role code must start with [DEV_');
    assert.ok(dev.stack.length > 0, 'Stack must contain technologies');
    assert.ok(dev.keyContribution.length > 20, 'Key contribution must be detailed');
  }

  // Tester Team
  assert.ok(TESTER_TEAM.length >= 3, 'Tester team must have at least 3 members');
  const astmTester = TESTER_TEAM.find((t) => t.roleCode.includes('ASTM_QA'));
  assert.ok(astmTester, 'Must have ASTM Bio-Material Testing Specialist');
  assert.ok(astmTester.validationMetric.includes('18.4 MPa'), 'Must record ASTM tensile validation');

  const digitalQA = TESTER_TEAM.find((t) => t.roleCode.includes('DIGITAL_QA'));
  assert.ok(digitalQA, 'Must have Digital QA & Accessibility Specialist');

  const ecoQA = TESTER_TEAM.find((t) => t.roleCode.includes('ECO_QA'));
  assert.ok(ecoQA, 'Must have Biodegradation Kinetics QA Analyst');

  // Research Team
  assert.ok(RESEARCH_TEAM.length >= 3, 'Research team must have at least 3 members');
  for (const res of RESEARCH_TEAM) {
    assert.ok(res.roleCode.startsWith('[RES_'), 'Research role code must start with [RES_');
    assert.ok(res.credentials.length > 0, 'Research member must have academic credentials');
  }
});

test('CLIENT_PARTNERSHIP defines executive commitments and 4-step co-creation protocol', () => {
  assert.ok(CLIENT_PARTNERSHIP.title.length > 0);
  assert.ok(CLIENT_PARTNERSHIP.concept.length > 0);
  assert.ok(CLIENT_PARTNERSHIP.narrative.length > 0);

  // 3 Founders Commitments
  assert.equal(CLIENT_PARTNERSHIP.foundersCommitment.length, 3, 'Must have 3 founders commitments');
  const founderNames = CLIENT_PARTNERSHIP.foundersCommitment.map((f) => f.founderName);
  assert.ok(founderNames.includes('Adhiraj Mohapatra'));
  assert.ok(founderNames.includes('Vivek Kumar Singh'));
  assert.ok(founderNames.includes('Divyanshu Dipta Khuntia'));

  // 4 Co-Creation Steps
  assert.equal(CLIENT_PARTNERSHIP.coCreationSteps.length, 4, 'Must have exactly 4 co-creation steps');
  assert.equal(CLIENT_PARTNERSHIP.coCreationSteps[0].step, '01');
  assert.equal(CLIENT_PARTNERSHIP.coCreationSteps[1].step, '02');
  assert.equal(CLIENT_PARTNERSHIP.coCreationSteps[2].step, '03');
  assert.equal(CLIENT_PARTNERSHIP.coCreationSteps[3].step, '04');
});

test('FOUNDERS and NAV_ITEMS maintain complete brand credentials and navigation anchors', () => {
  assert.equal(FOUNDERS.length, 3, 'Must have 3 executive co-founders');
  for (const founder of FOUNDERS) {
    assert.ok(founder.credentials.length >= 2, 'Founder must list verified credentials');
    assert.ok(founder.image.length > 0, 'Founder must have an executive portrait');
  }

  // Check DPIIT Registration
  const dpiitFact = COMPANY_FACTS.find((f) => f.label === 'DPIIT Recognition');
  assert.ok(dpiitFact && dpiitFact.value === 'DIPP159519', 'Must preserve DPIIT DIPP159519 recognition');

  // Verify Aliases
  assert.equal(BRAND_FACTS, COMPANY_FACTS);
  assert.equal(MATERIAL_STAGES, TECHNOLOGY_STAGES);
  assert.equal(PRODUCTS, MATERIAL_INNOVATIONS);
  assert.equal(COMPARISON_METRICS, MATERIAL_COMPARISON_DATA);
  assert.equal(FAQS, FAQ_ITEMS);

  // Verify Navigation Items
  assert.ok(NAV_ITEMS.length >= 9, 'Must have full navigation anchors');
  assert.ok(NAV_ITEMS.some((item) => item.id === 'founders'), 'Must have team section anchor');
});
