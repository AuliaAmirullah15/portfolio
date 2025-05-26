import React, { useEffect, useRef, useState } from "react";
import ParticleBackground from "./ParticleBackground";
import { gsap } from "gsap";

const texts = [
  ["WEB", "DEVELOPER"],
  ["AULIA", "ZULKARNEIDI"],
  ["UI/UX", "DEVELOPER"],
  ["PRESS ME", "TO CONTINUE"],
];

const Beginning = () => {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialAnimationDone = useRef(false);
  const isAnimating = useRef(false);

  // Initial animation on mount (after 4 sec delay based on particle animation)
  useEffect(() => {
    if (textRef.current) gsap.set(textRef.current, { opacity: 0, y: 40 });

    const timeout = setTimeout(() => {
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }
      initialAnimationDone.current = true;
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const animateTextChange = (newIndex: number) => {
    if (!textRef.current || !initialAnimationDone.current) return;

    isAnimating.current = true;

    gsap.to(textRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.5,
      ease: "power1.in",
      onComplete: () => {
        setIndex(newIndex);

        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  // Scroll handler scoped only to this component
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (scrollTimeoutRef.current || isAnimating.current) return;

    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 1200);

    if (e.deltaY > 0 && index < texts.length - 1) {
      animateTextChange(index + 1);
    } else if (e.deltaY < 0 && index > 0) {
      animateTextChange(index - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", onWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", onWheel);
  }, [index]);

  const scrollToTitle = () => {
    if (index === texts.length - 1) {
      const el = document.getElementById("title");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      id="beginning"
      className="w-full h-screen flex items-center justify-center relative z-10 overflow-hidden"
      style={{ overscrollBehavior: "none" }}
    >
      <ParticleBackground />
      <div
        ref={textRef}
        className="absolute z-20 text-center text-gray-300 text-xl font-mono cursor-pointer select-none"
        onClick={scrollToTitle}
        style={{
          userSelect: "none",
          opacity: 0,
          transform: "translateY(40px)",
        }}
      >
        <p className="hover:text-white hover:text-2xl transition-all duration-500">
          {texts[index][0]} <br />
          {texts[index][1]}
        </p>
      </div>
    </div>
  );
};

export default Beginning;
