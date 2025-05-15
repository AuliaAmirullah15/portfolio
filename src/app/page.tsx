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

    // Hero zooms out when section 2 approaches
    gsap.to(hero, {
      scale: 0.5,
      y: 1200,
      scrollTrigger: {
        trigger: section2,
        start: "top 100%",
        end: "top -80%",
        scrub: 6,
      },
    });

    // Section 2 zooms out when section 3 approaches
    gsap.to(section2, {
      scale: 0.5,
      y: 1200,
      scrollTrigger: {
        trigger: section3,
        start: "top 90%",
        end: "top -100%",
        scrub: 6,
      },
    });

    // Raise z-index of Section 2 to be above Hero
    ScrollTrigger.create({
      trigger: section2,
      start: "top 70%",
      end: "bottom top",
      onEnter: () => gsap.set(section2, { zIndex: 30 }),
      onLeaveBack: () => gsap.set(section2, { zIndex: 20 }),
    });

    // Raise z-index of Section 3 to be above Section 2
    ScrollTrigger.create({
      trigger: section3,
      start: "top 70%",
      end: "bottom top",
      onEnter: () => gsap.set(section3, { zIndex: 40 }),
      onLeaveBack: () => gsap.set(section3, { zIndex: 30 }),
    });
  }, []);

  return (
    <main className="bg-zinc-950 overflow-hidden px-20 space-y-6">
      {/* Intro Section */}
      <section className="h-screen w-full flex items-center justify-center">
        <h2 className="text-7xl text-white">Web Developer</h2>
      </section>

      {/* Hero Section (Sticky!) */}
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="sticky top-0 h-screen z-10 flex items-center justify-center"
      >
        <Hero />
      </section>

      {/* Section 2 */}
      <section ref={section2Ref} className="relative z-20 -mt-24">
        <section className="w-full h-[80vh] flex items-center bg-ocean-900 text-white overflow-hidden relative rounded-[2rem] shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8">Section 2</h2>
          <p className="text-center max-w-2xl mx-auto">
            This section appears behind the Hero and zooms out.
          </p>
        </section>
      </section>

      {/* Section 3 */}
      <section ref={section3Ref} className="relative z-30 -mt-24">
        <section className="w-full h-[80vh] flex items-center bg-ocean-900 text-white overflow-hidden relative rounded-[2rem] shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8">Section 3</h2>
          <p className="text-center max-w-2xl mx-auto">
            This section replaces Section 2 with a similar effect.
          </p>
        </section>
      </section>

      <section className="h-screen w-full flex items-center justify-center">
        <h2 className="text-7xl text-white">The Next Section</h2>
      </section>
    </main>
  );
}
