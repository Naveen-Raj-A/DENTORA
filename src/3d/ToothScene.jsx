import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/assets/models/dental_arches.glb";

function hasWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

function disposeMaterial(mat) {
  if (!mat) return;
  const list = Array.isArray(mat) ? mat : [mat];
  for (const m of list) {
    for (const k of Object.keys(m || {})) {
      const v = m[k];
      if (v && typeof v === "object" && typeof v.dispose === "function" && v.isTexture) v.dispose();
    }
    if (typeof m.dispose === "function") m.dispose();
  }
}

function tuneMaterials(root) {
  root.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
    const apply = (m) => {
      if (!m) return m;
      const mat = m.clone ? m.clone() : m;
      const name = `${obj.name || ""} ${mat.name || ""}`.toLowerCase();
      const c = mat.color ? mat.color.clone() : new THREE.Color("#f4eee6");
      const lum = c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
      const isGum = /gum|ging|gum|tissue|mouth|pink|tongue/.test(name) || (c.r > c.g * 1.1 && c.r > c.b * 1.05 && lum < 0.72);
      const isTooth = /tooth|teeth|enamel|incisor|canine|molar|premolar|dent/.test(name) || (!isGum && lum > 0.55);

      if (isGum) {
        mat.color = new THREE.Color("#d97c8a");
        mat.roughness = Math.min(0.78, Math.max(0.45, mat.roughness ?? 0.62));
        mat.metalness = 0.0;
        if ("sheen" in mat) { mat.sheen = 0.18; mat.sheenRoughness = 0.55; mat.sheenColor = new THREE.Color("#f0b7bf"); }
        if ("clearcoat" in mat) mat.clearcoat = 0.06;
      } else if (isTooth) {
        mat.color = new THREE.Color("#f5efe6");
        mat.roughness = Math.min(0.34, Math.max(0.12, mat.roughness ?? 0.22));
        mat.metalness = 0.0;
        if ("clearcoat" in mat) { mat.clearcoat = 0.28; mat.clearcoatRoughness = 0.18; }
        if ("transmission" in mat && mat.transmission > 0) { mat.transmission = Math.min(mat.transmission, 0.08); }
        if ("ior" in mat) mat.ior = 1.45;
        if ("sheen" in mat) { mat.sheen = 0.08; mat.sheenColor = new THREE.Color("#fffaf2"); }
        mat.envMapIntensity = 0.9;
      } else {
        mat.roughness = Math.min(0.6, Math.max(0.18, mat.roughness ?? 0.35));
        mat.metalness = Math.min(0.15, mat.metalness ?? 0.02);
        mat.envMapIntensity = 0.85;
      }
      mat.needsUpdate = true;
      return mat;
    };

    if (Array.isArray(obj.material)) obj.material = obj.material.map(apply);
    else obj.material = apply(obj.material);
  });
}

function DentalArchModel({ controlsApi, reducedMotion }) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef();
  const controls = useRef();
  const { camera } = useThree();

  const prepared = useMemo(() => {
    const clone = scene.clone(true);
    tuneMaterials(clone);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    clone.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.35 / maxDim;
    clone.scale.setScalar(scale);
    // Re-center after scale and open presentation
    const box2 = new THREE.Box3().setFromObject(clone);
    const center2 = new THREE.Vector3();
    box2.getCenter(center2);
    clone.position.sub(center2);
    clone.position.y += 0.05;
    return clone;
  }, [scene]);

  useEffect(() => () => {
    prepared?.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        disposeMaterial(obj.material);
      }
    });
  }, [prepared]);

  useEffect(() => {
    if (!controlsApi) return;
    controlsApi.current = {
      reset: () => {
        camera.position.set(0, 0.45, 4.6);
        if (controls.current) {
          controls.current.target.set(0, 0.02, 0);
          controls.current.__active = false;
          controls.current.update();
        }
      },
    };
    controlsApi.current.reset();
    return () => { if (controlsApi) controlsApi.current = null; };
  }, [controlsApi, camera]);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (!reducedMotion) {
      group.current.position.y = 0.05 + Math.sin(state.clock.elapsedTime * 0.75) * 0.035;
      if (!controls.current?.__active) group.current.rotation.y += delta * 0.16;
    }
  });

  return (
    <>
      <group ref={group}>
        <primitive object={prepared} />
      </group>
      <OrbitControls
        ref={controls}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={2.8}
        maxDistance={7.2}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.72}
        onStart={() => { if (controls.current) controls.current.__active = true; }}
        onEnd={() => { if (controls.current) controls.current.__active = false; }}
      />
    </>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.34} color="#fff7f2" />
      <hemisphereLight args={["#fff1e8", "#3a1712", 0.55]} />
      <directionalLight position={[4.8, 6.2, 5.2]} intensity={1.18} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.00018} color="#fffaf3" />
      <directionalLight position={[-4.2, 2.6, 3.8]} intensity={0.38} color="#f3e0dc" />
      <directionalLight position={[0, 2.5, -5]} intensity={0.52} color="#d4a59a" />
      <spotLight position={[0.5, 5.5, 1.8]} angle={0.42} penumbra={0.85} intensity={0.35} color="#ffffff" />
    </>
  );
}

export function ToothScene({ reducedMotion = false, className = "", style = {} }) {
  const controlsApi = useRef(null);
  const [glOk] = useState(() => hasWebGL());
  const [err, setErr] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <div className={className} style={{ width: "100%", height: "100%", minHeight: 320, position: "relative", touchAction: "none", ...style }} aria-hidden="true">
      {glOk && !err ? (
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.45, 4.6], fov: 34, near: 0.1, far: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.02;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            setReady(true);
          }}
          onError={() => setErr(true)}
          style={{ position: "absolute", inset: 0 }}
        >
          <SceneLights />
          <Suspense fallback={null}>
            <DentalArchModel controlsApi={controlsApi} reducedMotion={reducedMotion} />
            <Environment preset="studio" environmentIntensity={0.55} />
            <ContactShadows position={[0, -1.18, 0]} opacity={0.26} scale={8.5} blur={2.8} far={4.2} color="#2a1714" />
          </Suspense>
        </Canvas>
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", padding: "1.25rem", color: "var(--petra-blush)" }}>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.35rem" }}>3D Dental Arch Preview</div>
            <div style={{ fontSize: "0.9rem", color: "rgba(243,224,220,.82)", lineHeight: 1.55 }}>Interactive 3D visualization is unavailable in this browser. The DENTORA experience and booking options remain available.</div>
          </div>
        </div>
      )}

      {glOk && !err && (
        <div style={{ position: "absolute", right: 10, top: 10, zIndex: 3, display: "flex", gap: 8, pointerEvents: "auto" }}>
          <button
            type="button"
            className="focus-outline"
            onClick={() => controlsApi.current?.reset?.()}
            aria-label="Reset 3D view"
            style={{ border: "1px solid rgba(243,224,220,.22)", background: "rgba(92,32,24,.38)", color: "#fff", borderRadius: 999, padding: "0.34rem 0.72rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", backdropFilter: "blur(6px)" }}
          >
            Reset view
          </button>
        </div>
      )}

      {glOk && !err && !ready && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--petra-dusty)", fontSize: "0.9rem", pointerEvents: "none" }}>Loading 3D dental arch…</div>
      )}
    </div>
  );
}

useGLTF.preload(MODEL_URL);

export default ToothScene;
