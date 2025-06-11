import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 30000;
const ringsCount = 16;
const coreParticlesCount = 1000;

type CoreParticle = {
  isCore: true;
  basePosition: THREE.Vector3;
};

type RingParticle = {
  isCore: false;
  ringIndex: number;
  tilt: number;
  radius: number;
  angle: number;
  angle2: number;
};

type Particle = CoreParticle | RingParticle;

const RingParticles = () => {
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
      camera={{ position: [0, 100, 60], fov: 40 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black", // or "#000" if you want background here
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.5} />
      <Particles mouse={mouse} isMobile={isMobile} />
    </Canvas>
  );
};

const Particles = ({
  mouse,
  isMobile,
}: {
  mouse: React.MutableRefObject<THREE.Vector2>;
  isMobile: boolean;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const totalParticles = particlesCount;
  const positions = useMemo(() => new Float32Array(totalParticles * 3), []);
  const currentPositions = useMemo(
    () => new Float32Array(totalParticles * 3),
    []
  );

  const particleData = useMemo<Particle[]>(() => {
    const data: Particle[] = [];

    for (let i = 0; i < coreParticlesCount; i++) {
      const minRadius = 5;
      const maxRadius = 20; // Increase max radius
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      data.push({
        isCore: true,
        basePosition: new THREE.Vector3(x, y, z),
      });
    }

    const particlesPerRing = Math.floor(
      (totalParticles - coreParticlesCount) / ringsCount
    );
    const tiltAngles = [0, 0.3, 0.6, 1.0];

    for (let ringIndex = 0; ringIndex < ringsCount; ringIndex++) {
      const tilt = tiltAngles[ringIndex % tiltAngles.length];
      const radius = (isMobile ? 8 : 14) + ringIndex * (isMobile ? 3 : 4);

      for (let i = 0; i < particlesPerRing; i++) {
        const t = i / particlesPerRing;
        const angle = t * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;

        data.push({
          isCore: false,
          ringIndex,
          tilt,
          radius,
          angle,
          angle2,
        });
      }
    }

    return data;
  }, [isMobile]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const tubeRadius = isMobile ? 3 : 4;
    const rotationSpeed = 0.01;

    raycaster.setFromCamera(mouse.current, camera);
    const rayOrigin = raycaster.ray.origin.clone();
    const rayDir = raycaster.ray.direction.clone();

    const influenceRadius = 12;
    const pullStrength = 0.15;
    const restoreStrength = 0.04;

    for (let i = 0; i < particleData.length; i++) {
      const pdata = particleData[i];

      let baseX: number, baseY: number, baseZ: number;

      if (pdata.isCore) {
        const pulse = 1 + 0.2 * Math.sin(time * 2 + i);
        baseX = pdata.basePosition.x * pulse;
        baseY = pdata.basePosition.y * pulse;
        baseZ = pdata.basePosition.z * pulse;
      } else {
        const { ringIndex, tilt, radius, angle, angle2 } = pdata;
        const ringRotation = time * rotationSpeed * (1 + ringIndex * 0.3);
        const a2 = angle2 + time * rotationSpeed * 8;
        const baseAngle = angle + ringRotation;

        const localX =
          (radius + tubeRadius * Math.cos(a2)) * Math.cos(baseAngle);
        const localY = tubeRadius * Math.sin(a2);
        const localZ =
          (radius + tubeRadius * Math.cos(a2)) * Math.sin(baseAngle);

        const cosTilt = Math.cos(tilt);
        const sinTilt = Math.sin(tilt);

        baseX = localX;
        baseY = localY * cosTilt - localZ * sinTilt;
        baseZ = localY * sinTilt + localZ * cosTilt;
      }

      let x = currentPositions[i * 3] || baseX;
      let y = currentPositions[i * 3 + 1] || baseY;
      let z = currentPositions[i * 3 + 2] || baseZ;

      const pos = new THREE.Vector3(x, y, z);
      const toParticle = new THREE.Vector3().subVectors(pos, rayOrigin);
      const tVal = toParticle.dot(rayDir);
      const closestPoint = rayDir.clone().multiplyScalar(tVal).add(rayOrigin);
      const dist = pos.distanceTo(closestPoint);

      if (dist < influenceRadius) {
        const pull = new THREE.Vector3()
          .subVectors(closestPoint, pos)
          .multiplyScalar(pullStrength * (1 - dist / influenceRadius));
        x += pull.x;
        y += pull.y;
        z += pull.z;
      }

      x += (baseX - x) * restoreStrength;
      y += (baseY - y) * restoreStrength;
      z += (baseZ - z) * restoreStrength;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
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
          color: "#4a4a4a",
          size: 1.2,
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
          count={totalParticles}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
};

export default RingParticles;
