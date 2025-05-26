import React from "react";
import ParticleBackground from "./ParticleBackground";

const Beginning = () => {
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
        className="absolute z-20 text-center text-gray-300 hover:text-white text-xl font-mono hover:cursor-pointer hover:text-2xl duration-500"
        onClick={scrollToProjects}
      >
        <p className="font-golos">Aulia Zulkarneidi</p>
        <p>WEB DEVELOPER</p>
      </div>
    </div>
  );
};
export default Beginning;
