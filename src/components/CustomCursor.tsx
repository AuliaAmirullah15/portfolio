import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa"; // Import the arrow icon

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // Start from scale 0 (invisible)
    cursor.style.transform = "translate(-50%, -50%) scale(0)";
    cursor.style.opacity = "0";

    // After short delay, pop it in
    setTimeout(() => {
      if (cursor) {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.opacity = "1";
      }
    }, 100);

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 bg-titanium rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out opacity-95 flex justify-center items-center"
    >
      <FaArrowRight size={16} className="text-blue-950 -rotate-45" />
    </div>
  );
};

export default CustomCursor;
