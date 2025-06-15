"use client";
import { useEffect, useState } from "react";

export default function CursorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-visible">
      {children}
      <div
        id="cursorWrapper"
        className="fixed top-0 left-0 w-6 h-6 bg-black rounded-full pointer-events-none z-[9999] transition-transform duration-75 body-hide-cursor:hidden"
        style={{
          transform: `translate(${coords.x - 12}px, ${coords.y - 12}px)`,
          backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent black
          border: "1.5px solid rgba(255, 255, 255, 0.8)", // white border with slight transparency
        }}
      />
    </div>
  );
}
