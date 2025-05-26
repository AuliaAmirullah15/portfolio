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

  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particlesCount; i++) {
      const angle1 = (i / particlesCount) * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      data.push({ angle1, angle2 });
    }
    return data;
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const radius = isMobile ? 16 : 20; // smaller ring on mobile
    const tubeRadius = isMobile ? 4 : 5;
    const rotationSpeed = 0.15;

    raycaster.setFromCamera(mouse.current, camera);
    const rayOrigin = raycaster.ray.origin.clone();
    const rayDir = raycaster.ray.direction.clone();

    const influenceRadius = 12;
    const pullStrength = 0.15;
    const restoreStrength = 0.04;

    for (let i = 0; i < particleData.length; i++) {
      const { angle1, angle2 } = particleData[i];

      const a2 = angle2 + time * rotationSpeed * 8;
      const baseAngle = angle1 + time * rotationSpeed;

      const baseX = (radius + tubeRadius * Math.cos(a2)) * Math.cos(baseAngle);
      const baseY = tubeRadius * Math.sin(a2);
      const baseZ = (radius + tubeRadius * Math.cos(a2)) * Math.sin(baseAngle);

      let x = currentPositions[i * 3] || baseX;
      let y = currentPositions[i * 3 + 1] || baseY;
      let z = currentPositions[i * 3 + 2] || baseZ;

      const pos = new THREE.Vector3(x, y, z);
      const toParticle = new THREE.Vector3().subVectors(pos, rayOrigin);
      const t = toParticle.dot(rayDir);
      const closestPoint = rayDir.clone().multiplyScalar(t).add(rayOrigin);
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
