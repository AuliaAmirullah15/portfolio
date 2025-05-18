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

  const start = index * segment;
  const stick = start + segment * 0.3; // card slides up fully and sticks
  const scaleStart = stick + segment * 0.3; // scale down starts here
  const end = (index + 1) * segment;

  // y goes from 100% to 0% between start and stick, then stays 0%
  const y = useTransform(
    scrollYProgress,
    [start, stick, end],
    ["100%", "0%", "0%"]
  );

  // scale stays 1 until scaleStart, then goes 1 → 0.9 till end
  const scale = useTransform(
    scrollYProgress,
    [start, scaleStart, end],
    [1, 1, 0.9]
  );

  return (
    <motion.div
      style={{ y, scale, zIndex: index + 1 }}
      className="absolute top-0 left-0 w-full h-full px-6"
    >
      <div
        style={{
          transform: `translateY(${index * -5}px)`,
        }}
      >
        <Hero />
      </div>
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
        <div className="h-full w-full flex flex-col justify-center items-center text-white">
          <h2 className="text-2xl">Software Developer</h2>
        </div>
        <div>
          <div className="bg-black text-white min-h-screen p-10">
            <div ref={scrollRef} className="relative w-full h-[300vh] mx-auto">
              {/* Sticky card deck container */}
              <div className="sticky top-20 h-[600px]">
                <div className="relative w-full h-full space-y-12">
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
        <div className="bg-black h-full w-full flex flex-col justify-center items-center text-white">
          <h2 className="text-2xl">Projects</h2>
        </div>
      </div>
    </>
  );
}
