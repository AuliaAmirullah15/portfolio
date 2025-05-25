import React, { useRef, useEffect } from "react";

type Blob = {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  dx: number;
  dy: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
  phaseX: number;
  phaseY: number;
  phaseSpeedX: number;
  phaseSpeedY: number;
  phaseRadius: number;
  phaseRadiusSpeed: number;
};

const colors = [
  "rgba(48, 111, 219, 1)", // steelblue
  "rgba(193, 48, 219, 1)", // purple
];

const OrganicGradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const blobs = useRef<Blob[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const createBlob = (): Blob => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radiusX: 250 + Math.random() * 300, // bigger radii
      radiusY: 150 + Math.random() * 250,
      dx: (Math.random() - 0.5) * 0.15, // slower movement
      dy: (Math.random() - 0.5) * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0,
      life: 0,
      maxLife: 15000 + Math.random() * 7000,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      phaseSpeedX: 0.001 + Math.random() * 0.002,
      phaseSpeedY: 0.001 + Math.random() * 0.002,
      phaseRadius: Math.random() * Math.PI * 2,
      phaseRadiusSpeed: 0.001 + Math.random() * 0.003,
    });

    const maxBlobs = 4;
    blobs.current = Array.from({ length: maxBlobs }, createBlob);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter"; // additive brightness
      ctx.globalAlpha = 0.8; // subtle layering opacity

      blobs.current.forEach((blob, index) => {
        blob.life += 16;
        blob.phaseX += blob.phaseSpeedX;
        blob.phaseY += blob.phaseSpeedY;
        blob.phaseRadius += blob.phaseRadiusSpeed;

        // Morph ellipse radius slightly to simulate organic shape shifting
        const radiusX =
          blob.radiusX * (0.85 + 0.3 * Math.sin(blob.phaseRadius));
        const radiusY =
          blob.radiusY * (0.85 + 0.3 * Math.cos(blob.phaseRadius));

        blob.x += blob.dx + Math.sin(blob.phaseX) * 0.5;
        blob.y += blob.dy + Math.sin(blob.phaseY) * 0.5;

        // Wrap edges
        if (blob.x < -radiusX) blob.x = width + radiusX;
        if (blob.x > width + radiusX) blob.x = -radiusX;
        if (blob.y < -radiusY) blob.y = height + radiusY;
        if (blob.y > height + radiusY) blob.y = -radiusY;

        // Opacity fade logic
        const halfLife = blob.maxLife / 2;
        blob.opacity =
          blob.life < halfLife
            ? blob.life / halfLife
            : 1 - (blob.life - halfLife) / halfLife;

        if (blob.life >= blob.maxLife) {
          blobs.current[index] = createBlob();
        }

        const brightOpacity = Math.min(blob.opacity * 1.6, 1);

        // Blend two colors by mixing current blob color and the other color
        const otherColor = colors.find((c) => c !== blob.color) || blob.color;

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          Math.max(radiusX, radiusY)
        );

        // More nuanced gradient stops blending both colors and shades
        gradient.addColorStop(0, blob.color.replace("1)", `${brightOpacity})`));
        gradient.addColorStop(
          0.3,
          blob.color.replace("1)", `${brightOpacity * 0.5})`)
        );
        gradient.addColorStop(
          0.6,
          otherColor.replace("1)", `${brightOpacity * 0.2})`)
        );
        gradient.addColorStop(1, otherColor.replace("1)", "0)"));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(blob.x, blob.y, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
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
        filter: "blur(40px)", // softer glow
        zIndex: 0,
        pointerEvents: "none",
        background: "#000",
      }}
    />
  );
};

export default OrganicGradientBackground;
