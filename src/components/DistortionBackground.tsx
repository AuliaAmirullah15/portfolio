import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;
  speed: number;
  brightnessOffset: number;
};

const colors = [
  "rgba(70,130,180,0.7)", // steelblue (blueish)
  "rgba(147,112,219,0.7)", // medium purple
  "rgba(220,20,60,0.7)", // crimson (red)
];

const DistortionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]); // <-- ✅ typed array

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const particleCount = 50;
    particles.current = [];

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 50 + Math.random() * 30,
        color: colors[i % colors.length],
        angle: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.002,
        brightnessOffset: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach((p) => {
        p.angle += p.speed;
        p.x += Math.cos(p.angle) * 0.5;
        p.y += Math.sin(p.angle) * 0.5;

        const alpha =
          0.5 + 0.5 * Math.sin(Date.now() * 0.002 + p.brightnessOffset);

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, p.color.replace("0.7", alpha.toFixed(2)));
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#000000",
      }}
    />
  );
};

export default DistortionBackground;
