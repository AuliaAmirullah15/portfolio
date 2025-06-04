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
  "rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 text-white text-lg font-mono hover:scale-105 transition-transform duration-300";

type Card = {
  id: number;
  title: string;
  description: string;
  image: string;
  column: number;
  techStack: Array<string>;
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
    ],
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
      "Pinia",
      ".NET",
      "Cypress",
      "Tailwind",
      "Typescript",
      "Storyblok",
      "vitest",
      "Storybook",
      "CMS",
      "Axios",
      "Postman",
    ],
  },
  {
    id: 3,
    title: "Activ8te",
    description:
      "Mobile ERP platform for goods tracking across Southeast Asia.",
    image: activate.src,
    column: 2,
    techStack: [
      "VueJS",
      "Quasar",
      "Cordova",
      "Android Studio",
      "Xcode",
      "Axios",
      "Vuex",
    ],
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
  },
  {
    id: 5,
    title: "Beauty & Spa",
    description: "Landing page for a cosmetics and wellness brand.",
    image: beautySpa.src,
    column: 1,
    techStack: ["Vanilla JavaScript", "HTML", "CSS", "jQuery"],
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
    ],
  },
];

const ProjectsBentoBox: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const pillClasses =
    "text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white font-mono whitespace-nowrap";

  const columns: Card[][] = [[], [], []];
  cards.forEach((card) => {
    columns[card.column].push(card);
  });

  return (
    <>
      {/* Desktop 2x3 Grid Layout */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 p-4 w-full max-w-7xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`aspect-[4/3] ${cardClasses} flex overflow-hidden`}
          >
            {/* Image */}
            <div className="w-[60%] h-full hidden md:flex relative">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col items-start justify-start">
              <h3 className="text-xl font-bold pb-4">{card.title}</h3>
              <p className="text-xs pb-2">{card.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {card.techStack.map((tech, idx) => (
                  <span key={idx} className={pillClasses}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Swiper Layout */}
      <div className="md:hidden relative h-screen w-screen flex justify-center items-center">
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
            <SwiperSlide key={card.id}>
              <div className="h-[650px] w-full p-6">
                <div
                  className={`h-full w-full ${cardClasses} flex flex-col overflow-hidden`}
                >
                  <div className="relative w-full h-[68%]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col items-start justify-start">
                    <h3 className="text-xl font-bold pb-4">{card.title}</h3>
                    <p className="text-sm pb-2">{card.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {card.techStack.map((tech, idx) => (
                        <span key={idx} className={pillClasses}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Arrow */}
        <button
          className={`absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-all duration-300 ${
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
          className={`absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-all duration-300 ${
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
