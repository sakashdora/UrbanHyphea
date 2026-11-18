import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  OYSTER_CLUSTER_SPECS,
  buildBarkSubstrateGeometry,
  buildCurvedStipeGeometry,
  buildGillLamellaeGeometry,
  buildHyphaeTendrilGeometries,
  buildOysterCapGeometry,
  getBarkSurfaceY,
} from '../three/mushroomGeometry';
import {
  createBarkTextures,
  createContactShadowTexture,
  createOysterCapTextures,
  createStipeTextures,
} from '../three/mushroomTextures';
import { getCylinderFramingDistance } from '../three/cameraFraming';
import { SITE_IMAGES } from '../data/assets';

/** Direction the camera looks from (elevated three-quarter view). */
const VIEW_DIRECTION = new THREE.Vector3(2.6, 1.35, 3.4).normalize();

export function MushroomObservatory() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const motionPref = window.matchMedia('(prefers-reduced-motion: reduce)');

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = Math.max(container.clientWidth, 280);
    const height = Math.max(container.clientHeight, 320);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.setAttribute('aria-label', '3D model of an oyster mushroom cluster growing on bark. Drag to rotate.');
    renderer.domElement.setAttribute('role', 'img');

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 60);

    // Studio environment reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.28;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Natural daylight for the light page canvas
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcdd6cc, 0.95));

    const keyLight = new THREE.DirectionalLight(0xfffdf7, 2.4);
    keyLight.position.set(3.2, 4.8, 2.8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 14;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa7c957, 1.2);
    rimLight.position.set(-2.8, 2.2, -2.6);
    scene.add(rimLight);

    const gillLight = new THREE.PointLight(0xfcf2df, 1.2, 6, 1.5);
    gillLight.position.set(0.4, 0.45, 1.5);
    scene.add(gillLight);

    // Procedural textures
    const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const capTex = createOysterCapTextures(maxAnisotropy, 384);
    const stipeTex = createStipeTextures(maxAnisotropy);
    const barkTex = createBarkTextures(maxAnisotropy, 384);
    const shadowTex = createContactShadowTexture();

    const disposables: { dispose: () => void }[] = [
      capTex.albedo,
      capTex.bump,
      capTex.roughness,
      stipeTex.albedo,
      stipeTex.bump,
      barkTex.albedo,
      barkTex.bump,
      shadowTex,
      envTarget,
    ];

    // `stage` stays still (holds the ground shadow); `model` floats, sways and follows the pointer.
    const stage = new THREE.Group();
    scene.add(stage);
    const model = new THREE.Group();
    stage.add(model);

    // 1. Soft contact shadow on the floor
    const shadowGeo = new THREE.CircleGeometry(2.0, 48);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = 0.005;
    stage.add(shadowMesh);
    disposables.push(shadowGeo, shadowMat);

    // 2. Bark substrate
    const barkGeo = buildBarkSubstrateGeometry();
    const barkMat = new THREE.MeshStandardMaterial({
      map: barkTex.albedo,
      bumpMap: barkTex.bump,
      bumpScale: 0.04,
      roughness: 0.92,
      metalness: 0.0,
    });
    const barkMesh = new THREE.Mesh(barkGeo, barkMat);
    barkMesh.castShadow = true;
    barkMesh.receiveShadow = true;
    model.add(barkMesh);
    disposables.push(barkGeo, barkMat);

    // 3. Mycelium collar & hyphae tendrils
    const collarGeo = new THREE.SphereGeometry(0.24, 24, 14);
    collarGeo.scale(1.15, 0.28, 1.15);
    const hyphaeMat = new THREE.MeshStandardMaterial({
      color: 0xe8eedd,
      roughness: 0.88,
      metalness: 0.0,
    });
    const collarMesh = new THREE.Mesh(collarGeo, hyphaeMat);
    collarMesh.position.set(0, getBarkSurfaceY(0, 0) - 0.02, 0.02);
    model.add(collarMesh);
    disposables.push(collarGeo, hyphaeMat);

    for (const geo of buildHyphaeTendrilGeometries(20)) {
      model.add(new THREE.Mesh(geo, hyphaeMat));
      disposables.push(geo);
    }

    // 4. Stipe & gill materials
    const stipeMat = new THREE.MeshStandardMaterial({
      map: stipeTex.albedo,
      bumpMap: stipeTex.bump,
      bumpScale: 0.028,
      roughness: 0.82,
      metalness: 0.0,
      vertexColors: true,
    });

    const gillMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5ebda,
      roughness: 0.65,
      metalness: 0.0,
      sheen: 0.35,
      sheenRoughness: 0.65,
      sheenColor: new THREE.Color(0xfff8ed),
      vertexColors: true,
      side: THREE.DoubleSide,
    });
    disposables.push(stipeMat, gillMat);

    // 5. Oyster fruiting bodies
    const clusterGroup = new THREE.Group();
    clusterGroup.position.y = getBarkSurfaceY(0, 0) - 0.05;
    model.add(clusterGroup);

    const capGroups: THREE.Group[] = [];

    for (const spec of OYSTER_CLUSTER_SPECS) {
      const mushroomGroup = new THREE.Group();

      const stipeGeo = buildCurvedStipeGeometry(spec);
      const stipeMesh = new THREE.Mesh(stipeGeo, stipeMat);
      stipeMesh.castShadow = true;
      stipeMesh.receiveShadow = true;
      mushroomGroup.add(stipeMesh);
      disposables.push(stipeGeo);

      const capGroup = new THREE.Group();
      const topAnchor = spec.stemControlPoints[spec.stemControlPoints.length - 1];
      capGroup.position.set(topAnchor[0], topAnchor[1] - 0.02, topAnchor[2]);
      capGroup.rotation.set(spec.capPitch, spec.capYaw, spec.capRoll, 'YXZ');
      capGroup.userData.baseRotX = spec.capPitch;
      capGroup.userData.baseRotZ = spec.capRoll;

      const capGeo = buildOysterCapGeometry(spec);
      const capMat = new THREE.MeshPhysicalMaterial({
        color: spec.tintHex,
        map: capTex.albedo,
        bumpMap: capTex.bump,
        bumpScale: 0.038,
        roughnessMap: capTex.roughness,
        roughness: 0.74,
        metalness: 0.0,
        sheen: 0.45,
        sheenRoughness: 0.65,
        sheenColor: new THREE.Color(0xf5f1e8),
        clearcoat: 0.12,
        clearcoatRoughness: 0.58,
        vertexColors: true,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.castShadow = true;
      capMesh.receiveShadow = true;
      capGroup.add(capMesh);

      const gillGeo = buildGillLamellaeGeometry(spec);
      const gillMesh = new THREE.Mesh(gillGeo, gillMat);
      gillMesh.receiveShadow = true;
      capGroup.add(gillMesh);

      mushroomGroup.add(capGroup);
      clusterGroup.add(mushroomGroup);
      capGroups.push(capGroup);
      disposables.push(capGeo, capMat, gillGeo);
    }

    // ---- Camera framing: fit the whole specimen for every rotation angle ----
    // The model spins on Y, so frame a symmetric box using its widest horizontal reach.
    const rawBounds = new THREE.Box3().setFromObject(model);
    const reach = Math.max(
      Math.abs(rawBounds.min.x),
      Math.abs(rawBounds.max.x),
      Math.abs(rawBounds.min.z),
      Math.abs(rawBounds.max.z)
    );
    const fitBounds = new THREE.Box3(
      new THREE.Vector3(-reach, rawBounds.min.y, -reach),
      new THREE.Vector3(reach, rawBounds.max.y + 0.06, reach)
    );
    const target = fitBounds.getCenter(new THREE.Vector3());
    target.y -= 0.04;

    const frameCamera = () => {
      const aspect = camera.aspect;
      camera.fov = aspect < 0.9 ? 36 : 30;
      const distance = getCylinderFramingDistance(
        reach,
        fitBounds.min.y,
        fitBounds.max.y,
        target,
        VIEW_DIRECTION,
        camera.fov,
        aspect
      );
      camera.position.copy(target).addScaledVector(VIEW_DIRECTION, distance);
      camera.near = Math.max(0.05, distance - reach * 3);
      camera.far = distance + reach * 6;
      camera.updateProjectionMatrix();
      return distance;
    };

    let fitDistance = frameCamera();

    // ---- Controls: drag to orbit; no zoom/pan so page scroll is never hijacked ----
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.7;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.target.copy(target);
    controls.autoRotate = !motionPref.matches;
    controls.autoRotateSpeed = 0.9;
    controls.update();

    const syncControlDistance = () => {
      controls.minDistance = fitDistance;
      controls.maxDistance = fitDistance;
    };
    syncControlDistance();

    // Pause auto-rotate while the user drags, resume gently afterwards.
    let resumeTimer = 0;
    const onStart = () => {
      window.clearTimeout(resumeTimer);
      controls.autoRotate = false;
    };
    const onEnd = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        controls.autoRotate = !motionPref.matches;
      }, 2200);
    };
    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);

    // ---- Pointer parallax (desktop) & scroll-linked motion ----
    const pointer = { x: 0, y: 0 };
    const pointerEased = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let scrollProgress = 0;
    let scrollEased = 0;
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      scrollProgress = THREE.MathUtils.clamp((window.innerHeight - rect.bottom + rect.height) / total, 0, 1);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Render loop (pauses off-screen / in background tabs) ----
    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;
    let isVisible = true;
    let firstFrame = true;

    const renderScene = () => {
      frameId = 0;
      if (disposed || !isVisible || document.hidden) return;

      const reduce = motionPref.matches;
      const t = clock.getElapsedTime();
      const k = 0.06;

      pointerEased.x += (pointer.x - pointerEased.x) * k;
      pointerEased.y += (pointer.y - pointerEased.y) * k;
      scrollEased += (scrollProgress - scrollEased) * 0.1;

      if (!reduce) {
        // Gentle breathing float + sway
        model.position.y = Math.sin(t * 1.1) * 0.035;
        model.rotation.z = Math.sin(t * 0.7) * 0.015 + pointerEased.x * -0.04;
        model.rotation.x = Math.cos(t * 0.6) * 0.012 + pointerEased.y * 0.05;
        // Scroll adds a little extra spin as the hero leaves the viewport
        model.rotation.y = scrollEased * Math.PI * 0.6 + pointerEased.x * 0.18;

        // Caps flutter very slightly, out of phase with each other
        capGroups.forEach((cap, i) => {
          cap.rotation.x = cap.userData.baseRotX + Math.sin(t * 1.3 + i * 1.7) * 0.02;
          cap.rotation.z = cap.userData.baseRotZ + Math.cos(t * 1.1 + i * 2.3) * 0.018;
        });

        // Shadow tightens when the model rises
        const s = 1 - model.position.y * 1.2;
        shadowMesh.scale.set(s, 1, s);
        shadowMat.opacity = 0.45 - model.position.y * 1.5;
      }

      controls.update();
      renderer.render(scene, camera);

      if (firstFrame) {
        firstFrame = false;
        setReady(true);
      }
      frameId = requestAnimationFrame(renderScene);
    };

    const startRendering = () => {
      if (!frameId && !disposed && isVisible && !document.hidden) {
        frameId = requestAnimationFrame(renderScene);
      }
    };

    const stopRendering = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    startRendering();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) startRendering();
        else stopRendering();
      },
      { rootMargin: '120px' }
    );
    visibilityObserver.observe(container);

    const handleTabVisibility = () => {
      if (document.hidden) stopRendering();
      else if (isVisible) startRendering();
    };
    document.addEventListener('visibilitychange', handleTabVisibility);

    const handleResize = () => {
      if (disposed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      renderer.setSize(w, h);
      // Keep the current orbit angle, just refit the distance
      const dir = camera.position.clone().sub(controls.target).normalize();
      fitDistance = frameCamera();
      camera.position.copy(controls.target).addScaledVector(dir, fitDistance);
      syncControlDistance();
      controls.update();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      stopRendering();
      window.clearTimeout(resumeTimer);
      document.removeEventListener('visibilitychange', handleTabVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
      controls.dispose();
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-h-[620px] sm:aspect-[5/4] lg:aspect-square select-none">
      {/* Soft organic glow sitting behind the specimen (no box, no border) */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(167,201,87,0.22),rgba(167,201,87,0.08)_55%,transparent)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 bottom-[9%] -translate-x-1/2 w-[62%] h-[8%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(26,40,20,0.14),transparent)] blur-md pointer-events-none"
      />

      {/* WebGL mount: radial mask dissolves any edge so the model never sits in a visible frame */}
      <div
        ref={mountRef}
        className={`absolute inset-0 cursor-grab active:cursor-grabbing transition-opacity duration-1000 ease-out ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 62%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 62%, transparent 100%)',
        }}
      />

      {!webglSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <img
            src={SITE_IMAGES.heroMushrooms}
            alt="Oyster mushroom cluster"
            className="w-64 h-64 rounded-full object-cover mb-4 shadow-lg"
          />
          <p className="text-xs font-mono text-[#6b7280]">Pleurotus ostreatus · cultivated cluster</p>
        </div>
      )}
    </div>
  );
}
