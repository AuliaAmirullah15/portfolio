import React, { JSX, useEffect, useRef, useState } from "react";
import ParticleBackground from "./ParticleBackground";
import { gsap } from "gsap";
import Title from "./Title";
import ScrollDownArrow from "./ScrollDownArrow";
import ProjectsBentoBox from "./ProjectsBentoBox";

const shapes = [
  "torus",
  "sphere",
  "crystalCluster",
  "disc",
  "ribbonWave",
] as const;

type BeginningProps = {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

const Beginning = ({ scrollContainerRef }: BeginningProps) => {
  const [index, setIndex] = useState(0);
  const [shape, setShape] = useState<(typeof shapes)[number]>("torus");

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialAnimationDone = useRef(false);
  const isAnimating = useRef(false);
  const layoutRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);

  const layouts: JSX.Element[] = [
    <div key="layout-0" className="text-center text-gray-300 text-xl font-mono">
      <p className="hover:text-white hover:text-2xl hover:cursor-pointer transition-all duration-500">
        AULIA <br /> ZULKARNEIDI
      </p>
    </div>,
    <div
      key="layout-1"
      className="text-center text-gray-300 text-xl hover:text-white hover:text-2xl hover:cursor-pointer  font-bold font-mono transition-all duration-500"
    >
      <p>WEB DEVELOPER</p>
      <p>BASED IN</p>
      <p>NEWCASTLE UPON TYNE,</p>
      <p>UNITED KINGDOM</p>
    </div>,
    <Title key="layout-2" />,
    <ProjectsBentoBox key="layout-3" />,
    <div key="layout-4" className="text-center text-gray-300 text-xl font-mono">
      <p className="hover:text-white transition-all duration-500">
        SOFTWARE ENGINEER
      </p>
    </div>,
  ];

  useEffect(() => {
    if (layoutRef.current) gsap.set(layoutRef.current, { opacity: 0, y: 40 });

    const timeout = setTimeout(() => {
      if (layoutRef.current) {
        gsap.to(layoutRef.current, {
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

  // Animate ScrollDownArrow in/out smoothly on index change
  useEffect(() => {
    if (!arrowRef.current) return;

    if (index < layouts.length - 1) {
      // Animate in
      gsap.to(arrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      // Animate out
      gsap.to(arrowRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [index]);

  const animateLayoutChange = (newIndex: number) => {
    if (!layoutRef.current || !initialAnimationDone.current) return;

    isAnimating.current = true;

    gsap.to(layoutRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.5,
      ease: "power1.in",
      onComplete: () => {
        setIndex(newIndex);

        gsap.fromTo(
          layoutRef.current,
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

  const goToIndex = (nextIndex: number) => {
    if (
      nextIndex !== index &&
      !isAnimating.current &&
      !scrollTimeoutRef.current
    ) {
      animateLayoutChange(nextIndex);
      setShape(shapes[nextIndex] || shapes[0]);

      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 1200);
    }
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const nextIndex =
      delta > 0
        ? Math.min(index + 1, layouts.length - 1)
        : Math.max(index - 1, 0);
    goToIndex(nextIndex);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartYRef.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = touchStartYRef.current - endY;

    if (Math.abs(deltaY) < 30) return;

    const nextIndex =
      deltaY > 0
        ? Math.min(index + 1, layouts.length - 1)
        : Math.max(index - 1, 0);
    goToIndex(nextIndex);
    touchStartYRef.current = null;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      goToIndex(Math.min(index + 1, layouts.length - 1));
    } else if (e.key === "ArrowUp") {
      goToIndex(Math.max(index - 1, 0));
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", onWheel, { passive: false });
    scrollContainer.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });
    scrollContainer.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      scrollContainer.removeEventListener("wheel", onWheel);
      scrollContainer.removeEventListener("touchstart", onTouchStart);
      scrollContainer.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-screen flex items-center justify-center relative z-10 overflow-hidden"
      style={{ overscrollBehavior: "none" }}
      role="region"
      aria-label="Scrollable sections"
      tabIndex={0}
    >
      <ParticleBackground shape={shape} />
      <div
        ref={layoutRef}
        className="absolute z-20 w-full h-full flex items-center justify-center"
        style={{ userSelect: "none", opacity: 0 }}
      >
        {layouts[index]}
      </div>
      <div
        ref={arrowRef}
        className="absolute bottom-6 z-30 opacity-0 translate-y-5 pointer-events-none"
        aria-hidden={index >= layouts.length - 1}
      >
        <ScrollDownArrow
          className="justify-end"
          remainingPage={(layouts.length - 1 - index).toString()}
        />
      </div>
    </div>
  );
};

export default Beginning;
