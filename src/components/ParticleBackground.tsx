import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 30000;

type ShapeType =
  | "torus"
  | "sphere"
  | "morph"
  | "disc"
  | "helix"
  | "ribbonWave"
  | "crystalCluster";

const ParticleBackground = ({ shape = "morph" }: { shape?: ShapeType }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.current.x = (x / rect.width) * 2 - 1;
      mouse.current.y = -((y / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 100, 20], fov: 40 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.5} />
      <Particles mouse={mouse} isMobile={isMobile} shape={shape} />
    </Canvas>
  );
};

const Particles = ({
  mouse,
  isMobile,
  shape,
}: {
  mouse: React.MutableRefObject<THREE.Vector2>;
  isMobile: boolean;
  shape: ShapeType;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => new Float32Array(particlesCount * 3), []);
  const currentPositions = useMemo(
    () => new Float32Array(particlesCount * 3),
    []
  );
  const animationStart = useRef<number>(0);

  const radius = isMobile ? 16 : 20;
  const tubeRadius = isMobile ? 4 : 5;

  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particlesCount; i++) {
      const angle1 = (i / particlesCount) * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const delay = Math.random() * 1.5;

      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();

      data.push({ angle1, angle2, delay, phi, theta });
    }
    return data;
  }, [isMobile]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const screenBottom = useMemo(() => {
    return isMobile ? -window.innerHeight / 6 : -window.innerHeight / 4;
  }, [isMobile]);

  const origin = useMemo(
    () => new THREE.Vector3(0, screenBottom, 0),
    [screenBottom]
  );
  const burstDuration = 2.5;

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    if (!animationStart.current) animationStart.current = time;
    const elapsed = time - animationStart.current;

    const rotationSpeed = 0.15;
    raycaster.setFromCamera(mouse.current, camera);
    const rayOrigin = raycaster.ray.origin.clone();
    const rayDir = raycaster.ray.direction.clone();

    const influenceRadius = 12;
    const pullStrength = 0.15;
    const restoreStrength = 0.04;

    let morphFactor: number;
    if (shape === "torus") morphFactor = 0;
    else if (shape === "sphere") morphFactor = 1;
    else if (shape === "disc") morphFactor = 2;
    else if (shape === "helix") morphFactor = 3;
    else if (shape === "ribbonWave") morphFactor = 4;
    else if (shape === "crystalCluster") morphFactor = 5;
    else morphFactor = (Math.sin(time * 0.3) + 1) * 2;

    const rows = 40;
    const cols = particlesCount / rows;

    for (let i = 0; i < particleData.length; i++) {
      const { angle1, angle2, delay, phi, theta } = particleData[i];
      const minorAngle = angle2 + time * rotationSpeed * 8;
      const majorAngle = angle1 + time * rotationSpeed;

      const torusX =
        (radius + tubeRadius * Math.cos(minorAngle)) * Math.cos(majorAngle);
      const torusY = tubeRadius * Math.sin(minorAngle);
      const torusZ =
        (radius + tubeRadius * Math.cos(minorAngle)) * Math.sin(majorAngle);
      const torusPos = new THREE.Vector3(torusX, torusY, torusZ);

      const sphereRadius = radius + tubeRadius;
      const angleSpeed = 0.1;
      const rotatedTheta = theta + angleSpeed * time;
      const radiusOscillation = 1 + 0.05 * Math.sin(time * 5 + i);
      const sphereX =
        sphereRadius *
        radiusOscillation *
        Math.sin(phi) *
        Math.cos(rotatedTheta);
      const sphereY =
        sphereRadius *
        radiusOscillation *
        Math.sin(phi) *
        Math.sin(rotatedTheta);
      const sphereZ = sphereRadius * radiusOscillation * Math.cos(phi);
      const spherePos = new THREE.Vector3(sphereX, sphereY, sphereZ);

      const discAngle = angle1 + time * rotationSpeed;
      const discRadius = radius + tubeRadius + Math.sin(i) * 2;
      const discX = discRadius * Math.cos(discAngle);
      const discY = Math.sin(i * 2 + time) * 0.5;
      const discZ = discRadius * Math.sin(discAngle);
      const discPos = new THREE.Vector3(discX, discY, discZ);

      const helixTurns = 5;
      const helixHeight = radius * 2;
      const baseHelixRadius = radius * 0.6;
      const waveSpeed = 2;
      const waveAmplitudeY = 1.5;
      const waveAmplitudeRadius = 0.3;
      const waveAmplitudeXZ = 0.5;
      const helixT =
        (i / particlesCount) * Math.PI * 2 * helixTurns + time * rotationSpeed;
      const radiusWave =
        baseHelixRadius +
        waveAmplitudeRadius * Math.sin(waveSpeed * time + i * 0.3);
      const yWave =
        waveAmplitudeY * Math.sin(waveSpeed * time * 1.2 + helixT * 2);
      const sideOscX = waveAmplitudeXZ * Math.sin(waveSpeed * time * 1.5 + i);
      const sideOscZ =
        waveAmplitudeXZ * Math.cos(waveSpeed * time * 1.5 + i * 1.1);
      const helixX = radiusWave * Math.cos(helixT) + sideOscX;
      const helixY =
        (helixHeight / (Math.PI * 2 * helixTurns)) * helixT -
        helixHeight / 2 +
        yWave;
      const helixZ = radiusWave * Math.sin(helixT) + sideOscZ;
      const helixRibbonPos = new THREE.Vector3(helixX, helixY, helixZ);

      const row = Math.floor(i / cols);
      const col = i % cols;
      const waveTime = time * 2;
      const waveHeight = 1.2;
      const ribbonSpacing = 1.5;
      const ribbonX = (col - cols / 2) * ribbonSpacing;
      const ribbonY =
        Math.sin(col * 0.3 + waveTime + row * 0.1) * waveHeight + row * 0.25;
      const ribbonZ = Math.cos(row * 0.5 + time) * 5;
      const ribbonWavePos = new THREE.Vector3(ribbonX, ribbonY, ribbonZ);

      // NEW: Crystal Cluster shape
      // Create a jagged, grid-based cluster with sinusoidal distortion to break roundness
      const crystalClusterPos = new THREE.Vector3(
        (col - cols / 2) * 1.8 + Math.sin(row + time) * 1.5,
        (row - rows / 2) * 1.8 + Math.sin(col * 0.2 + time * 2) * 1.5,
        Math.sin((col + row) * 0.15 + time) * 5 + Math.sign(Math.sin(col)) * 5
      );

      let interpolatedTarget: THREE.Vector3;
      if (morphFactor <= 1) {
        interpolatedTarget = new THREE.Vector3().lerpVectors(
          torusPos,
          spherePos,
          morphFactor
        );
      } else if (morphFactor <= 2) {
        const t = morphFactor - 1;
        interpolatedTarget = new THREE.Vector3().lerpVectors(
          spherePos,
          discPos,
          t
        );
      } else if (morphFactor <= 3) {
        const t = morphFactor - 2;
        interpolatedTarget = new THREE.Vector3().lerpVectors(
          discPos,
          helixRibbonPos,
          t
        );
      } else if (morphFactor <= 4) {
        const t = morphFactor - 3;
        interpolatedTarget = new THREE.Vector3().lerpVectors(
          helixRibbonPos,
          ribbonWavePos,
          t
        );
      } else {
        const t = morphFactor - 4;
        interpolatedTarget = new THREE.Vector3().lerpVectors(
          ribbonWavePos,
          crystalClusterPos,
          t
        );
      }

      let pos: THREE.Vector3;
      const t = Math.min(Math.max((elapsed - delay) / burstDuration, 0), 1);
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
      const progress = easeOut(t);

      if (progress < 1) {
        const spiralAngle = progress * Math.PI * 8 + angle1 * 5;
        const outwardRadius = Math.sin(progress * Math.PI) * 6;
        const spiralX = origin.x + outwardRadius * Math.cos(spiralAngle);
        const spiralZ = origin.z + outwardRadius * Math.sin(spiralAngle);
        const spiralY = origin.y + (interpolatedTarget.y - origin.y) * progress;
        pos = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(spiralX, spiralY, spiralZ),
          interpolatedTarget,
          progress * 0.5
        );
      } else {
        const x = currentPositions[i * 3];
        const y = currentPositions[i * 3 + 1];
        const z = currentPositions[i * 3 + 2];
        const current = new THREE.Vector3(x, y, z);

        const toParticle = new THREE.Vector3().subVectors(current, rayOrigin);
        const tProj = toParticle.dot(rayDir);
        const closestPoint = rayDir
          .clone()
          .multiplyScalar(tProj)
          .add(rayOrigin);
        const dist = current.distanceTo(closestPoint);

        if (dist < influenceRadius) {
          const pull = new THREE.Vector3()
            .subVectors(closestPoint, current)
            .multiplyScalar(pullStrength * (1 - dist / influenceRadius));
          current.add(pull);
        }

        current.lerp(interpolatedTarget, restoreStrength);
        pos = current;
      }

      currentPositions[i * 3] = pos.x;
      currentPositions[i * 3 + 1] = pos.y;
      currentPositions[i * 3 + 2] = pos.z;

      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points
      ref={pointsRef}
      material={
        new THREE.PointsMaterial({
          color: "#3b82f6",
          size: 1.4,
          sizeAttenuation: false,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      }
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particlesCount}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
};

export default ParticleBackground;
