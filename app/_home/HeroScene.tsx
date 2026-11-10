"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { getProject, heroLineup, type Device } from "../content/projects";

/**
 * Escena del hero: una laptop con una pagina web al centro y dos telefonos a
 * los lados, segun `heroLineup` (app/content/projects.ts). Todo es geometria
 * generada: no hay modelos .glb que descargar. Los reflejos salen de un
 * entorno de estudio generado en el momento (RoomEnvironment).
 */

interface SceneProps {
  paused: boolean;
  /** Puntero fino (mouse): parallax y hover. En tactil la escena se mece sola. */
  interactive: boolean;
  /** Elemento que recibe los eventos (la seccion del hero completa). */
  eventSource: HTMLElement | null;
  onReady: () => void;
  onSelect: (id: string) => void;
}

/* Medidas en unidades de la escena. Las pantallas respetan la proporcion de
   las capturas (telefono 9:20, laptop 16:10) para no deformarlas. */
const PHONE = { w: 0.94, h: 1.96, d: 0.085, r: 0.14, screenW: 0.86 };
const PHONE_SCREEN_H = PHONE.screenW * (2400 / 1080);
const LAPTOP = { w: 3.1, h: 1.98, lid: 0.045, baseH: 0.07, baseD: 2.05, screenW: 2.92 };
const LAPTOP_SCREEN_H = LAPTOP.screenW * (10 / 16);
const FLOOR_Y = -1.2;

/* Posiciones de base (se comprimen en pantallas angostas). */
/* Los telefonos van adelante y montados sobre los bordes de la laptop: asi el
   conjunto queda compacto y cada dispositivo se ve grande. */
const SLOTS: { pos: [number, number, number]; rot: [number, number, number] }[] = [
  { pos: [-1.42, -0.22, 1.0], rot: [0.02, 0.3, 0.03] },
  { pos: [0.05, FLOOR_Y, -0.55], rot: [0, -0.05, 0] },
  { pos: [1.52, -0.3, 0.85], rot: [0.02, -0.32, -0.03] },
];

export default function HeroScene({ paused, interactive, eventSource, onReady, onSelect }: SceneProps) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.05, 8], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
      onCreated={({ camera }) => camera.lookAt(0, -0.25, 0)}
      style={{ position: "absolute", inset: 0 }}
    >
      <Environment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <pointLight position={[-5, 1.5, 3]} intensity={18} color="#22d3ee" />
      <pointLight position={[5, 0, 3]} intensity={12} color="#a78bfa" />
      <Suspense fallback={null}>
        <Devices interactive={interactive} onSelect={onSelect} />
        <Ready onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

/** Entorno de estudio para los reflejos del metal y el vidrio. */
function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/** Avisa cuando las texturas ya cargaron y se pinto el primer cuadro. */
function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    let b = 0;
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(onReady);
    });
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [onReady]);
  return null;
}

type Slot = { id: string | null; device: Device; screen: string | null };

function Devices({ interactive, onSelect }: { interactive: boolean; onSelect: (id: string) => void }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const { gl, camera, size } = useThree();

  const slots: Slot[] = heroLineup.map((l) => {
    const p = getProject(l.id);
    return { id: p?.id ?? null, device: l.device, screen: p?.screens[0] ?? null };
  });

  // Solo se cargan las capturas que existen; el hueco en blanco no carga nada.
  const urls = slots.map((s) => s.screen).filter((u): u is string => Boolean(u));
  const loaded = useLoader(THREE.TextureLoader, urls);
  const key = urls.join("|");
  const textures = useMemo(() => {
    const max = gl.capabilities.getMaxAnisotropy();
    let k = 0;
    return slots.map((s) => {
      if (!s.screen) return blankTexture();
      const tex = loaded[k++];
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = max;
      tex.needsUpdate = true;
      return tex;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // En pantallas angostas los dispositivos se juntan y la camara se aleja lo
  // justo para que quepan.
  const aspect = size.width / Math.max(size.height, 1);
  const spread = THREE.MathUtils.clamp(aspect / 1.1, 0.72, 1);
  useEffect(() => {
    // Medio ancho del conjunto, con margen por la perspectiva de los telefonos
    // que van adelante; la camara se aleja lo justo para que quepa.
    const halfWidth = (1.52 * spread + 0.55) * 1.15 + 0.15;
    const z = halfWidth / (Math.tan(THREE.MathUtils.degToRad(15)) * aspect);
    camera.position.z = THREE.MathUtils.clamp(z, 6.8, 13);
    camera.lookAt(0, -0.25, 0);
    camera.updateProjectionMatrix();
  }, [camera, aspect, spread]);

  useEffect(() => {
    const target = (gl.domElement.closest("section") as HTMLElement | null) ?? document.body;
    const clickable = hovered !== null && Boolean(slots[hovered]?.id);
    target.style.cursor = clickable ? "pointer" : "";
    return () => {
      target.style.cursor = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, gl]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // Entrada: sube desde abajo la primera vez.
    g.position.y = THREE.MathUtils.damp(g.position.y, 0, 2.6, delta);
    if (interactive) {
      const px = THREE.MathUtils.clamp(state.pointer.x, -1.3, 1.3);
      const py = THREE.MathUtils.clamp(state.pointer.y, -1.3, 1.3);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.18, 4, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.06, 4, delta);
    } else {
      g.rotation.y = Math.sin(t * 0.3) * 0.12;
    }
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {slots.map((s, i) => {
        const slot = SLOTS[i] ?? SLOTS[0];
        const pos: [number, number, number] = [slot.pos[0] * spread, slot.pos[1], slot.pos[2]];
        const props: DeviceProps = {
          index: i,
          pos,
          rot: slot.rot,
          texture: textures[i],
          hovered: hovered === i,
          onHover: (on: boolean) => setHovered((h) => (on ? i : h === i ? null : h)),
          onSelect: s.id ? () => onSelect(s.id!) : undefined,
        };
        return s.device === "web" ? <Laptop key={i} {...props} /> : <Phone key={i} {...props} />;
      })}
    </group>
  );
}

interface DeviceProps {
  index: number;
  pos: [number, number, number];
  rot: [number, number, number];
  texture: THREE.Texture;
  hovered: boolean;
  onHover: (on: boolean) => void;
  onSelect?: () => void;
}

/** Eventos comunes: hover y clic (solo si el dispositivo tiene proyecto). */
function deviceEvents({ onHover, onSelect }: Pick<DeviceProps, "onHover" | "onSelect">) {
  return {
    onPointerOver: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onHover(true);
    },
    onPointerOut: () => onHover(false),
    onClick: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onSelect?.();
    },
  };
}

function Phone({ index, pos, rot, texture, hovered, onHover, onSelect }: DeviceProps) {
  const ref = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const geo = usePhoneGeometry();
  const shadowTex = useShadowTexture();
  const events = deviceEvents({ onHover, onSelect });

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const bob = Math.sin(t * 0.85 + index * 1.9) * 0.07;
    const active = hovered && Boolean(onSelect);
    g.position.x = pos[0];
    g.position.y = THREE.MathUtils.damp(g.position.y, pos[1] + bob, 5, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, pos[2] + (active ? 0.32 : 0), 5, delta);
    g.rotation.x = rot[0];
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, active ? rot[1] * 0.35 : rot[1], 5, delta);
    g.rotation.z = rot[2] + Math.sin(t * 0.6 + index) * 0.015;
    // La sombra se achica cuando el telefono sube.
    if (shadow.current) shadow.current.scale.setScalar(1 - (g.position.y - pos[1]) * 0.8);
  });

  const front = PHONE.d / 2;

  return (
    <>
      <mesh ref={shadow} position={[pos[0], FLOOR_Y + 0.005, pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.75]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} opacity={0.55} />
      </mesh>
      <group ref={ref} position={pos} rotation={rot} {...events}>
        {/* Marco de metal */}
        <mesh geometry={geo.body}>
          <meshStandardMaterial color="#2a2e37" metalness={1} roughness={0.28} />
        </mesh>
        {/* Vidrio frontal negro: el bisel alrededor de la pantalla */}
        <mesh geometry={geo.glass} position={[0, 0, front + 0.001]}>
          <meshStandardMaterial color="#030407" metalness={0.2} roughness={0.08} />
        </mesh>
        <mesh geometry={geo.screen} position={[0, 0, front + 0.002]}>
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* Isla */}
        <mesh geometry={geo.island} position={[0, PHONE_SCREEN_H / 2 - 0.075, front + 0.003]}>
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Botones laterales */}
        <SideButton x={PHONE.w / 2 + 0.006} y={0.38} h={0.26} />
        <SideButton x={-PHONE.w / 2 - 0.006} y={0.5} h={0.16} />
        <SideButton x={-PHONE.w / 2 - 0.006} y={0.28} h={0.16} />
      </group>
    </>
  );
}

function SideButton({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <mesh position={[x, y, 0]}>
      <boxGeometry args={[0.014, h, 0.04]} />
      <meshStandardMaterial color="#2a2e37" metalness={1} roughness={0.3} />
    </mesh>
  );
}

function Laptop({ index, pos, rot, texture, hovered, onHover, onSelect }: DeviceProps) {
  const ref = useRef<THREE.Group>(null);
  const geo = useLaptopGeometry();
  const shadowTex = useShadowTexture();
  const events = deviceEvents({ onHover, onSelect });

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const active = hovered && Boolean(onSelect);
    g.position.x = pos[0];
    g.position.y = pos[1];
    g.position.z = THREE.MathUtils.damp(g.position.z, pos[2] + (active ? 0.25 : 0), 5, delta);
    g.rotation.set(rot[0], rot[1] + Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.01, rot[2]);
  });

  // Bisagra al fondo de la base; la tapa abre unos 105 grados.
  const hingeZ = -LAPTOP.baseD / 2 + 0.04;

  return (
    <group ref={ref} position={pos} rotation={rot} scale={0.94} {...events}>
      <mesh position={[0, 0.003, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 3.2]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} opacity={0.7} />
      </mesh>
      {/* Base */}
      <mesh geometry={geo.base} position={[0, LAPTOP.baseH / 2, 0]}>
        <meshStandardMaterial color="#3a3e48" metalness={0.95} roughness={0.32} />
      </mesh>
      {/* Teclado y trackpad */}
      <mesh position={[0, LAPTOP.baseH + 0.002, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.62, 0.98]} />
        <meshStandardMaterial color="#14161b" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, LAPTOP.baseH + 0.002, 0.58]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 0.6]} />
        <meshStandardMaterial color="#454a55" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Tapa con pantalla */}
      <group position={[0, LAPTOP.baseH, hingeZ]} rotation={[-0.27, 0, 0]}>
        <mesh geometry={geo.lid} position={[0, LAPTOP.h / 2, 0]}>
          <meshStandardMaterial color="#3a3e48" metalness={0.95} roughness={0.32} />
        </mesh>
        <mesh geometry={geo.bezel} position={[0, LAPTOP.h / 2, LAPTOP.lid / 2 + 0.001]}>
          <meshStandardMaterial color="#05060a" metalness={0.2} roughness={0.1} />
        </mesh>
        <mesh geometry={geo.screen} position={[0, LAPTOP.h / 2 + 0.035, LAPTOP.lid / 2 + 0.002]}>
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ───────────── geometrias compartidas ───────────── */

function usePhoneGeometry() {
  const geo = useMemo(
    () => ({
      body: new RoundedBoxGeometry(PHONE.w, PHONE.h, PHONE.d, 6, PHONE.r),
      glass: roundedPlane(PHONE.w - 0.03, PHONE.h - 0.03, PHONE.r - 0.015),
      screen: roundedPlane(PHONE.screenW, PHONE_SCREEN_H, 0.105),
      island: roundedPlane(0.24, 0.07, 0.035),
    }),
    [],
  );
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);
  return geo;
}

function useLaptopGeometry() {
  const geo = useMemo(
    () => ({
      base: new RoundedBoxGeometry(LAPTOP.w + 0.1, LAPTOP.baseH, LAPTOP.baseD, 4, 0.03),
      lid: new RoundedBoxGeometry(LAPTOP.w, LAPTOP.h, LAPTOP.lid, 4, 0.02),
      bezel: roundedPlane(LAPTOP.w - 0.03, LAPTOP.h - 0.03, 0.06),
      screen: roundedPlane(LAPTOP.screenW, LAPTOP_SCREEN_H, 0.02),
    }),
    [],
  );
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);
  return geo;
}

/** Sombra de contacto: un degradado radial en el piso, compartido. */
let shadowCache: THREE.CanvasTexture | null = null;
function useShadowTexture() {
  return useMemo(() => {
    if (shadowCache) return shadowCache;
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(0,0,0,0.85)");
    g.addColorStop(0.5, "rgba(0,0,0,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    shadowCache = new THREE.CanvasTexture(c);
    return shadowCache;
  }, []);
}

/** Pantalla del hueco libre: en blanco a proposito (ver heroLineup). */
function blankTexture() {
  const c = document.createElement("canvas");
  c.width = 270;
  c.height = 600;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, c.height);
  g.addColorStop(0, "#1b2130");
  g.addColorStop(1, "#0e121a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Plano con esquinas redondeadas y UV normalizadas a 0–1. */
function roundedPlane(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 10);
  const pos = g.getAttribute("position");
  const uv = g.getAttribute("uv");
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
  }
  uv.needsUpdate = true;
  return g;
}
