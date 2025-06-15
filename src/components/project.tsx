"use client";
import React, { useRef, useState } from "react";

import Header from "./Header";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GeneralFooter from "./GeneralFooter";
import { projects } from "@/data/projects";

const Project = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [data] = useState(projects[0]);

  return (
    <div className="w-full min-h-screen font-funnel bg-black">
      <Header />

      <div id="content" className="pt-36 px-8 pb-8">
        <div
          id="banner"
          className="w-full flex flex-col md:flex-row text-white text-center px-4 space-y-16 md:space-y-0 md:space-x-16"
        >
          <div className="flex flex-1 flex-col items-start justify-start">
            <h2 className="text-2xl pb-4">
              {data.title.normal}{" "}
              <span className="font-instrument italic tracking-wider">
                {data.title.highlight}
              </span>
            </h2>
            <p className="text-left text-md pb-8">{data.title.description}</p>
            <h2 className="text-2xl pb-4">Overview</h2>
            <p className="text-left text-md">{data.overview}</p>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start">
            <p className="text-lg text-zinc-400 pb-2">Company</p>
            <p className="text-md pb-12">{data.company}</p>

            <p className="text-lg text-zinc-400  pb-4">Tools</p>
            <div className="flex flex-wrap gap-2">
              {data.techStacks.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white backdrop-blur-sm text-black font-funnel"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-full w-full flex flex-row justify-start items-center md:px-6 mt-24">
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setIsEnd(swiper.isEnd);
            }}
          >
            {data.images.map((image, idx) => (
              <SwiperSlide key={idx} className="!w-[250px]">
                <Image
                  src={image.src}
                  alt="Welcome Screen"
                  className="rounded-md object-cover"
                  width={250}
                  height={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Arrow */}
          <button
            className={`absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/50 p-2 rounded-full text-white transition-all duration-300 ${
              activeIndex === 0
                ? "opacity-0 pointer-events-none -translate-x-4"
                : "opacity-100 pointer-events-auto translate-x-0"
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            className={`absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/50 p-2 rounded-full text-white transition-all duration-300 ${
              isEnd
                ? "opacity-0 pointer-events-none translate-x-4"
                : "opacity-100 pointer-events-auto translate-x-0"
            }`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div id="development-overview" className="mt-20 px-4 text-white">
          <h2 className="text-2xl pb-2">
            Product Design and{" "}
            <span className="font-instrument italic tracking-wider">
              Development
            </span>
          </h2>
          <p className="max-w-3xl">{data.development?.description}</p>
        </div>

        <div
          id="development-overview"
          className="mt-12 px-4 md:px-8 flex flex-col md:flex-row gap-6 justify-center items-stretch"
        >
          {/* Left image — responsive width */}
          <div className="w-full md:flex-1 md:min-w-[200px] md:max-w-[300px]">
            {data.development?.images[0] && (
              <Image
                src={data.development?.images[0].src}
                alt="Kiosk Left"
                width={data.development?.images[0].width}
                height={data.development?.images[0].height}
                className="rounded-md w-full h-full object-cover"
                style={{ maxHeight: "700px" }}
              />
            )}
          </div>

          {/* Center column */}
          <div className="w-full md:flex-[2] flex flex-col gap-4 justify-between">
            {data.development?.images[1] && (
              <Image
                src={data.development?.images[1].src}
                alt="Order Food"
                width={data.development?.images[1].width}
                height={data.development?.images[1].height}
                className="rounded-md w-full object-cover"
                style={{ height: "auto", maxHeight: "320px" }}
              />
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              {data.development?.images[2] && (
                <Image
                  src={data.development?.images[2].src}
                  alt="Food"
                  width={data.development?.images[2].width}
                  height={data.development?.images[2].height}
                  className="rounded-md w-full sm:w-1/2 object-cover"
                  style={{ height: "288px" }}
                />
              )}
              {data.development?.images[3] && (
                <Image
                  src={data.development?.images[3].src}
                  alt="Behind the Scene"
                  width={data.development?.images[3].width}
                  height={data.development?.images[3].height}
                  className="rounded-md w-full sm:w-1/2 object-cover"
                  style={{ height: "288px" }}
                />
              )}
            </div>
          </div>

          {/* Right image — responsive width */}
          <div className="w-full md:flex-1 md:min-w-[200px] md:max-w-[300px]">
            {data.development?.images[4] && (
              <Image
                src={data.development?.images[4].src}
                alt="Kiosk Right"
                width={data.development?.images[4].width}
                height={data.development?.images[4].height}
                className="rounded-md w-full h-full object-cover"
                style={{ maxHeight: "700px" }}
              />
            )}
          </div>
        </div>

        <div id="product-outcome" className="mt-12 px-4 text-white">
          <h2 className="text-2xl pb-2">
            Product{" "}
            <span className="font-instrument italic tracking-wider">
              Outcome
            </span>
          </h2>
          <p>{data.outcome}</p>
        </div>
      </div>

      <GeneralFooter />
    </div>
  );
};

export default Project;
