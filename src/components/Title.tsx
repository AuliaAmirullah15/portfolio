import React from "react";

const Title = () => {
  return (
    <div id="title" className="w-full h-full flex flex-col text-white">
      <div
        id="title-animation"
        className="flex-1 grow flex flex-row justify-center items-center relative"
      ></div>

      <div
        id="title-texts"
        className="flex flex-col md:flex-row justify-between items-start md:items-end relative w-full space-y-6 md:space-y-0 px-10 pb-10 mb-20 md:mb-0"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
