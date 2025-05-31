import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 30000;

type ShapeType = "torus" | "sphere" | "morph" | "disc" | "helix";

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

      data.push({
        angle1,
        angle2,
        delay,
        phi,
        theta,
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

    const rotationSpeed = 0.15;

    raycaster.setFromCamera(mouse.current, camera);
    const rayOrigin = raycaster.ray.origin.clone();
    const rayDir = raycaster.ray.direction.clone();

    const influenceRadius = 12;
    const pullStrength = 0.15;
    const restoreStrength = 0.04;

    // Morph factor logic
    let morphFactor: number;
    if (shape === "torus") morphFactor = 0;
    else if (shape === "sphere") morphFactor = 1;
    else if (shape === "disc") morphFactor = 2;
    else if (shape === "helix") morphFactor = 3;
    else morphFactor = (Math.sin(time * 0.3) + 1) * 1; // 0 → 2 smoothly

    for (let i = 0; i < particleData.length; i++) {
      const { angle1, angle2, delay, phi, theta } = particleData[i];

      // Torus position
      const minorAngle = angle2 + time * rotationSpeed * 8;
      const majorAngle = angle1 + time * rotationSpeed;

      const torusX =
        (radius + tubeRadius * Math.cos(minorAngle)) * Math.cos(majorAngle);
      const torusY = tubeRadius * Math.sin(minorAngle);
      const torusZ =
        (radius + tubeRadius * Math.cos(minorAngle)) * Math.sin(majorAngle);
      const torusPos = new THREE.Vector3(torusX, torusY, torusZ);

      // Sphere position
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

      // Disc (planet rings) position
      const discAngle = angle1 + time * rotationSpeed;
      const discRadius = radius + tubeRadius + Math.sin(i) * 2;

      const discX = discRadius * Math.cos(discAngle);
      const discY = Math.sin(i * 2 + time) * 0.5; // vertical wiggle
      const discZ = discRadius * Math.sin(discAngle);
      const discPos = new THREE.Vector3(discX, discY, discZ);

      // Helix Ribbon parameters
      const helixTurns = 5;
      const helixHeight = radius * 2;
      const baseHelixRadius = radius * 0.6;
      const scatterAmount = 2.5; // scattering for elegance

      // Time factors for wavy animation
      const waveSpeed = 2; // speed of the wave animation
      const waveAmplitudeY = 1.5; // vertical wave amplitude
      const waveAmplitudeRadius = 0.3; // radius wave amplitude
      const waveAmplitudeXZ = 0.5; // side oscillation amplitude

      const helixT =
        (i / particlesCount) * Math.PI * 2 * helixTurns + time * rotationSpeed;

      // Wavy radius modulation
      const radiusWave =
        baseHelixRadius +
        waveAmplitudeRadius * Math.sin(waveSpeed * time + i * 0.3);

      // Wavy vertical modulation (wave traveling along the helix height)
      const yWave =
        waveAmplitudeY * Math.sin(waveSpeed * time * 1.2 + helixT * 2);

      // Side oscillations for X and Z
      const sideOscX = waveAmplitudeXZ * Math.sin(waveSpeed * time * 1.5 + i);
      const sideOscZ =
        waveAmplitudeXZ * Math.cos(waveSpeed * time * 1.5 + i * 1.1);

      // Scattering offsets (stable per particle)
      const randomSeed = ((i * 12.9898) ^ (i * 78.233)) * 43758.5453;
      const randX = ((Math.sin(randomSeed) + 1) / 2 - 0.5) * scatterAmount;
      const randY =
        ((Math.sin(randomSeed * 1.3) + 1) / 2 - 0.5) * scatterAmount * 0.3;
      const randZ =
        ((Math.sin(randomSeed * 1.7) + 1) / 2 - 0.5) * scatterAmount;

      // Final helix Ribbon position with elegant waving & dancing
      const helixX = radiusWave * Math.cos(helixT) + randX + sideOscX;
      const helixY =
        (helixHeight / (Math.PI * 2 * helixTurns)) * helixT -
        helixHeight / 2 +
        randY +
        yWave;
      const helixZ = radiusWave * Math.sin(helixT) + randZ + sideOscZ;

      const helixRibbonPos = new THREE.Vector3(helixX, helixY, helixZ);

      // Interpolation between shapes:
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
      } else {
        // morphFactor 2 → 3
        const t = morphFactor - 2;
        interpolatedTarget = new THREE.Vector3().lerpVectors(
          discPos,
          helixRibbonPos,
          t
        );
      }

      let pos: THREE.Vector3;

      const t = Math.min(Math.max((elapsed - delay) / burstDuration, 0), 1);
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
      const progress = easeOut(t);

      if (progress < 1) {
        // Spiral entrance
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
        // Interactive orbit with mouse influence
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
