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
  const start = index / total;
  const end = (index + 1) / total;
  const y = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

  return (
    <motion.div
      style={{ y, zIndex: index + 1 }} // <-- reverse stacking here
      className="absolute top-0 left-0 w-full h-full px-6"
    >
      <Hero />
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
