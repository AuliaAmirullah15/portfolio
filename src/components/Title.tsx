import React from "react";
import ParticlesBackground from "./ParticlesBackground";

const Title = () => {
  return (
    <div
      id="title"
      className="h-full w-full flex flex-col px-10 pb-10 text-white space-x-10"
    >
      <div
        id="title-animation"
        className="flex-1 grow flex flex-row justify-center items-center"
      >
        <ParticlesBackground />
      </div>
      <div id="title-texts" className="flex flex-row justify-between">
        {/* Bottom-left name */}
        <div className="flex flex-col justify-end items-start">
          <h1 className="text-7xl font-gloock">Aulia Zulkarneidi</h1>
        </div>

        {/* Bottom-right description and arrow */}
        <div className="flex items-end space-x-32">
          <p className="text-md max-w-sm">
            A software developer with experience in web, mobile, and embedded
            system development.
          </p>

          {/* Downward arrow with long stick */}
          <div className="flex flex-col items-center">
            <div className="text-2xl">↓</div> {/* Down arrow */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
