"use client";
import React, { useRef } from "react";
import {
  MotionValue,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Hero from "@/components/Hero";
import Title from "@/components/Title";

const CARD_COUNT = 3;

const Card = ({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const spread = 1.5; // slow down effect
  const segment = 1 / (total * spread);

  const baseStart = index * segment;
  const stick = baseStart + segment * 0.3;
  const scaleStart = stick + segment * 0.3;
  const end = (index + 1) * segment;

  const start = index === 0 ? baseStart : baseStart - segment * 0.3;

  const rawY = useTransform(
    scrollYProgress,
    [start, stick, end],
    ["100%", "0%", "0%"]
  );
  const rawScale = useTransform(
    scrollYProgress,
    [baseStart, scaleStart, end],
    [1, 1, 0.7]
  );
  const rawBlur = useTransform(
    scrollYProgress,
    [baseStart, scaleStart, end],
    ["blur(0px)", "blur(0px)", "blur(4px)"]
  );
  const translateY = useTransform(
    scrollYProgress,
    [start, stick, end],
    [`${index * 40}px`, "0px", "0px"]
  );

  const springConfig = { damping: 20, stiffness: 60 };
  const smoothY = useSpring(rawY, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);
  const smoothTranslateY = useSpring(translateY, springConfig);

  const y = index === 0 ? "0%" : smoothY;
  const scale = index === total - 1 ? 1 : smoothScale;
  const blur = index === total - 1 ? "blur(0px)" : rawBlur;

  return (
    <motion.div
      style={{
        y,
        scale,
        filter: blur,
        zIndex: index + 1,
      }}
      className="absolute top-0 left-0 w-full h-full"
    >
      <motion.div style={{ y: smoothTranslateY }}>
        <Hero />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <div className="bg-black w-full h-screen relative">
        {/* HEADER */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 font-geist">
          {/* Left: Logo */}
          <div className="text-white uppercase font-bold text-2xl tracking-widest">
            AZ
          </div>

          {/* Center: Navigation Menu */}
          <nav className="mx-auto hidden md:block">
            <ul className="flex space-x-12 bg-white bg-opacity-20 backdrop-blur-md rounded-full px-12 py-4 text-white uppercase text-md font-semibold tracking-wide shadow-md">
              <li className="hover:cursor-pointer">
                <a href="#home" className="hover:text-gray-300 transition">
                  Home
                </a>
              </li>
              <li className="hover:cursor-pointer">
                <a href="#projects" className="hover:text-gray-300 transition">
                  Projects
                </a>
              </li>
              <li className="hover:cursor-pointer">
                <a href="#cv" className="hover:text-gray-300 transition">
                  CV
                </a>
              </li>

              <li className="relative flex items-center space-x-2 hover:text-gray-300 hover:cursor-pointer">
                <a href="#blog" className=" transition">
                  Blog
                </a>
                <span
                  className="flex justify-center items-center w-6 h-6 rounded-full bg-black bg-opacity-40"
                  style={{ transform: "rotate(45deg)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </span>
              </li>
            </ul>
          </nav>

          {/* Right side empty or add something later */}
          <div className="md:hidden flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer relative p-4">
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-black rounded"></span>
              <span className="block w-6 h-0.5 bg-black rounded"></span>
              <span className="block w-6 h-0.5 bg-black rounded"></span>
            </div>
          </div>
        </header>

        <Title />

        <div id="content">
          <div className="bg-black text-white min-h-screen p-10">
            {/* Increased scroll height even more */}
            <div ref={scrollRef} className="relative w-full h-[300vh] mx-auto">
              <div className="sticky top-20 h-[600px]">
                <div className="relative w-full h-full">
                  {Array.from({ length: CARD_COUNT }).map((_, i) => (
                    <Card
                      key={i}
                      index={i}
                      total={CARD_COUNT}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="projects"
          className="bg-black h-full w-full flex flex-col justify-center items-center text-white"
        >
          <h2 className="text-2xl">Projects</h2>
        </div>
      </div>
    </>
  );
}
