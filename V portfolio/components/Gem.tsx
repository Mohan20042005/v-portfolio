"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useInView } from "motion/react";
import { Color, DoubleSide, EdgesGeometry, LatheGeometry, MathUtils, Vector2, type Group, type MeshPhysicalMaterial } from "three";
import type { Tone } from "@/lib/data";

const TONES: Record<Tone, string> = { gold: "#e2bf82", silver: "#dfe4ea", champagne: "#ead9bd" };

/** A faceted brilliant-cut stone: her work is jewellery & diamond retail, so the 3D piece is the product itself. */
function Stone({ tone }: { tone: Tone }) {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const mat = useRef<MeshPhysicalMaterial>(null);
  const geo = useMemo(() => new LatheGeometry([
    new Vector2(0, -1.05), new Vector2(0.92, 0.02), new Vector2(0.96, 0.1), new Vector2(0.62, 0.62), new Vector2(0, 0.62),
  ], 8), []);
  const edges = useMemo(() => new EdgesGeometry(geo, 20), [geo]);
  const target = useMemo(() => new Color(), []);
  useEffect(() => () => { geo.dispose(); edges.dispose(); }, [geo, edges]);
  useFrame((s, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.4;
    if (tilt.current) {
      tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, 0.28 - s.pointer.y * 0.45, 4, dt);
      tilt.current.rotation.z = MathUtils.damp(tilt.current.rotation.z, s.pointer.x * 0.3, 4, dt);
    }
    mat.current?.color.lerp(target.set(TONES[tone]), 1 - Math.exp(-4 * dt));
  });
  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh geometry={geo}>
          <meshPhysicalMaterial ref={mat} color={TONES[tone]} metalness={1} roughness={0.12} flatShading side={DoubleSide} envMapIntensity={1.6} clearcoat={1} />
        </mesh>
        <lineSegments geometry={edges}><lineBasicMaterial color="#ffffff" transparent opacity={0.5} /></lineSegments>
      </group>
    </group>
  );
}

function StaticGem() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="#a98550" strokeWidth="1">
      <path d="M50 88 L14 46 L24 30 L76 30 L86 46 Z M14 46 H86 M24 30 L38 46 L50 30 L62 46 L76 30 M38 46 L50 88 L62 46" />
    </svg>
  );
}

/** Lazy, self-pausing 3D stone. Falls back to a still line drawing on low-power devices, no WebGL, or reduced motion. */
export default function Gem({ tone = "champagne", className = "" }: { tone?: Tone; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    const low = (navigator.hardwareConcurrency ?? 4) < 4;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = false;
    try { const c = document.createElement("canvas"); gl = !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { gl = false; }
    setOk(gl && !low && !reduce);
  }, []);
  return (
    <div ref={ref} className={className} aria-hidden>
      {ok === null ? null : ok ? (
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.2], fov: 35 }} gl={{ alpha: true, antialias: true }} frameloop={inView ? "always" : "never"}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.5} />
          <Environment resolution={256}>
            <color attach="background" args={["#d8cfc0"]} />
            <Lightformer form="rect" intensity={6} position={[0, 5, -4]} scale={[10, 3, 1]} />
            <Lightformer form="rect" intensity={3} position={[-6, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 5, 1]} />
            <Lightformer form="ring" intensity={4} position={[5, 2, 3]} scale={4} />
          </Environment>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.7}><Stone tone={tone} /></Float>
        </Canvas>
      ) : <StaticGem />}
    </div>
  );
}
