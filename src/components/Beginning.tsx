import React, { JSX, useEffect, useRef, useState, useCallback } from "react";
import ParticleBackground from "./ParticleBackground";
import { gsap } from "gsap";
import Title from "./Title";
import ScrollDownArrow from "./ScrollDownArrow";
import ProjectsBentoBox from "./ProjectsBentoBox";
import GeneralButton from "./GeneralButton";

const shapes = ["torus", "ringParticles", "ringParticles"] as const;

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
    <div
      key="layout-0"
      className="flex flex-col items-center justify-center space-y-4"
    >
      <div className="text-center text-gray-300 text-3xl font-funnel">
        <p className="hover:text-white hover:text-4xl hover:cursor-pointer transition-all duration-500">
          Aulia <br />{" "}
          <span className="font-instrument italic tracking-wider">
            Zulkarneidi
          </span>
        </p>
      </div>
      <GeneralButton text="About Me" link="/about" />
    </div>,
    <Title key="layout-2" />,
    <ProjectsBentoBox key="layout-3" />,
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
  }, [index, layouts.length]);

  const animateLayoutChange = useCallback(
    (newIndex: number) => {
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
    },
    [setIndex]
  );

  const goToIndex = useCallback(
    (nextIndex: number) => {
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
    },
    [index, animateLayoutChange, setShape]
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const nextIndex =
        delta > 0
          ? Math.min(index + 1, layouts.length - 1)
          : Math.max(index - 1, 0);
      goToIndex(nextIndex);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        goToIndex(Math.min(index + 1, layouts.length - 1));
      } else if (e.key === "ArrowUp") {
        goToIndex(Math.max(index - 1, 0));
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    scrollContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, layouts.length, goToIndex, scrollContainerRef]);

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
        className="absolute bottom-16 md:bottom-3 z-30 opacity-0 translate-y-5 pointer-events-none"
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
