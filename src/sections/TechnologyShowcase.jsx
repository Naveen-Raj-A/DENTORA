import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SectionHeading } from "../components/common/SectionHeading";
import { ScrollReveal } from "../utils/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";

const NAVY = "#152935";
const BURGUNDY = "#5C2018";
const TERRACOTTA = "#BC4639";
const BLUSH = "#F3E0DC";

function hasWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

function useInView(rootMargin = "220px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } }, { rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [rootMargin, seen]);
  return [ref, seen];
}

function useDisposable(factory, deps) {
  const value = useMemo(factory, deps); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => {
    const dispose = (v) => {
      if (!v) return;
      if (Array.isArray(v)) v.forEach(dispose);
      else if (typeof v.dispose === "function") v.dispose();
      else if (typeof v === "object") Object.values(v).forEach(dispose);
    };
    dispose(value);
  }, [value]);
  return value;
}

function AutoSpin({ group, controls, reducedMotion, speed = 0.32 }) {
  useFrame((_, delta) => {
    if (!group.current || !controls.current) return;
    const active = controls.current.__active;
    if (!reducedMotion && !active) {
      group.current.rotation.y += delta * speed;
    }
    controls.current.update();
  });
  return null;
}

function ResetCamera({ controls, position, target }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!controls.current) return;
    const reset = () => {
      camera.position.set(...position);
      controls.current.target.set(...target);
      controls.current.update();
    };
    controls.current.__reset = reset;
    reset();
  }, [camera, controls, position, target]);
  return null;
}

function Pedestal({ accent = TERRACOTTA }) {
  const ring = useRef();
  useFrame((_, d) => { if (ring.current) ring.current.rotation.y += d * 0.45; });
  return (
    <group position={[0, -1.08, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[0.95, 1.05, 0.1, 48]} />
        <meshStandardMaterial color="#0e1d27" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.012, 48]} />
        <meshStandardMaterial color="#1b3342" roughness={0.35} metalness={0.18} emissive={accent} emissiveIntensity={0.08} />
      </mesh>
      <mesh ref={ring} position={[0, 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.012, 12, 64]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} roughness={0.3} metalness={0.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.28} color="#dbeafe" />
      <hemisphereLight args={["#9fb7c9", "#0b1821", 0.5]} />
      <directionalLight position={[3.5, 5.2, 4]} intensity={1.35} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-bias={-0.00015} color="#fff7ed" />
      <directionalLight position={[-4.5, 2.4, -2.5]} intensity={0.42} color="#bfe3ff" />
      <spotLight position={[0, 4.2, 1.5]} angle={0.42} penumbra={0.8} intensity={0.55} color="#ffffff" />
      <pointLight position={[-1.2, 0.4, 2.2]} intensity={0.22} color={BLUSH} distance={6} />
    </>
  );
}

function DentalImplantModel() {
  const postMat = useDisposable(() => new THREE.MeshStandardMaterial({ color: "#bcc6cf", roughness: 0.28, metalness: 0.92, envMapIntensity: 1.25 }), []);
  const threadMat = useDisposable(() => new THREE.MeshStandardMaterial({ color: "#aeb9c3", roughness: 0.34, metalness: 0.88, envMapIntensity: 1.15 }), []);
  const abutmentMat = useDisposable(() => new THREE.MeshStandardMaterial({ color: "#c7d0d8", roughness: 0.22, metalness: 0.82, envMapIntensity: 1.2 }), []);
  const crownMat = useDisposable(() => new THREE.MeshPhysicalMaterial({ color: "#f8f3ec", roughness: 0.16, metalness: 0.02, clearcoat: 0.72, clearcoatRoughness: 0.12, sheen: 0.12, sheenColor: new THREE.Color("#fffdf8"), envMapIntensity: 0.95 }), []);
  return (
    <group position={[0, 0.08, 0]} scale={1.08}>
      <mesh position={[0, -0.42, 0]} castShadow receiveShadow material={postMat}>
        <cylinderGeometry args={[0.19, 0.09, 1.05, 28]} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, -0.06 - i * 0.115, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow material={threadMat}>
          <torusGeometry args={[0.175 - i * 0.0085, 0.018, 10, 26]} />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0]} castShadow material={abutmentMat}>
        <cylinderGeometry args={[0.13, 0.16, 0.22, 24]} />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow material={crownMat}>
        <cylinderGeometry args={[0.33, 0.36, 0.56, 28]} />
      </mesh>
      <mesh position={[0, 0.82, 0]} scale={[1, 0.7, 0.95]} castShadow material={crownMat}>
        <sphereGeometry args={[0.34, 28, 22, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
      </mesh>
    </group>
  );
}

function CustomCrownModel() {
  const ceramic = useDisposable(() => new THREE.MeshPhysicalMaterial({
    color: "#fbf8f2",
    roughness: 0.14,
    metalness: 0.01,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    transmission: 0.03,
    thickness: 0.35,
    ior: 1.45,
    sheen: 0.16,
    sheenColor: new THREE.Color("#fffaf1"),
    envMapIntensity: 1.15,
    specularIntensity: 0.7,
  }), []);
  return (
    <group position={[0, -0.08, 0]} scale={1.12}>
      <mesh castShadow material={ceramic}>
        <sphereGeometry args={[0.76, 36, 32, 0, Math.PI * 2, 0, Math.PI / 1.52]} />
      </mesh>
      <mesh position={[0, -0.3, 0]} scale={[0.95, 0.72, 0.9]} castShadow material={ceramic}>
        <cylinderGeometry args={[0.69, 0.56, 0.58, 36]} />
      </mesh>
      <mesh position={[0, -0.56, 0]} castShadow material={ceramic}>
        <torusGeometry args={[0.52, 0.045, 14, 42]} />
      </mesh>
    </group>
  );
}

function ClearAlignerModel() {
  const aligner = useDisposable(() => new THREE.MeshPhysicalMaterial({
    color: "#d9eef7",
    roughness: 0.045,
    metalness: 0.0,
    transparent: true,
    opacity: 0.34,
    transmission: 0.82,
    thickness: 0.22,
    ior: 1.42,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.35,
    specularIntensity: 0.9,
    attenuationColor: new THREE.Color("#bfe8f7"),
    attenuationDistance: 1.4,
    side: THREE.DoubleSide,
  }), []);
  return (
    <group rotation={[0.24, 0, 0]} scale={1.02}>
      <mesh castShadow material={aligner}>
        <torusGeometry args={[0.8, 0.23, 20, 56, Math.PI]} />
      </mesh>
      <mesh rotation={[Math.PI, 0, 0]} castShadow material={aligner}>
        <torusGeometry args={[0.8, 0.23, 20, 56, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.0, 0.02]} material={aligner}>
        <torusGeometry args={[0.8, 0.205, 14, 56, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.0, 0.02]} rotation={[Math.PI, 0, 0]} material={aligner}>
        <torusGeometry args={[0.8, 0.205, 14, 56, Math.PI]} />
      </mesh>
    </group>
  );
}

function ToothAnatomyModel() {
  const enamel = useDisposable(() => new THREE.MeshPhysicalMaterial({ color: "#f8f3ea", roughness: 0.2, metalness: 0.01, clearcoat: 0.55, clearcoatRoughness: 0.16, envMapIntensity: 0.95 }), []);
  const dentin = useDisposable(() => new THREE.MeshPhysicalMaterial({ color: "#e7cfa8", roughness: 0.42, metalness: 0.0, envMapIntensity: 0.45 }), []);
  const pulp = useDisposable(() => new THREE.MeshPhysicalMaterial({ color: "#c84b58", roughness: 0.38, metalness: 0.0, emissive: new THREE.Color("#8f2430"), emissiveIntensity: 0.12 }), []);
  const crownGeo = useDisposable(() => {
    const pts = [new THREE.Vector2(0, 1.02), new THREE.Vector2(0.48, 0.96), new THREE.Vector2(0.88, 0.72), new THREE.Vector2(0.98, 0.18), new THREE.Vector2(0.78, -0.2), new THREE.Vector2(0.36, -0.34), new THREE.Vector2(0, -0.36)];
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  const dentinGeo = useDisposable(() => {
    const pts = [new THREE.Vector2(0, 0.86), new THREE.Vector2(0.36, 0.8), new THREE.Vector2(0.68, 0.56), new THREE.Vector2(0.76, 0.14), new THREE.Vector2(0.58, -0.14), new THREE.Vector2(0.24, -0.24), new THREE.Vector2(0, -0.25)];
    return new THREE.LatheGeometry(pts, 40);
  }, []);
  return (
    <group position={[0, -0.02, 0]}>
      <mesh geometry={crownGeo} material={enamel} castShadow receiveShadow />
      <mesh geometry={dentinGeo} material={dentin} position={[0, 0.02, 0]} />
      <mesh position={[0, 0.08, 0]} material={pulp} castShadow>
        <capsuleGeometry args={[0.16, 0.52, 8, 16]} />
      </mesh>
      <mesh position={[-0.38, -0.58, 0.08]} rotation={[0.08, 0, 0.22]} material={enamel} castShadow>
        <capsuleGeometry args={[0.14, 0.72, 6, 14]} />
      </mesh>
      <mesh position={[0.38, -0.58, 0.08]} rotation={[0.08, 0, -0.22]} material={enamel} castShadow>
        <capsuleGeometry args={[0.14, 0.72, 6, 14]} />
      </mesh>
      <mesh position={[0, -0.62, -0.28]} rotation={[0.2, 0, 0]} material={enamel} castShadow>
        <capsuleGeometry args={[0.13, 0.78, 6, 14]} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.09, 0.44, 6, 12]} />
        <meshPhysicalMaterial color="#d86a75" transparent opacity={0.45} roughness={0.5} emissive="#8f2430" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

function ModelStage({ children, reducedMotion, controlsApi }) {
  const group = useRef();
  const controls = useRef();
  const pos = [0.1, 0.45, 3.35];
  const target = [0, 0.05, 0];

  useEffect(() => {
    if (!controlsApi) return;
    controlsApi.current = {
      reset: () => controls.current?.__reset?.(),
    };
    return () => {
      if (controlsApi.current) controlsApi.current = null;
    };
  }, [controlsApi]);

  return (
    <>
      <color attach="background" args={[NAVY]} />
      <StudioLights />
      <Suspense fallback={null}>
        <group ref={group}>{children}</group>
        <Pedestal />
        <Environment preset="studio" environmentIntensity={0.42} />
        <ContactShadows position={[0, -1.13, 0]} opacity={0.38} scale={7.2} blur={2.5} far={3.4} color="#08141c" />
      </Suspense>
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.45}
        maxDistance={4.6}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.68}
        onStart={() => { if (controls.current) controls.current.__active = true; }}
        onEnd={() => { if (controls.current) controls.current.__active = false; }}
      />
      <ResetCamera controls={controls} position={pos} target={target} />
      <AutoSpin group={group} controls={controls} reducedMotion={reducedMotion} />
    </>
  );
}

function Viewer({ title, desc, Model }) {
  const [wrapRef, seen] = useInView();
  const reduced = useReducedMotion();
  const controlsApi = useRef(null);
  const [glOk] = useState(() => hasWebGL());
  const [err, setErr] = useState(false);
  const show3d = seen && glOk && !err;

  return (
    <ScrollReveal style={{ width: "100%", minWidth: 0, height: "100%" }}>
      <article className="card-premium technology-card" style={{ overflow: "hidden", background: "#fff", borderColor: "rgba(92,32,24,0.08)", display: "flex", flexDirection: "column", width: "100%", minWidth: 0, height: "100%", minHeight: 520 }}>
        <div ref={wrapRef} data-viewer={title} style={{ position: "relative", height: 320, background: NAVY, isolation: "isolate" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 38%, rgba(188,70,57,.22), rgba(21,41,53,0) 48%), radial-gradient(circle at 50% 58%, rgba(243,224,220,.08), rgba(21,41,53,0) 55%), linear-gradient(180deg, #183243, ${NAVY})`, pointerEvents: "none" }} />
          {show3d ? (
            <Canvas
              shadows
              dpr={[1, 1.5]}
              camera={{ position: [0.1, 0.45, 3.35], fov: 34, near: 0.1, far: 30 }}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color(NAVY), 1);
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.0;
                gl.outputColorSpace = THREE.SRGBColorSpace;
              }}
              onError={() => setErr(true)}
              style={{ position: "absolute", inset: 0, touchAction: "none" }}
            >
              <ModelStage reducedMotion={reduced} controlsApi={controlsApi}>{<Model />}</ModelStage>
            </Canvas>
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: "1.25rem", textAlign: "center", color: BLUSH, zIndex: 1 }}>
              <div>
                <div style={{ fontSize: "0.78rem", letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(243,224,220,.72)", marginBottom: "0.35rem" }}>3D Preview</div>
                <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.35rem" }}>{title}</div>
                <div style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(243,224,220,.78)" }}>{!glOk || err ? "Interactive 3D is unavailable in this browser. The treatment details below remain available." : "Loading interactive 3D view…"}</div>
              </div>
            </div>
          )}
          {show3d && (
            <>
              <div style={{ position: "absolute", left: 12, bottom: 10, zIndex: 2, display: "flex", gap: 8, flexWrap: "wrap", pointerEvents: "none" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#fff", background: "rgba(92,32,24,.58)", border: "1px solid rgba(243,224,220,.14)", padding: "0.22rem 0.5rem", borderRadius: 999, backdropFilter: "blur(4px)" }}>Drag to rotate</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: BLUSH, background: "rgba(21,41,53,.72)", border: "1px solid rgba(243,224,220,.14)", padding: "0.22rem 0.5rem", borderRadius: 999 }}>Scroll / pinch to zoom</span>
              </div>
              <button
                type="button"
                className="focus-outline"
                onClick={() => controlsApi.current?.reset?.()}
                style={{ position: "absolute", right: 10, top: 10, zIndex: 2, border: "1px solid rgba(243,224,220,.18)", background: "rgba(21,41,53,.72)", color: "#fff", borderRadius: 999, padding: "0.28rem 0.6rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", backdropFilter: "blur(4px)" }}
                aria-label={`Reset ${title} camera`}
              >
                Reset view
              </button>
            </>
          )}
        </div>
        <div style={{ padding: "1.15rem 1.15rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, fontSize: "1.12rem", fontWeight: 700, color: "var(--midnight)" }}>{title}</h3>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: TERRACOTTA, background: "rgba(188,70,57,.08)", border: "1px solid rgba(188,70,57,.18)", padding: "0.22rem 0.55rem", borderRadius: 999 }}>Explore 3D</span>
          </div>
          <p style={{ margin: 0, color: "var(--slate)", fontSize: "0.94rem", lineHeight: 1.65 }}>{desc}</p>
          <div style={{ marginTop: "auto", paddingTop: "0.35rem", display: "flex", gap: "0.5rem", alignItems: "center", color: "#8A7772", fontSize: "0.8rem" }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 99, background: TERRACOTTA, boxShadow: "0 0 0 3px rgba(188,70,57,.14)" }} />
            Interactive procedural model · {reduced ? "motion reduced" : "auto-rotates when idle"}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function TechnologyShowcase() {
  const items = [
    { title: "Dental Implant", desc: "Brushed titanium post with a ceramic restoration concept—designed to visualize stable tooth replacement.", Model: DentalImplantModel },
    { title: "Custom Crown", desc: "Pearl-white ceramic crown form with a glossy, realistic finish shaped for fit and function.", Model: CustomCrownModel },
    { title: "Clear Aligner", desc: "Transparent aligner material with a subtle blue tint and controlled reflections for discreet guidance.", Model: ClearAlignerModel },
    { title: "Tooth Anatomy", desc: "Layered anatomical view distinguishing natural enamel, warm dentin, and pulp structure.", Model: ToothAnatomyModel },
  ];

  return (
    <section className="section-pad" style={{ background: BURGUNDY, color: "#fff", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 12% 18%, rgba(188,70,57,.24), transparent 28%), radial-gradient(circle at 88% 72%, rgba(243,224,220,.08), transparent 26%)" }} />
      <div className="container-narrow" style={{ position: "relative" }}>
        <SectionHeading
          eyebrow="Technology"
          title="3D Dental Technology Experience"
          subtitle="Interact with procedural treatment models in a dedicated viewing space. Drag to rotate, zoom to inspect, and explore realistic materials. (Illustrative educational models)"
          align="center"
          light
        />
        <div className="technology-grid">
          {items.map((it) => (
            <Viewer key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
