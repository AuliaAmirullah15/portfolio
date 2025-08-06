import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import kiosk from "@/assets/images/kiosk/brand.png";
import greggs from "@/assets/images/greggs/brand.png";
import activate from "@/assets/images/activ8te/brand.png";
import katieJayne from "@/assets/images/katie_jayne/hero.png";
import beautySpa from "@/assets/images/beauty_spa/brand.png";
import iphoneClone from "@/assets/images/iphone_clone/titanium.png";

const cardClasses =
  "rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 text-white text-lg font-mono transition-transform duration-300";

type Card = {
  id: number;
  title: string;
  description: string;
  image: string;
  column: number;
  techStack: Array<string>;
  link: string;
};

const cards: Card[] = [
  {
    id: 1,
    title: "Greggs Kiosk",
    description:
      "Digital ordering channel for Greggs with rewards, accessibility features, and so on.",
    image: kiosk.src,
    column: 0,
    techStack: [
      "Flutter",
      "Dart",
      ".NET",
      "Cocoapod",
      "Linux",
      "SSH",
      "Wiremock",
      "Dio",
      "Docker",
      "Container",
      "Orchestration",
      "Postman",
    ],
    link: "/project/greggs-kiosk",
  },
  {
    id: 2,
    title: "Greggs Website",
    description:
      "Click & Collect site with gift cards, account tools, and promotions.",
    image: greggs.src,
    column: 1,
    techStack: [
      "VueJS",
      "Nuxt",
      "Typescript",
      ".NET",
      "Tailwind",
      "Cypress",
      "Pinia",
      "Typescript",
      "Storyblok",
      "Vitest",
      "Storybook",
      "CMS",
      "Axios",
    ],
    link: "/project/greggs-website",
  },
  {
    id: 3,
    title: "Activate ERP",
    description:
      "Mobile ERP platform for goods tracking across Southeast Asia.",
    image: activate.src,
    column: 2,
    techStack: [
      "VueJS",
      "Quasar",
      "Cordova",
      "SCSS",
      "Capacitor",
      "SCSS",
      "SASS",
      "Android Studio",
      "Xcode",
      "Axios",
      "Vuex",
      "Postman",
    ],
    link: "/project/activate-erp",
  },
  {
    id: 4,
    title: "Katie Jayne",
    description:
      "E-commerce site for premium glassware with clean UI and catalogue.",
    image: katieJayne.src,
    column: 0,
    techStack: [
      "React",
      "NextJS",
      "Typescript",
      "Tailwind",
      "Redux",
      "Playwright",
      "Tailwind",
    ],
    link: "/project/katie-jayne",
  },
  {
    id: 5,
    title: "Beauty & Spa",
    description: "Landing page for a cosmetics and wellness brand.",
    image: beautySpa.src,
    column: 1,
    techStack: ["Vanilla JavaScript", "HTML", "CSS", "jQuery"],
    link: "/project/beauty-and-spa",
  },
  {
    id: 6,
    title: "iPhone Clone",
    description:
      "Animated clone of Apple’s site with 3D visuals and transitions.",
    image: iphoneClone.src,
    column: 2,
    techStack: [
      "React",
      "NextJS",
      "Typescript",
      "Three.js",
      "GSAP",
      "3D Model",
      "Web Animation",
    ],
    link: "/project/iphone-clone",
  },
];

const ProjectsBentoBox = ({ className }: { className?: string }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  //   const pillClasses =
  //     "text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white font-funnel whitespace-nowrap";
  const pillClasses =
    "text-xs font-medium px-3 py-1 rounded-full bg-white backdrop-blur-sm text-black font-funnel";

  return (
    <>
      <div
        className={`relative h-full w-screen flex flex-row justify-start items-center md:px-6 ${className}`}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            setIsEnd(swiper.isEnd);
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id} className="swiper-slide-projects-bento">
              <div className="h-[550px] md:h-[550px] w-full">
                <a
                  href={card.link}
                  className={`h-full w-full ${cardClasses} flex flex-col overflow-hidden transition-all duration-600 hover:bg-white/15`}
                  style={{
                    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='32' viewBox='0 0 120 32'><rect x='0' y='0' width='120' height='32' rx='16' fill='rgba(0,0,0,0.8)' stroke='rgba(255,255,255,0.2)' stroke-width='1'/><text x='60' y='20' text-anchor='middle' fill='white' font-family='system-ui' font-size='12' font-weight='500'>View more</text></svg>") 60 16, auto`,
                  }}
                >
                  <div className="relative w-full h-[280px] md:h-[300px] px-4 pt-4">
                    <div className="w-full h-full relative">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col items-start justify-start font-funnel">
                    <div className="flex flex-row justify-between items-center gap-2 pb-4 w-full">
                      <h3 id="card-title" className="text-xl font-bold">
                        {card.title.split(" ").map((word, index) =>
                          index === 0 ? (
                            <span key={index}>{word}</span>
                          ) : (
                            <span
                              key={index}
                              className="font-instrument tracking-wider italic ml-1"
                            >
                              {word}
                            </span>
                          )
                        )}
                      </h3>

                      <div className="flex tracking-wider font-funnel items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-black/5 border border-white/20 text-white text-sm">
                        <span>View more</span>
                      </div>
                    </div>

                    <p className="text-md pb-2">{card.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {card.techStack.map((tech, idx) => (
                        <span key={idx} className={pillClasses}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Arrow */}
        <button
          className={`absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/50 p-2 rounded-full text-white transition-all duration-300 ${
            activeIndex === 0
              ? "opacity-0 pointer-events-none -translate-x-4"
              : "opacity-100 pointer-events-auto translate-x-0"
          }`}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          className={`absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/50 p-2 rounded-full text-white transition-all duration-300 ${
            isEnd
              ? "opacity-0 pointer-events-none translate-x-4"
              : "opacity-100 pointer-events-auto translate-x-0"
          }`}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default ProjectsBentoBox;
