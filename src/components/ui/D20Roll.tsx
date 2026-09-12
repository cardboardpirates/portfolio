// Dado d20 3D interativo (Three.js/React Three Fiber) da página de Contato:
// clicar rola o dado — sempre cai em 20 — e só depois disso o CTA de contato
// aparece. Cada face ganha um número em texto SDF (@react-three/drei),
// posicionado no centroide/normal da face de um icosaedro regular, em vez de
// texturizar a malha (evita UV mapping manual por face).
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
// Mesma família usada nos títulos do site (font-display, ver tailwind.config.ts).
// drei/troika só lê fonte via arquivo (.ttf/.otf/.woff, não .woff2), por isso
// importamos o .woff diretamente do pacote @fontsource já instalado.
import pirataOneUrl from "@fontsource/pirata-one/files/pirata-one-latin-400-normal.woff?url";

const GOLDEN = (1 + Math.sqrt(5)) / 2;

// Mesma tabela de vértices/faces que o THREE.IcosahedronGeometry usa por
// baixo dos panos — usada aqui só pra calcular onde/como colar os números.
const VERTICES: [number, number, number][] = [
  [-1, GOLDEN, 0], [1, GOLDEN, 0], [-1, -GOLDEN, 0], [1, -GOLDEN, 0],
  [0, -1, GOLDEN], [0, 1, GOLDEN], [0, -1, -GOLDEN], [0, 1, -GOLDEN],
  [GOLDEN, 0, -1], [GOLDEN, 0, 1], [-GOLDEN, 0, -1], [-GOLDEN, 0, 1],
];

const FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

const RADIUS = 1;
const LABEL_OFFSET = 0.025;
// Número de cada face = índice + 1 (arbitrário — não precisa espelhar um d20
// físico real, já que controlamos pra qual face o dado "cai" na animação).
const WINNING_FACE_INDEX = 19; // face que carrega o número 20

interface FaceLabel {
  value: number;
  normal: THREE.Vector3;
  position: [number, number, number];
  quaternion: THREE.Quaternion;
}

// Orienta cada label com o eixo Z local apontando pra fora (normal da face)
// e o eixo Y local o mais "pra cima" possível (projeção do +Y do mundo no
// plano da face) — assim os números ficam consistentemente "em pé" em vez de
// girados aleatoriamente, o que importa principalmente pra face vencedora.
function buildFaceBasis(normal: THREE.Vector3): THREE.Quaternion {
  const worldUp = new THREE.Vector3(0, 1, 0);
  const zAxis = normal.clone().normalize();
  let xAxis = new THREE.Vector3().crossVectors(worldUp, zAxis);
  if (xAxis.lengthSq() < 1e-6) {
    xAxis = new THREE.Vector3().crossVectors(new THREE.Vector3(1, 0, 0), zAxis);
  }
  xAxis.normalize();
  const yAxis = new THREE.Vector3().crossVectors(zAxis, xAxis).normalize();
  const basis = new THREE.Matrix4().makeBasis(xAxis, yAxis, zAxis);
  return new THREE.Quaternion().setFromRotationMatrix(basis);
}

// Vértices normalizados pra ficarem exatamente na mesma esfera (raio RADIUS)
// que o THREE.IcosahedronGeometry usa — precisamos disso pra achar o
// centroide real de cada face triangular, não só a direção pra fora.
const UNIT_VERTICES = VERTICES.map(
  ([x, y, z]) => new THREE.Vector3(x, y, z).normalize().multiplyScalar(RADIUS),
);

const FACE_LABELS: FaceLabel[] = FACES.map(([a, b, c], i) => {
  const va = UNIT_VERTICES[a];
  const vb = UNIT_VERTICES[b];
  const vc = UNIT_VERTICES[c];
  // Centroide real da face (média dos 3 vértices): fica DENTRO da esfera de
  // raio RADIUS, colado na face plana de verdade — diferente de simplesmente
  // normalizar a soma, que empurraria o ponto até a casca dos vértices
  // (o que fazia os números "flutuarem" fora da superfície do dado).
  const centroid = va.clone().add(vb).add(vc).multiplyScalar(1 / 3);
  const normal = centroid.clone().normalize();
  const position = centroid.clone().addScaledVector(normal, LABEL_OFFSET);
  return {
    value: i + 1,
    normal,
    position: [position.x, position.y, position.z],
    quaternion: buildFaceBasis(normal),
  };
});

// Direção (no espaço do dado) pra onde a face vencedora precisa apontar no
// final da rolagem, aproximando a posição da câmera — like o close-up de
// resultado do BG3.
const REVEAL_DIR = new THREE.Vector3(0, 0.55, 1).normalize();
const TARGET_QUATERNION = new THREE.Quaternion().setFromUnitVectors(
  FACE_LABELS[WINNING_FACE_INDEX].normal,
  REVEAL_DIR,
);
// Posição do brilho do "crítico", em espaço de MUNDO (fora do group que
// gira) — precisa ficar na frente da face vencedora depois que o dado já
// parou, não presa a um offset local que rotaciona junto com o dado (era
// isso que fazia outra face brilhar em vez da 20).
const FLASH_LIGHT_POSITION = REVEAL_DIR.clone().multiplyScalar(1.8).toArray();

const SPIN_DURATION = 2;
const REDUCED_SPIN_DURATION = 0.3;
const FLASH_DURATION = 0.6;
// Voltas do eixo de "tombo" (independente do eixo de correção calculado no
// useEffect abaixo), só pra parecer um giro de verdade em vez de já começar
// "mirando" no alvo. Como é sempre um número inteiro de voltas completas, em
// t=1 esse componente vale a identidade e nunca muda onde o dado realmente
// pousa.
const MIN_TUMBLE_SPINS = 2;
const MAX_TUMBLE_SPINS = 4;
// Um "chacoalhar" que decai a zero exatamente no fim: dá o efeito de dado
// tombando/quicando de verdade por cima do giro principal, sem nunca mudar
// o resultado final (contribuição nula em t=1).
const WOBBLE_AMPLITUDE = 0.55;
const WOBBLE_FREQUENCY = 3.4;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

type RollPhase = "idle" | "rolling" | "done";

interface AnimState {
  stage: "spin" | "flash";
  startTime: number;
  qStart: THREE.Quaternion;
  correctionAxis: THREE.Vector3;
  correctionAngle: number;
  tumbleAxis: THREE.Vector3;
  tumbleTurns: number;
  wobbleAxis: THREE.Vector3;
  wobblePhase: number;
}

interface DieProps {
  phase: RollPhase;
  reduceMotion: boolean;
  onSettled: () => void;
}

function Die({ phase, reduceMotion, onSettled }: DieProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);
  const animRef = useRef<AnimState | null>(null);
  const wasRollingRef = useRef(false);
  const settledRef = useRef(false);
  const [goldFace, setGoldFace] = useState(false);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(RADIUS, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => {
    if (phase === "rolling" && !wasRollingRef.current) {
      settledRef.current = false;
      setGoldFace(false);
      const group = groupRef.current;
      const qStart = group ? group.quaternion.clone() : new THREE.Quaternion();

      // Rotação exata necessária pra ir de onde o dado está agora até o
      // alvo (TARGET_QUATERNION), decomposta em eixo+ângulo. Depois da
      // primeira rolagem, o dado já parte exatamente do alvo, então esse
      // ângulo de correção fica ~0 — quem dá o giro visual é o eixo de
      // "tombo" abaixo, sorteado do zero a cada rolagem (por isso a direção
      // do giro muda a cada clique, mesmo sempre pousando na mesma face).
      const qDelta = TARGET_QUATERNION.clone().multiply(qStart.clone().invert());
      const w = THREE.MathUtils.clamp(qDelta.w, -1, 1);
      const correctionAngle = 2 * Math.acos(w);
      const s = Math.sqrt(1 - w * w);
      const correctionAxis =
        s < 1e-6
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(qDelta.x / s, qDelta.y / s, qDelta.z / s);

      // Eixo de tombo: completamente independente da correção acima, e
      // sorteado a cada rolagem. Como só gira um número inteiro de voltas
      // completas (2π · tumbleTurns), em t=1 essa rotação vale a identidade
      // e nunca desvia o pouso final da face 20 — só muda o "caminho" até lá.
      const tumbleTurns =
        MIN_TUMBLE_SPINS + Math.floor(Math.random() * (MAX_TUMBLE_SPINS - MIN_TUMBLE_SPINS + 1));
      const tumbleAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize();

      animRef.current = {
        stage: "spin",
        startTime: performance.now() / 1000,
        qStart,
        correctionAxis,
        correctionAngle,
        tumbleAxis,
        tumbleTurns,
        wobbleAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize(),
        wobblePhase: Math.random() * Math.PI * 2,
      };
    }
    wasRollingRef.current = phase === "rolling";
  }, [phase]);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const anim = animRef.current;

    if (!anim) {
      if (phase === "idle") group.rotation.y += delta * 0.15;
      if (flashLightRef.current) flashLightRef.current.intensity = 0;
      return;
    }

    const now = performance.now() / 1000;
    const elapsed = now - anim.startTime;
    const spinDuration = reduceMotion ? REDUCED_SPIN_DURATION : SPIN_DURATION;

    if (anim.stage === "spin") {
      const t = Math.min(elapsed / spinDuration, 1);
      const eased = easeOutCubic(t);

      // Giro principal: dois eixos compostos, ambos na mesma curva de
      // desaceleração (sem trocar de fase nem "corrigir" nada no final) —
      // a correção (quase nula após a primeira rolagem) mira exatamente na
      // face 20, e o tombo dá a volta completa (2π · tumbleTurns) que varia
      // de direção a cada rolagem sem nunca desviar o pouso, já que em t=1
      // ele fecha em voltas inteiras e vale a identidade.
      const correctionQuat = new THREE.Quaternion().setFromAxisAngle(
        anim.correctionAxis,
        anim.correctionAngle * eased,
      );
      const tumbleQuat = new THREE.Quaternion().setFromAxisAngle(
        anim.tumbleAxis,
        anim.tumbleTurns * Math.PI * 2 * eased,
      );

      // Chacoalhar decaindo: some completamente até t=1, então não afeta o
      // resultado — só dá a sensação de tombo/quique por cima do giro liso.
      const wobbleAmp = reduceMotion ? 0 : WOBBLE_AMPLITUDE * Math.pow(1 - t, 2);
      const wobbleAngle =
        wobbleAmp * Math.sin(t * WOBBLE_FREQUENCY * Math.PI * 2 + anim.wobblePhase);
      const wobbleQuat = new THREE.Quaternion().setFromAxisAngle(anim.wobbleAxis, wobbleAngle);

      group.quaternion
        .copy(anim.qStart)
        .premultiply(tumbleQuat)
        .premultiply(correctionQuat)
        .premultiply(wobbleQuat);

      // Um pulinho vertical, no lugar (sem X/Z), decaindo junto com o wobble.
      group.position.y = Math.abs(Math.sin(t * Math.PI * 5)) * 0.18 * Math.pow(1 - t, 2);

      if (t >= 1) {
        anim.stage = "flash";
        anim.startTime = now;
        group.position.y = 0;
        if (!settledRef.current) {
          settledRef.current = true;
          setGoldFace(true);
          onSettled();
        }
      }
      return;
    }

    // flash: pico rápido de luz âmbar decaindo, sincronizado com o "crítico".
    const flashT = Math.min(elapsed / FLASH_DURATION, 1);
    if (flashLightRef.current) {
      flashLightRef.current.intensity = (1 - flashT) * 55;
    }
  });

  return (
    <>
      <pointLight
        ref={flashLightRef}
        position={FLASH_LIGHT_POSITION}
        color="#fbbf24"
        intensity={0}
      />
      <group ref={groupRef}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#151221"
            roughness={0.35}
            metalness={0.2}
            emissive="#2a1f3d"
            emissiveIntensity={0.35}
          />
        </mesh>
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#c084fc" transparent opacity={0.85} />
        </lineSegments>
        {FACE_LABELS.map((face, i) => {
          const isWinner = goldFace && i === WINNING_FACE_INDEX;
          return (
            <Text
              key={face.value}
              font={pirataOneUrl}
              position={face.position}
              quaternion={face.quaternion}
              fontSize={0.29}
              color={isWinner ? "#ffd452" : "#f5f2ff"}
              outlineWidth={0.016}
              outlineColor={isWinner ? "#7a4a00" : "#0a0810"}
              anchorX="center"
              anchorY="middle"
            >
              {face.value}
            </Text>
          );
        })}
      </group>
    </>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  return reduced;
}

interface D20RollProps {
  idleLabel: string;
  successLabel: string;
  successDetail: string;
  onSuccess: () => void;
}

export function D20Roll({
  idleLabel,
  successLabel,
  successDetail,
  onSuccess,
}: D20RollProps) {
  const [phase, setPhase] = useState<RollPhase>("idle");
  const [flashPulse, setFlashPulse] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const handleRoll = () => {
    if (phase === "rolling") return;
    setPhase("rolling");
  };

  const handleSettled = () => {
    setPhase("done");
    setFlashPulse(true);
    onSuccess();
    setTimeout(() => setFlashPulse(false), 550);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`relative h-56 w-56 rounded-full transition-shadow duration-300 ${
          flashPulse ? "shadow-glow-amber" : ""
        }`}
      >
        <Canvas
          className="pointer-events-none"
          camera={{ position: [0, 1.2, 3.4], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={35} color="#c084fc" />
          <pointLight position={[-2, 1, 1.5]} intensity={25} color="#38bdf8" />
          <pointLight position={[0, -2, 1.5]} intensity={18} color="#fbbf24" />
          <Die phase={phase} reduceMotion={reduceMotion} onSettled={handleSettled} />
        </Canvas>
        <button
          type="button"
          onClick={handleRoll}
          disabled={phase === "rolling"}
          aria-label={idleLabel}
          className="absolute inset-0 rounded-full disabled:cursor-wait"
        />
      </div>
      <span
        key={phase === "done" ? "done" : "idle"}
        className={`animate-role-fade-in text-center font-display text-text-primary ${
          phase === "done" ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {phase === "done" ? successLabel : idleLabel}
      </span>
      {phase === "done" && (
        <p className="animate-role-fade-in max-w-[16rem] text-center text-sm text-muted">
          {successDetail}
        </p>
      )}
    </div>
  );
}
