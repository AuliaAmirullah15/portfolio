import React, { useEffect, useRef } from "react";
import ParticleBackground from "./ParticleBackground";
import { gsap } from "gsap";

const Beginning = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );
      }
    }, 4000); // delay based on particle animation

    return () => clearTimeout(timeout);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("title");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="beginning"
      className="w-full h-screen flex items-center justify-center relative z-10 overflow-hidden"
    >
      <ParticleBackground />
      <div
        ref={textRef}
        className="absolute z-20 text-center text-gray-300 text-xl font-mono cursor-pointer opacity-0"
        onClick={scrollToProjects}
      >
        <p className="hover:text-white hover:text-2xl transition-all duration-500">
          WEB <br />
          DEVELOPER
        </p>
      </div>
    </div>
  );
};

export default Beginning;
