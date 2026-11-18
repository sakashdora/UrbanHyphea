import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OYSTER_CLUSTER_SPECS,
  SPECIMEN_CAMERA_PRESETS,
  SPECIMEN_SCROLL_SCENES,
  buildBarkSubstrateGeometry,
  buildCurvedStipeGeometry,
  buildGillLamellaeGeometry,
  buildHyphaeTendrilGeometries,
  buildOysterCapGeometry,
  computePiecewiseSceneProgress,
  evaluateSpecimenScenePose,
  evaluateSpecimenScrollPose,
  getBarkSurfaceY,
  oysterFanOutline,
} from './mushroomGeometry';

test('oysterFanOutline returns positive bounded radii with back notch', () => {
  const front = oysterFanOutline(0);
  const back = oysterFanOutline(Math.PI);
  assert.ok(front > back, 'Front fan lobe should extend further than back stipe notch');
  assert.ok(back >= 0.2, 'Back notch radius stays bounded');
  assert.ok(getBarkSurfaceY(0, 0) > 0.35, 'Bark mound crown sits above y=0.35');
});

test('procedural oyster mushroom cap, gills, and stipe produce valid non-empty finite BufferGeometry', () => {
  const spec = OYSTER_CLUSTER_SPECS[0];
  const cap = buildOysterCapGeometry(spec);
  const gills = buildGillLamellaeGeometry(spec);
  const stipe = buildCurvedStipeGeometry(spec);

  for (const geo of [cap, gills, stipe]) {
    const pos = geo.getAttribute('position');
    const norm = geo.getAttribute('normal');
    assert.ok(pos && pos.count > 100, 'Geometry has detailed vertex resolution');
    assert.ok(norm && norm.count === pos.count, 'Normals match vertex count');
    assert.ok(geo.index && geo.index.count > 0, 'Indexed triangles exist');

    for (let i = 0; i < pos.count; i++) {
      assert.ok(Number.isFinite(pos.getX(i)));
      assert.ok(Number.isFinite(pos.getY(i)));
      assert.ok(Number.isFinite(pos.getZ(i)));
    }
    geo.dispose();
  }
});

test('bark substrate sits flush at y=0 and hyphae tendrils generate cleanly', () => {
  const bark = buildBarkSubstrateGeometry();
  bark.computeBoundingBox();
  assert.ok(bark.boundingBox);
  assert.ok(bark.boundingBox.min.y >= -0.001, 'Bark base sits flush at y=0');
  assert.ok(bark.boundingBox.max.y > 0.35, 'Bark mound has positive height');
  bark.dispose();

  const tendrils = buildHyphaeTendrilGeometries(8);
  assert.equal(tendrils.length, 8);
  for (const t of tendrils) {
    assert.ok(t.getAttribute('position').count > 20);
    t.dispose();
  }
});

test('camera presets, 5-scene scroll poses, and piecewise scroll anchors behave cleanly', () => {
  for (const preset of Object.values(SPECIMEN_CAMERA_PRESETS)) {
    assert.equal(preset.position.length, 3);
    assert.equal(preset.target.length, 3);
    assert.ok(preset.position.every(Number.isFinite));
    assert.ok(preset.target.every(Number.isFinite));
  }

  assert.equal(SPECIMEN_SCROLL_SCENES.length, 5);
  const s0 = evaluateSpecimenScenePose(0);
  const s1 = evaluateSpecimenScenePose(1);
  const s2 = evaluateSpecimenScenePose(2);
  const s3 = evaluateSpecimenScenePose(3);
  const s4 = evaluateSpecimenScenePose(4);

  assert.deepEqual(evaluateSpecimenScenePose(-1), s0);
  assert.deepEqual(evaluateSpecimenScenePose(9), s4);
  assert.deepEqual(evaluateSpecimenScrollPose(0), s0);
  assert.deepEqual(evaluateSpecimenScrollPose(1), s4);

  assert.ok(s0.position[0] > 0 && s1.position[0] < 0, 'Scene 0->1 sweeps from hero right to cuticle left');
  assert.ok(s2.position[1] < s1.position[1], 'Scene 2 dips below cap to showcase radial gills');
  assert.ok(s2.gillBounceIntensity > s1.gillBounceIntensity, 'Scene 2 boosts underside gill bounce light');
  assert.ok(s4.explodeAmount > s3.explodeAmount, 'Scene 4 parts caps upward to reveal hyphal network');
  assert.ok(s4.hyphaeGlow > s0.hyphaeGlow, 'Scene 4 highlights vegetative hyphae network');

  const anchors = [400, 1000, 1400, 1800, 2200];
  assert.equal(computePiecewiseSceneProgress(200, anchors), 0);
  assert.equal(computePiecewiseSceneProgress(700, anchors), 0.5);
  assert.equal(computePiecewiseSceneProgress(1000, anchors), 1);
  assert.equal(computePiecewiseSceneProgress(1600, anchors), 2.5);
  assert.equal(computePiecewiseSceneProgress(2400, anchors), 4);
});
