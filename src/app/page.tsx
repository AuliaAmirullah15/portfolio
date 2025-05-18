"use client";
import React, { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/Hero";

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
  const segment = 1 / total;

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

  // Always call useTransform
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

  // For the last card, override values with constants using rawMotionValue.onChange + React useState
  // But simpler is to map the MotionValue output to constant values for last card
  const y = index === 0 ? "0%" : rawY;
  const scale = index === total - 1 ? 1 : rawScale;
  const blur = index === total - 1 ? "blur(0px)" : rawBlur;

  const translateY = useTransform(
    scrollYProgress,
    [start, stick, end],
    [`${index * 40}px`, "0px", "0px"]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        filter: blur,
        zIndex: index + 1,
      }}
      className="absolute top-0 left-0 w-full h-full px-6"
    >
      <motion.div style={{ y: translateY }}>
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
        <div
          id="title"
          className="h-full w-full flex flex-col justify-end items-center text-white"
        >
          <h2 className="text-2xl">Software Developer</h2>
        </div>
        <div id="content">
          <div className="bg-black text-white min-h-screen p-10">
            <div ref={scrollRef} className="relative w-full h-[150vh] mx-auto">
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
