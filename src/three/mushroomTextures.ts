import * as THREE from 'three';

function hash2d(x: number, y: number): number {
  const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return v - Math.floor(v);
}

function smoothNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2d(xi, yi);
  const b = hash2d(xi + 1, yi);
  const c = hash2d(xi, yi + 1);
  const d = hash2d(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, octaves = 4): number {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise(x * freq, y * freq) * amp;
    freq *= 2.02;
    amp *= 0.5;
  }
  return val;
}

export interface ProceduralMaterialTextureSet {
  albedo: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
}

/**
 * Generates realistic Pleurotus oyster cap textures: warm hazel-taupe radial fibrils
 * emerging from the eccentric stipe notch (uv ~ 0.5, 0.36) and fading to creamy-ivory
 * margins with concentric growth bands and fine organic surface texture.
 */
export function createOysterCapTextures(anisotropy: number, size = 512): ProceduralMaterialTextureSet {
  const albedoCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  const roughCanvas = document.createElement('canvas');
  albedoCanvas.width = bumpCanvas.width = roughCanvas.width = size;
  albedoCanvas.height = bumpCanvas.height = roughCanvas.height = size;

  const aCtx = albedoCanvas.getContext('2d')!;
  const bCtx = bumpCanvas.getContext('2d')!;
  const rCtx = roughCanvas.getContext('2d')!;

  const aImg = aCtx.createImageData(size, size);
  const bImg = bCtx.createImageData(size, size);
  const rImg = rCtx.createImageData(size, size);

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      // Eccentric stipe origin lies at (0.5, 0.36) in UV space
      const nx = (px / size - 0.5) * 2.0;
      const ny = (py / size - 0.36) * 1.85;
      const r = Math.min(1.15, Math.hypot(nx, ny));
      const angle = Math.atan2(ny, nx);

      // Strong radial silky fibrils + fine micro-grain + subtle concentric growth rings
      const radialFibril = fbm(Math.cos(angle) * 10 + r * 2.2, Math.sin(angle) * 10 + r * 2.2, 4);
      const microGrain = fbm(px * 0.11 * 512 / size, py * 0.11 * 512 / size, 3);
      const ring = 0.5 + 0.5 * Math.sin(r * 24 + radialFibril * 4.2);

      // Warm hazel-umber near the crown/notch blending into pearl-cream outer fan edge
      const umberCrown = Math.pow(Math.max(0, 1 - r * 0.92), 1.45);
      const streakMod = (radialFibril - 0.5) * 34 + (ring - 0.5) * 14;

      const baseR = 236 - umberCrown * 76 + streakMod + (microGrain - 0.5) * 14;
      const baseG = 221 - umberCrown * 88 + streakMod * 0.88 + (microGrain - 0.5) * 12;
      const baseB = 192 - umberCrown * 96 + streakMod * 0.74 + (microGrain - 0.5) * 10;

      const idx = (py * size + px) * 4;
      aImg.data[idx] = THREE.MathUtils.clamp(Math.round(baseR), 0, 255);
      aImg.data[idx + 1] = THREE.MathUtils.clamp(Math.round(baseG), 0, 255);
      aImg.data[idx + 2] = THREE.MathUtils.clamp(Math.round(baseB), 0, 255);
      aImg.data[idx + 3] = 255;

      const bumpVal = THREE.MathUtils.clamp(
        Math.round(
          128 + (radialFibril - 0.5) * 110 + (microGrain - 0.5) * 80 + (ring - 0.5) * 36,
        ),
        0,
        255,
      );
      bImg.data[idx] = bumpVal;
      bImg.data[idx + 1] = bumpVal;
      bImg.data[idx + 2] = bumpVal;
      bImg.data[idx + 3] = 255;

      const roughVal = THREE.MathUtils.clamp(
        Math.round(145 + r * 42 + (microGrain - 0.5) * 44),
        105,
        235,
      );
      rImg.data[idx] = roughVal;
      rImg.data[idx + 1] = roughVal;
      rImg.data[idx + 2] = roughVal;
      rImg.data[idx + 3] = 255;
    }
  }

  aCtx.putImageData(aImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);
  rCtx.putImageData(rImg, 0, 0);

  const albedo = new THREE.CanvasTexture(albedoCanvas);
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.anisotropy = anisotropy;

  const roughness = new THREE.CanvasTexture(roughCanvas);
  roughness.anisotropy = anisotropy;

  return { albedo, bump, roughness };
}

/**
 * Generates vertical fibrous striations & basal mycelial fuzz for mushroom stipes.
 */
export function createStipeTextures(anisotropy: number): {
  albedo: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
} {
  const size = 256;
  const albedoCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  albedoCanvas.width = bumpCanvas.width = size;
  albedoCanvas.height = bumpCanvas.height = size;

  const aCtx = albedoCanvas.getContext('2d')!;
  const bCtx = bumpCanvas.getContext('2d')!;
  const aImg = aCtx.createImageData(size, size);
  const bImg = bCtx.createImageData(size, size);

  for (let py = 0; py < size; py++) {
    // v = 0 near bark base (py=0 -> bottom or top depending on flipY; warm earthy transition at both extremes)
    const vNorm = py / size;
    const baseWarmth = Math.exp(-vNorm * 3.5);
    for (let px = 0; px < size; px++) {
      const fiber = fbm(px * 0.28, py * 0.032, 4);
      const fuzz = fbm(px * 0.16 + 12, py * 0.16 + 4, 3);
      const vShift = (fiber - 0.5) * 28 + (fuzz - 0.5) * 16;
      const idx = (py * size + px) * 4;

      aImg.data[idx] = THREE.MathUtils.clamp(Math.round(230 - baseWarmth * 24 + vShift), 0, 255);
      aImg.data[idx + 1] = THREE.MathUtils.clamp(Math.round(218 - baseWarmth * 30 + vShift), 0, 255);
      aImg.data[idx + 2] = THREE.MathUtils.clamp(
        Math.round(196 - baseWarmth * 38 + vShift * 0.85),
        0,
        255,
      );
      aImg.data[idx + 3] = 255;

      const bVal = THREE.MathUtils.clamp(Math.round(128 + (fiber - 0.5) * 155), 0, 255);
      bImg.data[idx] = bVal;
      bImg.data[idx + 1] = bVal;
      bImg.data[idx + 2] = bVal;
      bImg.data[idx + 3] = 255;
    }
  }

  aCtx.putImageData(aImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);

  const albedo = new THREE.CanvasTexture(albedoCanvas);
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
  albedo.anisotropy = anisotropy;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.anisotropy = anisotropy;

  return { albedo, bump };
}

/**
 * Generates dark weathered forest deadwood bark texture with rich crevice shadows and deep woodland moss.
 */
export function createBarkTextures(anisotropy: number, size = 512): {
  albedo: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
} {
  const albedoCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  albedoCanvas.width = bumpCanvas.width = size;
  albedoCanvas.height = bumpCanvas.height = size;

  const aCtx = albedoCanvas.getContext('2d')!;
  const bCtx = bumpCanvas.getContext('2d')!;
  const aImg = aCtx.createImageData(size, size);
  const bImg = bCtx.createImageData(size, size);

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const x = px * 512 / size;
      const y = py * 512 / size;
      const ridge = fbm(x * 0.048, y * 0.018, 4);
      const grain = fbm(x * 0.14, y * 0.09, 3);
      const crack = Math.pow(Math.abs(Math.sin(x * 0.065 + ridge * 5.6)), 0.6);
      const mossPatch = Math.max(0, fbm(x * 0.02 + 20, y * 0.02 + 8, 3) - 0.56) * 2.5;
      const mossClamp = THREE.MathUtils.clamp(mossPatch, 0, 0.82);

      // Rich deep espresso bark crevices -> weathered umber plates
      const barkR = 44 * crack + 14 + (grain - 0.5) * 14;
      const barkG = 33 * crack + 11 + (grain - 0.5) * 11;
      const barkB = 24 * crack + 8 + (grain - 0.5) * 9;

      // Deep dark forest moss (not bright mint)
      const mossR = 30 + (grain - 0.5) * 12;
      const mossG = 52 + (grain - 0.5) * 16;
      const mossB = 24 + (grain - 0.5) * 10;

      const idx = (py * size + px) * 4;
      aImg.data[idx] = THREE.MathUtils.clamp(
        Math.round(THREE.MathUtils.lerp(barkR, mossR, mossClamp)),
        0,
        255,
      );
      aImg.data[idx + 1] = THREE.MathUtils.clamp(
        Math.round(THREE.MathUtils.lerp(barkG, mossG, mossClamp)),
        0,
        255,
      );
      aImg.data[idx + 2] = THREE.MathUtils.clamp(
        Math.round(THREE.MathUtils.lerp(barkB, mossB, mossClamp)),
        0,
        255,
      );
      aImg.data[idx + 3] = 255;

      const bVal = THREE.MathUtils.clamp(
        Math.round(crack * 195 + ridge * 40 + (grain - 0.5) * 35),
        0,
        255,
      );
      bImg.data[idx] = bVal;
      bImg.data[idx + 1] = bVal;
      bImg.data[idx + 2] = bVal;
      bImg.data[idx + 3] = 255;
    }
  }

  aCtx.putImageData(aImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);

  const albedo = new THREE.CanvasTexture(albedoCanvas);
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
  albedo.anisotropy = anisotropy;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.anisotropy = anisotropy;

  return { albedo, bump };
}

/**
 * Generates a soft radial contact shadow disc texture for grounding the bark substrate.
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.08,
    size / 2,
    size / 2,
    size * 0.5,
  );
  grad.addColorStop(0, 'rgba(3, 8, 5, 0.92)');
  grad.addColorStop(0.55, 'rgba(5, 12, 8, 0.48)');
  grad.addColorStop(1, 'rgba(11, 22, 15, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
