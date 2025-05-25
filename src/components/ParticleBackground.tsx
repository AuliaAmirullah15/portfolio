import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 800;

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Store particle info: angle, radius, speed
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3; // faster speeds
      data.push({ angle, radius: 0, speed });
    }
    return data;
  }, []);

  // Positions array
  const positions = useMemo(() => new Float32Array(particlesCount * 3), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();

    for (let i = 0; i < particlesCount; i++) {
      const p = particleData[i];

      p.radius += p.speed * 0.12;
      const z = -p.radius * 0.5;

      // Fixed big maxRadius for wide spread:
      const maxRadius = 120; // bigger number => more spread

      if (p.radius > maxRadius) {
        p.radius = 0;
        p.angle = Math.random() * Math.PI * 2;
        p.speed = 1 + Math.random() * 3;
      }

      const angularSpeed = 0.5;
      const angle = p.angle + time * angularSpeed;

      const x = Math.cos(angle) * p.radius;
      const y = Math.sin(angle) * p.radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      material={
        new THREE.PointsMaterial({
          color: "#3b82f6",
          size: 0.7, // bigger size
          sizeAttenuation: true,
          transparent: true,
          opacity: 1, // max opacity for brightness
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

const ParticleBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 90], fov: 300 }}
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
};

export default ParticleBackground;
