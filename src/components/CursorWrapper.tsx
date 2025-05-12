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
        className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] transition-transform duration-75 body-hide-cursor:hidden"
        style={{
          transform: `translate(${coords.x - 3}px, ${coords.y - 3}px)`,
        }}
      />
    </div>
  );
}
