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
import Header from "@/components/Header";
import Beginning from "@/components/Beginning";

const CARD_COUNT = 5;

const Card = ({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const spread = 1.5;
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

  const springConfig = {
    damping: 30, // Increase damping to reduce jitter
    stiffness: 50, // Lower stiffness to ease transitions
    mass: 0.4, // Optional: slightly reduce mass for more "glide"
  };

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
      <div className="bg-black w-full min-h-screen relative">
        <Header />
        <motion.div>
          <Beginning />
          <Title />
        </motion.div>

        <div id="content">
          <div className="bg-black text-white min-h-screen p-10">
            {/* Increased scroll height even more */}
            <div ref={scrollRef} className="relative w-full h-[400vh] mx-auto">
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
          className="bg-black min-h-screen w-full flex flex-col justify-center items-center text-white"
        >
          <h2 className="text-2xl">Projects</h2>
        </div>
      </div>
    </>
  );
}
