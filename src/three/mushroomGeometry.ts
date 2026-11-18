import * as THREE from 'three';

export type SpecimenCameraPresetId = 'cluster' | 'gills' | 'base';
export type SpecimenLightingPresetId = 'forest' | 'lab';

export interface CameraPreset {
  id: SpecimenCameraPresetId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

export const SPECIMEN_CAMERA_PRESETS: Record<SpecimenCameraPresetId, CameraPreset> = {
  cluster: {
    id: 'cluster',
    label: 'Cluster',
    position: [2.65, 1.72, 3.45],
    target: [0.02, 0.76, 0.08],
  },
  gills: {
    id: 'gills',
    label: 'Gills & Lamellae',
    position: [1.35, 0.42, 2.02],
    target: [0.02, 1.02, 0.22],
  },
  base: {
    id: 'base',
    label: 'Mycelial Base',
    position: [-1.72, 0.96, 1.98],
    target: [0.0, 0.42, 0.12],
  },
};

export interface SpecimenScrollPose {
  position: [number, number, number];
  target: [number, number, number];
  explodeAmount: number;
  specimenYaw: number;
  keyLightIntensity: number;
  rimLightIntensity: number;
  gillBounceIntensity: number;
  hyphaeGlow: number;
}

export interface SpecimenSceneKeyframe extends SpecimenScrollPose {
  sceneIndex: number;
  id: string;
  label: string;
}

/**
 * Five continuous scroll-controlled 3D camera & anatomical dissection stops:
 * 0 = Hero woodland cluster -> 1 = Cap cuticle -> 2 = Underside gills -> 3 = Stipe -> 4 = Hyphal substrate.
 */
export const SPECIMEN_SCROLL_SCENES: readonly SpecimenSceneKeyframe[] = [
  {
    sceneIndex: 0,
    id: 'hero-cluster',
    label: 'Woodland Cluster Overview',
    position: [2.95, 1.9, 3.85],
    target: [0.02, 0.72, 0.08],
    explodeAmount: 0.0,
    specimenYaw: 0.0,
    keyLightIntensity: 2.65,
    rimLightIntensity: 1.85,
    gillBounceIntensity: 1.15,
    hyphaeGlow: 0.0,
  },
  {
    sceneIndex: 1,
    id: 'pileus-cuticle',
    label: 'Pileus · Cap Cuticle',
    position: [-2.55, 2.55, 3.25],
    target: [0.0, 0.88, 0.08],
    explodeAmount: 0.12,
    specimenYaw: 0.22,
    keyLightIntensity: 3.05,
    rimLightIntensity: 2.1,
    gillBounceIntensity: 1.1,
    hyphaeGlow: 0.05,
  },
  {
    sceneIndex: 2,
    id: 'lamellae-gills',
    label: 'Lamellae · Gill Blades',
    position: [2.05, 0.38, 3.18],
    target: [0.02, 0.92, 0.12],
    explodeAmount: 0.36,
    specimenYaw: 0.56,
    keyLightIntensity: 1.95,
    rimLightIntensity: 2.55,
    gillBounceIntensity: 2.75,
    hyphaeGlow: 0.14,
  },
  {
    sceneIndex: 3,
    id: 'fibrous-stipe',
    label: 'Stipe · Fibrous Stem',
    position: [-3.08, 1.24, 2.12],
    target: [0.0, 0.64, 0.06],
    explodeAmount: 0.18,
    specimenYaw: 0.94,
    keyLightIntensity: 2.75,
    rimLightIntensity: 2.25,
    gillBounceIntensity: 1.65,
    hyphaeGlow: 0.35,
  },
  {
    sceneIndex: 4,
    id: 'hyphal-substrate',
    label: 'Hyphae · Substrate Network',
    position: [-1.85, 2.08, 3.08],
    target: [0.0, 0.36, 0.1],
    explodeAmount: 0.52,
    specimenYaw: 0.44,
    keyLightIntensity: 2.35,
    rimLightIntensity: 2.45,
    gillBounceIntensity: 1.85,
    hyphaeGlow: 1.0,
  },
];

const _scrollPosCurve = new THREE.CatmullRomCurve3(
  SPECIMEN_SCROLL_SCENES.map((k) => new THREE.Vector3(...k.position)),
  false,
  'centripetal',
  0.45,
);

const _scrollTargetCurve = new THREE.CatmullRomCurve3(
  SPECIMEN_SCROLL_SCENES.map((k) => new THREE.Vector3(...k.target)),
  false,
  'centripetal',
  0.45,
);

function lerpScalar(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Evaluates a smooth continuous 3D camera, anatomical separation, rotation, and lighting pose
 * across the 5 scroll scenes (sceneProgress in [0, 4]).
 */
export function evaluateSpecimenScenePose(sceneProgress: number): SpecimenScrollPose {
  const maxIdx = SPECIMEN_SCROLL_SCENES.length - 1;
  const clamped = Math.max(0, Math.min(maxIdx, sceneProgress));
  const u = clamped / maxIdx;

  const pos = _scrollPosCurve.getPoint(u);
  const tgt = _scrollTargetCurve.getPoint(u);

  const i0 = Math.min(maxIdx - 1, Math.floor(clamped));
  const i1 = i0 + 1;
  const localT = clamped - i0;
  const smoothT = localT * localT * (3 - 2 * localT);

  const k0 = SPECIMEN_SCROLL_SCENES[i0];
  const k1 = SPECIMEN_SCROLL_SCENES[i1];

  return {
    position: [pos.x, pos.y, pos.z],
    target: [tgt.x, tgt.y, tgt.z],
    explodeAmount: lerpScalar(k0.explodeAmount, k1.explodeAmount, smoothT),
    specimenYaw: lerpScalar(k0.specimenYaw, k1.specimenYaw, smoothT),
    keyLightIntensity: lerpScalar(k0.keyLightIntensity, k1.keyLightIntensity, smoothT),
    rimLightIntensity: lerpScalar(k0.rimLightIntensity, k1.rimLightIntensity, smoothT),
    gillBounceIntensity: lerpScalar(k0.gillBounceIntensity, k1.gillBounceIntensity, smoothT),
    hyphaeGlow: lerpScalar(k0.hyphaeGlow, k1.hyphaeGlow, smoothT),
  };
}

/**
 * Backwards-compatible normalized [0, 1] evaluator spanning Scene 0 through Scene 4.
 */
export function evaluateSpecimenScrollPose(progress: number): SpecimenScrollPose {
  const clamped = Math.max(0, Math.min(1, progress));
  return evaluateSpecimenScenePose(clamped * (SPECIMEN_SCROLL_SCENES.length - 1));
}

/**
 * Maps a focal document Y coordinate against monotonically ordered scene anchor Y positions
 * into a continuous [0, anchors.length - 1] scene progress value.
 */
export function computePiecewiseSceneProgress(
  focusDocY: number,
  anchors: readonly number[],
): number {
  if (anchors.length <= 1) return 0;
  if (focusDocY <= anchors[0]) return 0;
  const lastIdx = anchors.length - 1;
  if (focusDocY >= anchors[lastIdx]) return lastIdx;

  for (let i = 0; i < lastIdx; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (focusDocY <= b) {
      const span = Math.max(1, b - a);
      return i + Math.max(0, Math.min(1, (focusDocY - a) / span));
    }
  }
  return lastIdx;
}

export interface OysterFruitingBodySpec {
  id: string;
  capRadius: number;
  capDepth: number;
  capThickness: number;
  waveFreq: number;
  waveAmp: number;
  gillCount: number;
  stemControlPoints: [number, number, number][];
  stemBaseRadius: number;
  stemTopRadius: number;
  capPitch: number;
  capRoll: number;
  capYaw: number;
  explodeOffset: [number, number, number];
  tintHex: number;
}

/**
 * Curated botanical arrangement of 7 Pleurotus ostreatus (Oyster Mushroom)
 * fruiting bodies emerging in overlapping tiered shelves from a shared mycelial base.
 */
export const OYSTER_CLUSTER_SPECS: OysterFruitingBodySpec[] = [
  {
    id: 'hero-primary',
    capRadius: 0.78,
    capDepth: 0.22,
    capThickness: 0.042,
    waveFreq: 5,
    waveAmp: 0.048,
    gillCount: 72,
    stemControlPoints: [
      [0.02, 0.02, 0.04],
      [0.05, 0.38, 0.08],
      [0.08, 0.78, 0.04],
      [0.06, 1.12, -0.04],
    ],
    stemBaseRadius: 0.105,
    stemTopRadius: 0.075,
    capPitch: 0.2,
    capRoll: -0.1,
    capYaw: 0.18,
    explodeOffset: [0, 0.34, 0],
    tintHex: 0xf4ead8,
  },
  {
    id: 'hero-secondary',
    capRadius: 0.66,
    capDepth: 0.19,
    capThickness: 0.036,
    waveFreq: 6,
    waveAmp: 0.042,
    gillCount: 60,
    stemControlPoints: [
      [-0.08, 0.01, 0.04],
      [-0.22, 0.32, 0.1],
      [-0.38, 0.64, 0.14],
      [-0.44, 0.88, 0.12],
    ],
    stemBaseRadius: 0.092,
    stemTopRadius: 0.068,
    capPitch: 0.24,
    capRoll: 0.22,
    capYaw: -0.52,
    explodeOffset: [-0.26, 0.22, 0.12],
    tintHex: 0xefe1c8,
  },
  {
    id: 'shelf-right',
    capRadius: 0.6,
    capDepth: 0.17,
    capThickness: 0.034,
    waveFreq: 5,
    waveAmp: 0.038,
    gillCount: 56,
    stemControlPoints: [
      [0.12, 0.01, 0.02],
      [0.3, 0.24, 0.06],
      [0.48, 0.5, 0.08],
      [0.54, 0.7, 0.08],
    ],
    stemBaseRadius: 0.085,
    stemTopRadius: 0.062,
    capPitch: 0.28,
    capRoll: -0.26,
    capYaw: 0.82,
    explodeOffset: [0.3, 0.16, 0.1],
    tintHex: 0xead8ba,
  },
  {
    id: 'crown-back',
    capRadius: 0.7,
    capDepth: 0.21,
    capThickness: 0.038,
    waveFreq: 4,
    waveAmp: 0.044,
    gillCount: 64,
    stemControlPoints: [
      [-0.02, 0.02, -0.05],
      [-0.06, 0.44, -0.14],
      [-0.08, 0.88, -0.18],
      [-0.06, 1.22, -0.14],
    ],
    stemBaseRadius: 0.098,
    stemTopRadius: 0.072,
    capPitch: 0.16,
    capRoll: 0.08,
    capYaw: 2.65,
    explodeOffset: [0, 0.42, -0.22],
    tintHex: 0xf7efe0,
  },
  {
    id: 'lower-left',
    capRadius: 0.48,
    capDepth: 0.15,
    capThickness: 0.03,
    waveFreq: 5,
    waveAmp: 0.032,
    gillCount: 48,
    stemControlPoints: [
      [-0.12, 0.0, 0.09],
      [-0.32, 0.14, 0.22],
      [-0.48, 0.3, 0.32],
      [-0.54, 0.44, 0.36],
    ],
    stemBaseRadius: 0.072,
    stemTopRadius: 0.052,
    capPitch: 0.34,
    capRoll: 0.26,
    capYaw: -0.92,
    explodeOffset: [-0.24, 0.08, 0.22],
    tintHex: 0xe6d3b2,
  },
  {
    id: 'lower-front-pin',
    capRadius: 0.38,
    capDepth: 0.13,
    capThickness: 0.026,
    waveFreq: 4,
    waveAmp: 0.024,
    gillCount: 40,
    stemControlPoints: [
      [0.06, 0.0, 0.12],
      [0.16, 0.11, 0.24],
      [0.25, 0.23, 0.35],
      [0.28, 0.33, 0.4],
    ],
    stemBaseRadius: 0.065,
    stemTopRadius: 0.048,
    capPitch: 0.36,
    capRoll: -0.18,
    capYaw: 0.45,
    explodeOffset: [0.2, 0.06, 0.26],
    tintHex: 0xdec8a5,
  },
  {
    id: 'upper-right-shelf',
    capRadius: 0.52,
    capDepth: 0.16,
    capThickness: 0.032,
    waveFreq: 5,
    waveAmp: 0.036,
    gillCount: 52,
    stemControlPoints: [
      [0.08, 0.02, -0.04],
      [0.22, 0.4, -0.04],
      [0.38, 0.76, -0.04],
      [0.42, 0.98, -0.02],
    ],
    stemBaseRadius: 0.078,
    stemTopRadius: 0.056,
    capPitch: 0.22,
    capRoll: -0.24,
    capYaw: 1.42,
    explodeOffset: [0.24, 0.28, -0.1],
    tintHex: 0xf1e5cf,
  },
];

function deterministicNoise(x: number, y: number, z = 0): number {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Evaluates the radial fan boundary of an oyster mushroom cap at angle theta.
 * Produces an authentic eccentric conch/oyster shell outline: wide forward fan lobe (+Z, theta=0)
 * tapering down to a compact kidney-shaped stem notch at the back (theta=PI).
 */
export function oysterFanOutline(theta: number): number {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const forwardSweep = 0.56 + 0.52 * Math.pow(Math.max(0, cosT * 0.5 + 0.5), 0.78);
  const backNotch = -0.34 * Math.pow(Math.max(0, -cosT), 1.35);
  const lateralShell = 0.16 * Math.sin(theta * 2) * sinT;
  return Math.max(0.2, forwardSweep + backNotch + lateralShell);
}

/**
 * Shared eccentric offset placing the cap's geometric center forward of the stipe origin (0,0,0),
 * so the stipe attaches naturally near the posterior oyster shell margin.
 */
function eccentricForwardOffset(rNorm: number, capRadius: number): number {
  return capRadius * 0.48 * Math.pow(rNorm, 0.85);
}

/**
 * Shared vertical dome + scooped oyster funnel profile for cap top, bottom, and gill roots.
 */
function evalCapShellY(
  rNorm: number,
  theta: number,
  spec: OysterFruitingBodySpec,
): number {
  const angularWeight = Math.min(1, rNorm * 4.0);
  const ripple =
    Math.sin(theta * spec.waveFreq + 0.6) * spec.waveAmp +
    Math.cos(theta * (spec.waveFreq + 3) - 1.1) * (spec.waveAmp * 0.45);
  const cosT = Math.cos(theta);

  // Oyster shells scoop gently toward the rear stipe while converging smoothly at rNorm=0
  const archDome = Math.sin(rNorm * Math.PI * 0.86) * spec.capDepth;
  const eccentricFunnel = -0.042 * spec.capDepth * Math.sin(rNorm * Math.PI) * (1 - 0.45 * cosT);
  const rimUndulation = Math.pow(rNorm, 2.2) * (ripple + 0.032 * cosT) * angularWeight;

  return archDome + eccentricFunnel + rimUndulation;
}

/**
 * Builds an organic closed solid oyster-mushroom cap BufferGeometry with top cuticle,
 * thin rolled margin lip, and deep underside gill pocket.
 */
export function buildOysterCapGeometry(spec: OysterFruitingBodySpec): THREE.BufferGeometry {
  const angularSegs = 68;
  const profileSteps = 34;

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const tmpColor = new THREE.Color();

  for (let p = 0; p <= profileSteps; p++) {
    const t = p / profileSteps;

    for (let a = 0; a <= angularSegs; a++) {
      const u = a / angularSegs;
      const theta = u * Math.PI * 2;
      const outline = oysterFanOutline(theta);

      let rNorm: number;
      let yOffset: number;
      let shade = 1.0;
      let warmBias = 0.0;

      if (t <= 0.54) {
        // Top convex cuticle surface from eccentric stem crown (0) to thin rim (1)
        const f = t / 0.54;
        rNorm = f;
        const baseShell = evalCapShellY(f, theta, spec);
        const taperThickness = spec.capThickness * 0.68 * Math.pow(1 - f * 0.82, 0.85);
        yOffset = baseShell + taperThickness;

        // Subtle warm umber-taupe near eccentric center lightening toward creamy margin
        shade = 0.84 + 0.16 * Math.pow(f, 0.75);
        warmBias = (1 - f) * 0.07;
      } else if (t <= 0.62) {
        // Softly rolled natural margin lip
        const f = (t - 0.54) / 0.08;
        const angleLip = f * Math.PI;
        rNorm = 1.0 + Math.sin(angleLip) * 0.015;
        const edgeShell = evalCapShellY(1.0, theta, spec);
        yOffset =
          edgeShell +
          Math.cos(angleLip) * (spec.capThickness * 0.14) -
          f * spec.capThickness * 0.16;
        shade = 0.96 - 0.1 * f;
      } else {
        // Underside flesh arching back toward stipe socket
        const f = 1 - (t - 0.62) / 0.38;
        rNorm = 0.06 + f * 0.94;
        const baseShell = evalCapShellY(rNorm, theta, spec);
        yOffset = baseShell - spec.capThickness * (0.2 + 0.32 * (1 - rNorm));
        // Realistic dark crevice shadow beneath the cap where gills meet flesh
        shade = 0.52 + 0.34 * Math.pow(rNorm, 1.15);
        warmBias = 0.04;
      }

      const r = rNorm * spec.capRadius * outline;
      const x = Math.sin(theta) * r;
      const z = Math.cos(theta) * r + eccentricForwardOffset(rNorm, spec.capRadius);

      positions.push(x, yOffset, z);

      const uvU = 0.5 + x / (spec.capRadius * 2.2);
      const uvV = 0.36 + z / (spec.capRadius * 2.4);
      uvs.push(uvU, uvV);

      tmpColor.setRGB(
        Math.min(1, shade + warmBias * 0.35),
        Math.min(1, shade * 0.975),
        Math.min(1, shade * 0.935 - warmBias * 0.5),
      );
      colors.push(tmpColor.r, tmpColor.g, tmpColor.b);
    }
  }

  const rowStride = angularSegs + 1;
  for (let p = 0; p < profileSteps; p++) {
    for (let a = 0; a < angularSegs; a++) {
      const i0 = p * rowStride + a;
      const i1 = i0 + 1;
      const i2 = i0 + rowStride;
      const i3 = i2 + 1;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds true 3D radial decurrent gill lamellae (primary + shorter secondary/tertiary lamellulae)
 * radiating from the eccentric stipe notch across the entire underside shell with crevice AO.
 */
export function buildGillLamellaeGeometry(spec: OysterFruitingBodySpec): THREE.BufferGeometry {
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const totalBlades = spec.gillCount;
  const radialSteps = 16;
  let vertexCursor = 0;

  for (let g = 0; g < totalBlades; g++) {
    const isSecondary = g % 2 === 1;
    const isTertiary = g % 4 === 3;
    const theta = (g / totalBlades) * Math.PI * 2;
    const outline = oysterFanOutline(theta);

    const rStartFrac = isTertiary ? 0.54 : isSecondary ? 0.31 : 0.08;
    const rEndFrac = 0.955;

    const bladeThickness = isTertiary ? 0.0036 : isSecondary ? 0.0044 : 0.0058;
    const perpX = Math.cos(theta);
    const perpZ = -Math.sin(theta);

    for (let s = 0; s <= radialSteps; s++) {
      const f = s / radialSteps;
      const rNorm = rStartFrac + f * (rEndFrac - rStartFrac);
      const r = rNorm * spec.capRadius * outline;

      const wiggle = Math.sin(f * Math.PI * 2.4 + g * 1.6) * 0.006 * spec.capRadius;
      const cx = Math.sin(theta) * r + perpX * wiggle;
      const cz =
        Math.cos(theta) * r +
        eccentricForwardOffset(rNorm, spec.capRadius) +
        perpZ * wiggle;

      // Seat root comfortably inside underside flesh so blades never poke through top cuticle
      const rootY = evalCapShellY(rNorm, theta, spec) - spec.capThickness * 0.24;

      const decurrentDrop =
        !isSecondary && !isTertiary && f < 0.36
          ? Math.pow((0.36 - f) / 0.36, 1.25) * 0.1 * spec.capRadius
          : 0;

      const bladeDepth =
        (isTertiary ? 0.048 : isSecondary ? 0.078 : 0.118) *
          spec.capRadius *
          Math.sin(Math.pow(f, 0.72) * Math.PI * 0.94) +
        decurrentDrop;

      const edgeY = rootY - bladeDepth;

      positions.push(cx - perpX * bladeThickness, rootY, cz - perpZ * bladeThickness);
      colors.push(0.36, 0.32, 0.27);
      uvs.push(f, 0);

      positions.push(cx, edgeY, cz);
      colors.push(0.99, 0.95, 0.86);
      uvs.push(f, 0.5);

      positions.push(cx + perpX * bladeThickness, rootY, cz + perpZ * bladeThickness);
      colors.push(0.36, 0.32, 0.27);
      uvs.push(f, 1);
    }

    for (let s = 0; s < radialSteps; s++) {
      const a0 = vertexCursor + s * 3;
      const b0 = a0 + 3;
      indices.push(a0, b0, a0 + 1);
      indices.push(a0 + 1, b0, b0 + 1);
      indices.push(a0 + 1, b0 + 1, a0 + 2);
      indices.push(a0 + 2, b0 + 1, b0 + 2);
    }

    vertexCursor += (radialSteps + 1) * 3;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds an organically tapered, closed watertight curved stipe (stem) along a Catmull-Rom spine.
 */
export function buildCurvedStipeGeometry(spec: OysterFruitingBodySpec): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(
    spec.stemControlPoints.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
  );
  const tubularSegs = 28;
  const radialSegs = 24;

  const frames = curve.computeFrenetFrames(tubularSegs, false);
  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= tubularSegs; i++) {
    const t = i / tubularSegs;
    const pt = curve.getPointAt(t);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    const baseFlare = Math.exp(-t * 6.0) * 0.5;
    const topFlare = Math.pow(Math.max(0, t - 0.68) / 0.32, 1.65) * 0.45;
    // Close top and bottom rings cleanly into rounded biological root/collar ends
    const endCap =
      i === 0 || i === tubularSegs ? 0.0 : i === 1 || i === tubularSegs - 1 ? 0.65 : 1.0;
    const radiusBase = THREE.MathUtils.lerp(spec.stemBaseRadius, spec.stemTopRadius, t);
    const radius = radiusBase * (1 + baseFlare + topFlare) * endCap;

    const shade = 0.66 + 0.32 * Math.pow(t, 0.7);

    for (let j = 0; j <= radialSegs; j++) {
      const u = j / radialSegs;
      const theta = u * Math.PI * 2;
      const ridgeCount = Math.max(10, Math.round(spec.gillCount / 4));
      const fluting = 1 + Math.sin(theta * ridgeCount + t * 1.4) * 0.05 * (0.25 + 0.75 * t);
      const r = radius * fluting;

      const sin = Math.sin(theta);
      const cos = Math.cos(theta);

      const vx = pt.x + r * (cos * N.x + sin * B.x);
      const vy = pt.y + r * (cos * N.y + sin * B.y);
      const vz = pt.z + r * (cos * N.z + sin * B.z);

      positions.push(vx, vy, vz);
      uvs.push(u, t);
      colors.push(shade, shade * 0.955, shade * 0.89);
    }
  }

  const stride = radialSegs + 1;
  for (let i = 0; i < tubularSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * stride + j;
      const b = a + stride;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Evaluates the exact top surface height of the sculpted bark substrate mound at (x, z)
 * so moss cushions, hyphae tendrils, and fruiting stem bases sit flush without floating or sinking.
 */
export function getBarkSurfaceY(x: number, z: number): number {
  const radialDist = Math.hypot(x, z);
  const angle = Math.atan2(z, x);
  const perimeterWarp =
    1 +
    0.11 * Math.sin(angle * 3 + 0.5) +
    0.07 * Math.cos(angle * 5 - 1.2) +
    0.03 * Math.sin(angle * 11);
  const normR = radialDist / (1.36 * perimeterWarp);
  const domeLift = Math.max(0, 1 - normR * normR * 0.92) * 0.13;
  const furrow =
    (Math.sin(x * 8.2 + Math.cos(z * 4.5)) * 0.028 +
      Math.cos(z * 6.4 - x * 2.1) * 0.016) *
    Math.min(1, radialDist / 0.55);
  return Math.max(0.05, 0.36 + domeLift + furrow);
}

/**
 * Builds a realistic furrowed forest bark substrate mound sitting flush on y = 0.
 */
export function buildBarkSubstrateGeometry(): THREE.BufferGeometry {
  const geo = new THREE.CylinderGeometry(1.36, 1.62, 0.36, 56, 10, false);
  geo.translate(0, 0.18, 0);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const angle = Math.atan2(z, x);
    const radialDist = Math.hypot(x, z);

    const perimeterWarp =
      1 +
      0.11 * Math.sin(angle * 3 + 0.5) +
      0.07 * Math.cos(angle * 5 - 1.2) +
      0.03 * Math.sin(angle * 11);

    const wx = x * perimeterWarp;
    const wz = z * perimeterWarp;

    let finalY = y;
    if (y > 0.32) {
      finalY = getBarkSurfaceY(wx, wz);
    } else if (y > 0.04) {
      // Rugged longitudinal bark plates along the side skirt
      const sideRidge =
        Math.sin(angle * 14 + y * 5) * 0.022 +
        (deterministicNoise(Math.round(wx * 8), Math.round(wz * 8)) - 0.5) * 0.018;
      finalY = Math.max(0, y + sideRidge * Math.min(1, radialDist / 0.8));
    } else {
      finalY = 0;
    }

    pos.setXYZ(i, wx, finalY, wz);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * Generates branching white fungal mycelial hyphae tendrils creeping flush across the bark surface.
 */
export function buildHyphaeTendrilGeometries(count = 18): THREE.BufferGeometry[] {
  const tendrils: THREE.BufferGeometry[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + deterministicNoise(i, 3) * 0.32;
    const len = 0.45 + deterministicNoise(i, 7) * 0.58;
    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= 6; s++) {
      const f = s / 6;
      const r = 0.1 + f * len;
      const wiggle = Math.sin(f * Math.PI * 2.4 + i * 1.3) * 0.11 * f;
      const a = angle + wiggle;
      const px = Math.cos(a) * r;
      const pz = Math.sin(a) * r;
      const py = getBarkSurfaceY(px, pz) + 0.008;
      pts.push(new THREE.Vector3(px, py, pz));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const radius = 0.0095 - deterministicNoise(i, 11) * 0.003;
    tendrils.push(new THREE.TubeGeometry(curve, 16, radius, 6, false));
  }
  return tendrils;
}
