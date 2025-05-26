import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 30000;

const ParticleBackground = () => {
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
  const positions = useMemo(() => new Float32Array(particlesCount * 3), []);
  const currentPositions = useMemo(
    () => new Float32Array(particlesCount * 3),
    []
  );
  const animationStart = useRef<number>(0);
  // const origin = new THREE.Vector3(0, -50, 0);
  // const duration = 3; // duration of burst animation in seconds

  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particlesCount; i++) {
      const angle1 = (i / particlesCount) * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;

      const radius = isMobile ? 16 : 20;
      const tubeRadius = isMobile ? 4 : 5;
      const targetX =
        (radius + tubeRadius * Math.cos(angle2)) * Math.cos(angle1);
      const targetY = tubeRadius * Math.sin(angle2);
      const targetZ =
        (radius + tubeRadius * Math.cos(angle2)) * Math.sin(angle1);

      const delay = Math.random() * 1.5;

      data.push({
        angle1,
        angle2,
        delay,
        target: new THREE.Vector3(targetX, targetY, targetZ),
      });
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

    const radius = isMobile ? 16 : 20;
    const tubeRadius = isMobile ? 4 : 5;
    const rotationSpeed = 0.15;

    raycaster.setFromCamera(mouse.current, camera);
    const rayOrigin = raycaster.ray.origin.clone();
    const rayDir = raycaster.ray.direction.clone();

    const influenceRadius = 12;
    const pullStrength = 0.15;
    const restoreStrength = 0.04;

    for (let i = 0; i < particleData.length; i++) {
      const { angle1, angle2, delay } = particleData[i];

      const a2 = angle2 + time * rotationSpeed * 8;
      const baseAngle = angle1 + time * rotationSpeed;

      const ringX = (radius + tubeRadius * Math.cos(a2)) * Math.cos(baseAngle);
      const ringY = tubeRadius * Math.sin(a2);
      const ringZ = (radius + tubeRadius * Math.cos(a2)) * Math.sin(baseAngle);
      const target = new THREE.Vector3(ringX, ringY, ringZ);

      let pos: THREE.Vector3;

      const t = Math.min(Math.max((elapsed - delay) / burstDuration, 0), 1);
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
      const progress = easeOut(t);

      if (progress < 1) {
        // ✨ Spiral burst from bottom to ring
        const spiralAngle = progress * Math.PI * 8 + angle1 * 5;
        const outwardRadius = Math.sin(progress * Math.PI) * 6;

        const spiralX = origin.x + outwardRadius * Math.cos(spiralAngle);
        const spiralZ = origin.z + outwardRadius * Math.sin(spiralAngle);
        const spiralY = origin.y + (ringY - origin.y) * progress;

        pos = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(spiralX, spiralY, spiralZ),
          target,
          progress * 0.5
        );
      } else {
        // 🌪 Orbit + interactivity
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

        current.lerp(target, restoreStrength);
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
