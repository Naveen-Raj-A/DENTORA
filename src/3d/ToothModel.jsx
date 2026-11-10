import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Original procedural molar-inspired model (no external GLB). Anatomical cues:
 * rounded crown with cusps, cervical contour, furcation and three tapered curved roots.
 * MeshPhysicalMaterial for enamel-like response. Optimized geometry counts.
 */
export function ToothModel({ reducedMotion = false, pointer = { x: 0, y: 0 } }) {
  const group = useRef();
  const baseRot = useRef({ x: -0.18, y: 0.42 });

  const materials = useMemo(() => {
    const enamel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f7f2e8"),
      roughness: 0.18,
      metalness: 0.015,
      clearcoat: 0.72,
      clearcoatRoughness: 0.14,
      sheen: 0.18,
      sheenRoughness: 0.35,
      sheenColor: new THREE.Color("#fff8ee"),
      specularIntensity: 0.55,
      envMapIntensity: 1.05,
    });
    const root = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#e5d9ca"),
      roughness: 0.42,
      metalness: 0.0,
      clearcoat: 0.12,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.7,
    });
    const fissure = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("#ece4d6"), roughness: 0.32, clearcoat: 0.25 });
    return { enamel, root, fissure };
  }, []);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const sy = typeof window !== "undefined" ? Math.min(1, window.scrollY / 600) : 0;
    if (reducedMotion) {
      g.rotation.set(baseRot.current.x, baseRot.current.y, 0);
      g.position.y = 0;
      return;
    }
    const t = clock.elapsedTime;
    g.position.y = Math.sin(t * 0.85) * 0.055;
    const targetY = baseRot.current.y + t * 0.16 + pointer.x * 0.32 + sy * 0.18;
    const targetX = baseRot.current.x + pointer.y * 0.2 - sy * 0.06;
    g.rotation.y += (targetY - g.rotation.y) * 0.055;
    g.rotation.x += (targetX - g.rotation.x) * 0.055;
  });

  const crownGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 1.08),
      new THREE.Vector2(0.18, 1.06),
      new THREE.Vector2(0.46, 1.0),
      new THREE.Vector2(0.72, 0.88),
      new THREE.Vector2(0.9, 0.66),
      new THREE.Vector2(0.99, 0.38),
      new THREE.Vector2(1.0, 0.08),
      new THREE.Vector2(0.95, -0.12),
      new THREE.Vector2(0.84, -0.24),
      new THREE.Vector2(0.66, -0.32),
      new THREE.Vector2(0.44, -0.37),
      new THREE.Vector2(0.0, -0.39),
    ];
    const g = new THREE.LatheGeometry(pts, 56);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      if (v.y > 0.55) {
        const a = Math.atan2(v.z, v.x);
        const cusp = (Math.max(0, Math.sin(a * 2)) * 0.06 + Math.max(0, Math.cos(a * 2)) * 0.045) * Math.max(0, (v.y - 0.55) / 0.55);
        v.y += cusp;
        v.x *= 1 + cusp * 0.12;
        v.z *= 1 + cusp * 0.12;
      }
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const cuspGeo = useMemo(() => new THREE.SphereGeometry(0.2, 20, 16), []);
  const fissureGeo = useMemo(() => new THREE.TorusGeometry(0.28, 0.018, 10, 28, Math.PI * 1.2), []);

  const Root = ({ position, rotation, scale = [1, 1, 1], bend = 0.02 }) => {
    const curve = useMemo(() => {
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.0, 0),
        new THREE.Vector3(bend, -0.32, 0.015),
        new THREE.Vector3(-bend * 0.6, -0.72, -0.015),
        new THREE.Vector3(bend * 0.4, -1.12, 0.01),
      ]);
    }, [bend]);
    const geo = useMemo(() => new THREE.TubeGeometry(curve, 22, 0.155, 14, false), [curve]);
    const tipGeo = useMemo(() => {
      const c = new THREE.CatmullRomCurve3([
        new THREE.Vector3(bend * 0.4, -1.02, 0.01),
        new THREE.Vector3(bend * 0.15, -1.28, 0.0),
        new THREE.Vector3(0.0, -1.46, 0.0),
      ]);
      return new THREE.TubeGeometry(c, 12, 0.085, 12, false);
    }, [bend]);
    return (
      <group position={position} rotation={rotation} scale={scale}>
        <mesh geometry={geo} material={materials.root} castShadow receiveShadow />
        <mesh geometry={tipGeo} material={materials.root} castShadow receiveShadow />
        <mesh position={[0, -1.47, 0]} castShadow>
          <sphereGeometry args={[0.065, 10, 10]} />
          <primitive object={materials.root} attach="material" />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={group} position={[0, 0.02, 0]} scale={1.02}>
      <mesh geometry={crownGeo} material={materials.enamel} castShadow receiveShadow />
      {[
        [0.44, 0.9, 0.3],
        [-0.42, 0.88, 0.28],
        [0.4, 0.88, -0.32],
        [-0.38, 0.86, -0.3],
      ].map((p, i) => (
        <mesh key={i} position={p} geometry={cuspGeo} material={materials.enamel} scale={i % 2 ? 0.92 : 1.02} castShadow />
      ))}
      <mesh position={[0.02, 0.78, 0]} rotation={[1.2, 0.4, 0]} geometry={fissureGeo} material={materials.fissure} />
      <mesh position={[0, -0.43, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.065, 14, 48]} />
        <primitive object={materials.enamel} attach="material" />
      </mesh>
      <Root position={[-0.4, -0.4, 0.14]} rotation={[0.06, 0, 0.24]} bend={0.03} />
      <Root position={[0.4, -0.4, 0.14]} rotation={[0.06, 0, -0.24]} bend={-0.03} />
      <Root position={[0, -0.4, -0.36]} rotation={[0.2, 0, 0]} scale={[0.93, 1.06, 0.93]} bend={0.015} />
    </group>
  );
}

