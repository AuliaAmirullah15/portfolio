import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 20000;

const Particles = () => {
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

  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse.current.z = 0;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const radius = 20;
    const tubeRadius = 5;

    const baseRotationSpeed = 0.15;

    // Mouse in NDC
    const mouseNDC = new THREE.Vector2(mouse.current.x, mouse.current.y);
    raycaster.setFromCamera(mouseNDC, camera);

    // Ray origin and direction
    const rayOrigin = raycaster.ray.origin;
    const rayDirection = raycaster.ray.direction;

    const interactionRadius = 2;
    const repulsionForce = 6;

    for (let i = 0; i < particleData.length; i++) {
      const { angle1, angle2 } = particleData[i];

      const a2 = angle2 + time * baseRotationSpeed * 8;
      const baseAngle = angle1 + time * baseRotationSpeed;

      const baseX = (radius + tubeRadius * Math.cos(a2)) * Math.cos(baseAngle);
      const baseY = tubeRadius * Math.sin(a2);
      const baseZ = (radius + tubeRadius * Math.cos(a2)) * Math.sin(baseAngle);

      let x = currentPositions[i * 3] || baseX;
      let y = currentPositions[i * 3 + 1] || baseY;
      let z = currentPositions[i * 3 + 2] || baseZ;

      // Particle position vector
      const particlePos = new THREE.Vector3(x, y, z);

      // Compute closest point on the ray to the particle:
      const toParticle = new THREE.Vector3().subVectors(particlePos, rayOrigin);
      const t = toParticle.dot(rayDirection); // scalar projection of vector onto ray
      const closestPoint = new THREE.Vector3()
        .copy(rayDirection)
        .multiplyScalar(t)
        .add(rayOrigin);

      // Distance between particle and closest point on ray
      const dist = particlePos.distanceTo(closestPoint);

      if (dist < interactionRadius) {
        const pushDir = new THREE.Vector3()
          .subVectors(particlePos, closestPoint)
          .normalize();

        // Push particles away stronger if closer
        const pushStrength = repulsionForce * (1 - dist / interactionRadius);

        x += pushDir.x * pushStrength;
        y += pushDir.y * pushStrength;
        z += pushDir.z * pushStrength;
      }

      // Smoothly return to base torus position
      const lerpFactor = 0.05;
      x += (baseX - x) * lerpFactor;
      y += (baseY - y) * lerpFactor;
      z += (baseZ - z) * lerpFactor;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    if (pointsRef.current)
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
      position: "absolute",
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
