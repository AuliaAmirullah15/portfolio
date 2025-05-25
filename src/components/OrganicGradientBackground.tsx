import React, { useRef, useEffect } from "react";

type Blob = {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  dx: number;
  dy: number;
  colorA: string;
  colorB: string;
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

function rgbaWithOpacity(rgba: string, opacity: number) {
  return rgba.replace(
    /rgba?\(([^)]+),\s*[\d.]+\)/,
    (_, rgb) => `rgba(${rgb}, ${opacity})`
  );
}

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

    const createBlob = (): Blob => {
      const idxA = Math.floor(Math.random() * colors.length);
      let idxB = idxA;
      while (idxB === idxA) idxB = Math.floor(Math.random() * colors.length);

      // Allow center x,y to start slightly beyond edges (-maxRadiusX/Y to width+maxRadiusX/Y)
      const maxRadiusX = 400;
      const maxRadiusY = 350;

      return {
        x: Math.random() * (width + maxRadiusX * 2) - maxRadiusX,
        y: Math.random() * (height + maxRadiusY * 2) - maxRadiusY,
        radiusX: 350 + Math.random() * 300, // bigger radii
        radiusY: 250 + Math.random() * 250,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        colorA: colors[idxA],
        colorB: colors[idxB],
        opacity: 0,
        life: 0,
        maxLife: 15000 + Math.random() * 7000,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseSpeedX: 0.001 + Math.random() * 0.002,
        phaseSpeedY: 0.001 + Math.random() * 0.002,
        phaseRadius: Math.random() * Math.PI * 2,
        phaseRadiusSpeed: 0.001 + Math.random() * 0.003,
      };
    };

    const maxBlobs = 4;
    blobs.current = Array.from({ length: maxBlobs }, createBlob);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;

      blobs.current.forEach((blob, index) => {
        blob.life += 16;
        blob.phaseX += blob.phaseSpeedX;
        blob.phaseY += blob.phaseSpeedY;
        blob.phaseRadius += blob.phaseRadiusSpeed;

        const radiusX =
          blob.radiusX * (0.85 + 0.3 * Math.sin(blob.phaseRadius));
        const radiusY =
          blob.radiusY * (0.85 + 0.3 * Math.cos(blob.phaseRadius));

        blob.x += blob.dx + Math.sin(blob.phaseX) * 0.5;
        blob.y += blob.dy + Math.sin(blob.phaseY) * 0.5;

        // Wrap around more loosely — allow some bleed outside screen before resetting position
        if (blob.x < -radiusX * 2) blob.x = width + radiusX * 2;
        if (blob.x > width + radiusX * 2) blob.x = -radiusX * 2;
        if (blob.y < -radiusY * 2) blob.y = height + radiusY * 2;
        if (blob.y > height + radiusY * 2) blob.y = -radiusY * 2;

        // Life fade in/out opacity
        const halfLife = blob.maxLife / 2;
        const baseOpacity =
          blob.life < halfLife
            ? blob.life / halfLife
            : 1 - (blob.life - halfLife) / halfLife;

        // Smaller edge fade margin so blobs reach edges more fully
        const fadeEdgeMargin = 80;
        const fadeX =
          blob.x < fadeEdgeMargin
            ? blob.x / fadeEdgeMargin
            : blob.x > width - fadeEdgeMargin
            ? (width - blob.x) / fadeEdgeMargin
            : 1;
        const fadeY =
          blob.y < fadeEdgeMargin
            ? blob.y / fadeEdgeMargin
            : blob.y > height - fadeEdgeMargin
            ? (height - blob.y) / fadeEdgeMargin
            : 1;

        const edgeFade = Math.min(fadeX, fadeY, 1);

        blob.opacity = Math.min(baseOpacity * edgeFade * 1.6, 1);

        if (blob.life >= blob.maxLife || blob.opacity <= 0) {
          blobs.current[index] = createBlob();
          return;
        }

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          Math.max(radiusX, radiusY)
        );

        gradient.addColorStop(0, rgbaWithOpacity(blob.colorA, blob.opacity));
        gradient.addColorStop(
          0.25,
          rgbaWithOpacity(blob.colorA, blob.opacity * 0.5)
        );
        gradient.addColorStop(
          0.5,
          rgbaWithOpacity(blob.colorB, blob.opacity * 0.3)
        );
        gradient.addColorStop(
          0.75,
          rgbaWithOpacity(blob.colorB, blob.opacity * 0.1)
        );
        gradient.addColorStop(1, rgbaWithOpacity(blob.colorB, 0));

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
        filter: "blur(40px)",
        zIndex: 0,
        pointerEvents: "none",
        background: "#000",
      }}
    />
  );
};

export default OrganicGradientBackground;
