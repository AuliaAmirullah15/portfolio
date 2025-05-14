"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const section2 = section2Ref.current;
    const section3 = section3Ref.current;

    // Hero section zooms out slower and stays in place (does not fade)
    gsap.to(hero, {
      scale: 0.7, // Zoom out
      y: 1200, // Slight vertical movement
      scrollTrigger: {
        trigger: section2,
        start: "top bottom", // Trigger animation when section 2 comes into view
        end: "top top", // End when section 2 reaches the center
        scrub: 1, // Smooth scrolling animation
      },
    });

    // Section 2 zooms out slower, stays visible without fading
    gsap.to(section2, {
      scale: 0.7, // Zoom out
      y: 700, // Vertical movement for section 2
      scrollTrigger: {
        trigger: section3,
        start: "top center", // Trigger animation when section 3 comes into view
        end: "top top", // End when section 3 reaches the center
        scrub: 1, // Smooth scrolling animation
      },
    });

    // Section 3 pulls up, hiding hero and section 2 behind it
    gsap.to(section3, {
      y: -500, // Pull section 3 upwards
      scrollTrigger: {
        trigger: section3,
        start: "top center", // Start animation when section 3 hits the center
        end: "bottom top", // End when section 3 reaches the top of the screen
        scrub: 1, // Smooth scroll-based animation
        onEnter: () => {
          // Ensure Section 2 and Hero stay behind Section 3
          gsap.to(hero, { zIndex: -1 });
          gsap.to(section2, { zIndex: -1 });
        },
        onLeaveBack: () => {
          // When scrolling back up, restore zIndex to keep Section 2 and Hero on top
          gsap.to(hero, { zIndex: 10 });
          gsap.to(section2, { zIndex: 10 });
        },
      },
    });
  }, []);

  return (
    <main className="bg-zinc-950 overflow-hidden px-20">
      {/* Intro Section */}
      <section className="h-screen w-full flex items-center justify-center">
        <h2 className="text-7xl text-white">Web Developer</h2>
      </section>

      {/* Hero Section (Sticky!) */}
      <section
        ref={heroRef}
        className="sticky top-0 h-screen z-20 flex items-center justify-center"
      >
        <Hero />
      </section>

      {/* Section 2 (Normal flow) */}
      <section
        ref={section2Ref}
        className="relative z-30 -mt-24" // Negative margin to pull Section 2 upwards
      >
        <section className="w-full h-[80vh] flex items-center bg-ocean-900 text-white overflow-hidden relative rounded-[2rem] shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8">Section 2</h2>
          <p className="text-center max-w-2xl mx-auto">
            This section appears behind the Hero and zooms out.
          </p>
        </section>
      </section>

      {/* Section 3 (Normal flow) */}
      <section
        ref={section3Ref}
        className="relative z-40 -mt-24" // Negative margin to pull Section 3 upwards
      >
        <section className="w-full h-[80vh] flex items-center bg-ocean-900 text-white overflow-hidden relative rounded-[2rem] shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8">Section 3</h2>
          <p className="text-center max-w-2xl mx-auto">
            This section replaces Section 2 with a similar effect.
          </p>
        </section>
      </section>
    </main>
  );
}
