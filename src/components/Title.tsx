import React from "react";
import RingParticles from "./RingParticles";

const Title = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="title"
      className="bg-black w-full h-screen flex flex-col text-white"
    >
      <div
        id="title-animation"
        className="flex-1 grow flex flex-row justify-center items-center relative"
      >
        <RingParticles />
      </div>

      <div
        id="title-texts"
        className="flex flex-col md:flex-row justify-between items-start md:items-end relative w-full space-y-6 md:space-y-0 px-10 pb-10"
      >
        {/* Title */}
        <div className="order-1 md:order-none flex flex-col justify-end items-start">
          <p className="text-xl text-cosmic font-geist uppercase pb-2">
            {"//"} Web Developer{" "}
            <span className="animate-pulse text-cosmic">▮</span>
          </p>
          <h1 className="text-4xl md:text-6xl font-golos tracking-tighter">
            Aulia Zulkarneidi.
          </h1>
        </div>

        {/* Description and Button */}
        <div className="order-2 md:order-none flex flex-col justify-start items-start space-y-4">
          <p className="text-md max-w-sm font-geist uppercase">
            A software developer with experience in web, mobile, and embedded
            system development.
          </p>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 justify-between items-start w-full">
            <button className="font-geist uppercase bg-white text-black font-semibold w-44 h-12 shadow-md hover:bg-gray-200 transition-all">
              Explore Projects
            </button>
            <div className="flex flex-col h-full min-h-12 justify-start md:justify-end items-center hover:cursor-pointer">
              <span className="block md:hidden mb-1 text-sm font-geist uppercase tracking-wide text-white">
                Scroll Down
              </span>
              <button
                onClick={scrollToProjects}
                className="animate-bounce text-white hover:text-gray-300"
                aria-label="Scroll Down"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
