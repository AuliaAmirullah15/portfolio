"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Beginning from "@/components/Beginning";
import Header from "@/components/Header";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
};

const ScrollProxyHeader = ({ targetRef }: Props) => {
  return (
    <div
      onWheel={(e) => {
        const wheelEvent = new WheelEvent("wheel", {
          deltaY: e.deltaY,
          bubbles: true,
          cancelable: true,
        });
        targetRef.current?.dispatchEvent(wheelEvent);
      }}
      onTouchStart={(e) => {
        const touchEvent = new TouchEvent("touchstart", {
          touches: Array.from(e.nativeEvent.touches),
          bubbles: true,
          cancelable: true,
        });
        targetRef.current?.dispatchEvent(touchEvent);
      }}
      onTouchEnd={(e) => {
        const touchEvent = new TouchEvent("touchend", {
          changedTouches: Array.from(e.nativeEvent.changedTouches),
          bubbles: true,
          cancelable: true,
        });
        targetRef.current?.dispatchEvent(touchEvent);
      }}
      className="absolute w-full top-0 z-50"
    >
      <Header />
    </div>
  );
};

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="bg-black w-full min-h-screen relative">
      <ScrollProxyHeader targetRef={scrollContainerRef} />
      <motion.div>
        <Beginning scrollContainerRef={scrollContainerRef} />
      </motion.div>
    </div>
  );
}
