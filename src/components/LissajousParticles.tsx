import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 30000;

const LissajousParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));

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
      camera={{ position: [0, 0, 80], fov: 40 }}
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
      <ParticlesMouseWrapper mouse={mouse} />
    </Canvas>
  );
};

const ParticlesMouseWrapper = ({
  mouse,
}: {
  mouse: React.MutableRefObject<THREE.Vector3>;
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
      const tOffset = (i / particlesCount) * Math.PI * 2;
      const radialAngle = Math.random() * Math.PI * 2;
      const radiusOffset = Math.random();
      data.push({ tOffset, radialAngle, radiusOffset });
    }
    return data;
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const A = 20,
      B = 15,
      C = 10;
    const a = 5,
      b = 4,
      c = 4;
    const delta = Math.PI / 2;
    const phi = Math.PI / 3;
    const tubeRadius = 2.5;
    const baseRotationSpeed = 0.15;

    const influenceRadius = 12;
    const pullStrength = 0.15;
    const restoreStrength = 0.04;

    const mouseNDC = new THREE.Vector2(mouse.current.x, mouse.current.y);
    raycaster.setFromCamera(mouseNDC, camera);
    const rayOrigin = raycaster.ray.origin.clone();
    const rayDirection = raycaster.ray.direction.clone();

    for (let i = 0; i < particleData.length; i++) {
      const { tOffset, radialAngle, radiusOffset } = particleData[i];
      const t = tOffset + time * baseRotationSpeed;

      const cx = A * Math.sin(a * t + delta);
      const cy = B * Math.sin(b * t);
      const cz = C * Math.sin(c * t + phi);

      const eps = 0.001;
      const cx2 = A * Math.sin(a * (t + eps) + delta);
      const cy2 = B * Math.sin(b * (t + eps));
      const cz2 = C * Math.sin(c * (t + eps) + phi);

      const tangent = new THREE.Vector3(
        cx2 - cx,
        cy2 - cy,
        cz2 - cz
      ).normalize();

      const arbitrary =
        Math.abs(tangent.y) < 0.99
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(1, 0, 0);

      const normal = new THREE.Vector3()
        .crossVectors(tangent, arbitrary)
        .normalize();
      const binormal = new THREE.Vector3()
        .crossVectors(tangent, normal)
        .normalize();

      const angle = radialAngle;
      const offsetR = tubeRadius * radiusOffset;

      const ox =
        normal.x * Math.cos(angle) * offsetR +
        binormal.x * Math.sin(angle) * offsetR;
      const oy =
        normal.y * Math.cos(angle) * offsetR +
        binormal.y * Math.sin(angle) * offsetR;
      const oz =
        normal.z * Math.cos(angle) * offsetR +
        binormal.z * Math.sin(angle) * offsetR;

      const baseX = cx + ox;
      const baseY = cy + oy;
      const baseZ = cz + oz;

      let x = currentPositions[i * 3] || baseX;
      let y = currentPositions[i * 3 + 1] || baseY;
      let z = currentPositions[i * 3 + 2] || baseZ;

      const particlePos = new THREE.Vector3(x, y, z);
      const toParticle = new THREE.Vector3().subVectors(particlePos, rayOrigin);
      const tProj = toParticle.dot(rayDirection);
      const closestPoint = rayDirection
        .clone()
        .multiplyScalar(tProj)
        .add(rayOrigin);

      const dist = particlePos.distanceTo(closestPoint);

      if (dist < influenceRadius) {
        const pull = new THREE.Vector3()
          .subVectors(closestPoint, particlePos)
          .multiplyScalar(pullStrength * (1 - dist / influenceRadius));
        particlePos.add(pull);
      }

      particlePos.lerp(new THREE.Vector3(baseX, baseY, baseZ), restoreStrength);

      x = particlePos.x;
      y = particlePos.y;
      z = particlePos.z;

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
          array={positions}
          count={particlesCount}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
};

export default LissajousParticles;
