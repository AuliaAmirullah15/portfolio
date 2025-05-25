import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 20000;

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => new Float32Array(particlesCount * 3), []);

  // Particle data: torus layout (circle around circle)
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particlesCount; i++) {
      const angle1 = (i / particlesCount) * Math.PI * 2; // around main ring
      const angle2 = Math.random() * Math.PI * 2; // around tube
      data.push({ angle1, angle2 });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const radius = 20; // ring radius
    const tubeRadius = 5; // thickness of the ring

    for (let i = 0; i < particleData.length; i++) {
      const { angle1, angle2 } = particleData[i];

      // Optionally animate tube angle to give dynamic wobble
      const a2 = angle2 + time * 0.6;

      // Basic torus parametric formula
      const x =
        (radius + tubeRadius * Math.cos(a2)) * Math.cos(angle1 + time * 0.2);
      const y = tubeRadius * Math.sin(a2);
      const z =
        (radius + tubeRadius * Math.cos(a2)) * Math.sin(angle1 + time * 0.2);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    if (!pointsRef.current) return;

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      material={
        new THREE.PointsMaterial({
          color: "#3b82f6",
          size: 1.7,
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
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
};

const ParticleBackground = () => (
  <Canvas
    camera={{ position: [60, 0, 20], fov: 40 }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      background: "#000",
    }}
  >
    <ambientLight intensity={0.5} />
    <Particles />
  </Canvas>
);

export default ParticleBackground;
