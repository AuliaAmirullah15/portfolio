"use client";
import React, { useRef, useState } from "react";
import Header from "./Header";
import Image from "next/image";
import WelcomeScreen from "@/assets/images/kiosk/splash.png";
import MenuPage from "@/assets/images/kiosk/menu.png";
import Customisation from "@/assets/images/kiosk/customisation.png";
import Nutrition from "@/assets/images/kiosk/nutrition.png";
import Hiw from "@/assets/images/kiosk/hiw.png";
import OrderNumber from "@/assets/images/kiosk/order_number.png";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PhotoKiosk from "@/assets/images/kiosk/photo_kiosk.jpg";
import PhotoKiosk2 from "@/assets/images/kiosk/photo_kiosk_2.jpg";
import PhotoOrderFood from "@/assets/images/kiosk/photo_order_food.jpg";
import PhotoBehindTheScene from "@/assets/images/kiosk/photo_behind_the_scene.jpg";
import PhotoFood from "@/assets/images/kiosk/photo_food.jpg";
import GeneralFooter from "./GeneralFooter";

const techStack = [
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
];

type Card = {
  id: number;
  link: string;
};

const cards: Card[] = [
  {
    id: 1,
    link: WelcomeScreen.src,
  },
  {
    id: 2,
    link: MenuPage.src,
  },
  {
    id: 3,
    link: Customisation.src,
  },
  { id: 4, link: Nutrition.src },
  { id: 5, link: Hiw.src },
  { id: 6, link: OrderNumber.src },
];

const Project = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="w-full min-h-screen font-funnel bg-black">
      <Header />

      <div id="content" className="pt-36 px-8 pb-8">
        <div
          id="banner"
          className="w-full flex flex-col md:flex-row text-white text-center px-4 space-y-16 md:space-y-0 md:space-x-16"
        >
          <div className="flex flex-1 flex-col items-start justify-start">
            <h2 className="text-2xl pb-4">
              Greggs{" "}
              <span className="font-instrument italic tracking-wider">
                Kiosk
              </span>
            </h2>
            <p className="text-left text-md pb-8">
              The Greggs Kiosk is a modern, customer-facing digital solution
              developed by the in-house Kiosk team at Greggs that runs on Linux.
              Designed to enhance the in-shop experience, the kiosk allows
              customers to browse the full menu, explore current offers, and
              take advantage of exclusive deals with ease and convenience.
            </p>
            <h2 className="text-2xl pb-4">Overview</h2>
            <p className="text-left text-md">
              I joined the Kiosk team as one of the first developers on a
              flagship project within the Greggs 2025 roadmap, helping to shape
              the early prototype that laid the foundation for key
              customer-facing features. I, later on, led the development of a
              reusable order-sharing, Google Analytics and loyalty packages with
              OnePub, now adopted by other teams including POS and
              drive-through, along with a shared models library that ensures
              consistency across tills and backend systems.
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start">
            <p className="text-lg text-zinc-400 pb-2">Company</p>
            <p className="text-md pb-12">Greggs PLC</p>

            <p className="text-lg text-zinc-400  pb-4">Tools</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white backdrop-blur-sm text-black font-funnel"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-full w-full flex flex-row justify-start items-center md:px-6 mt-8">
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
              <SwiperSlide key={card.id} className="!w-[250px]">
                <Image
                  src={card.link}
                  alt="Welcome Screen"
                  className="rounded-md object-cover"
                  width={250}
                  height={500}
                />
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

        <div id="development-overview" className="mt-12 px-4 text-white">
          <h2 className="text-2xl pb-2">
            Product Design and{" "}
            <span className="font-instrument italic tracking-wider">
              Development
            </span>
          </h2>
          <p className="max-w-3xl">
            Researched UK competitors and in-store experiences to design the
            initial Greggs Kiosk prototype, forming the basis for user testing
            and future UI/UX improvements. I led early design work on the Meal
            Deal builder and upselling flow, and contributed across both
            frontend and backend, developing core packages for loyalty and order
            sharing with a focus on performance, reusability, and
            maintainability. I also introduced local wiremocking of allergen
            data via NGINX, and used tools like Postman to support efficient
            testing and collaboration among Frontend developers.
          </p>
        </div>

        <div
          id="development-overview"
          className="mt-12 px-4 md:px-8 flex flex-col md:flex-row gap-6 justify-center items-stretch"
        >
          {/* Left image — responsive width */}
          <div className="w-full md:flex-1 md:min-w-[200px] md:max-w-[300px]">
            <Image
              src={PhotoKiosk}
              alt="Kiosk Left"
              className="rounded-md w-full h-full object-cover"
              style={{ maxHeight: "700px" }}
            />
          </div>

          {/* Center column */}
          <div className="w-full md:flex-[2] flex flex-col gap-4 justify-between">
            <Image
              src={PhotoOrderFood}
              alt="Order Food"
              className="rounded-md w-full object-cover"
              style={{ height: "auto", maxHeight: "320px" }}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Image
                src={PhotoFood}
                alt="Food"
                className="rounded-md w-full sm:w-1/2 object-cover"
                style={{ height: "288px" }}
              />
              <Image
                src={PhotoBehindTheScene}
                alt="Behind the Scene"
                className="rounded-md w-full sm:w-1/2 object-cover"
                style={{ height: "288px" }}
              />
            </div>
          </div>

          {/* Right image — responsive width */}
          <div className="w-full md:flex-1 md:min-w-[200px] md:max-w-[300px]">
            <Image
              src={PhotoKiosk2}
              alt="Kiosk Right"
              className="rounded-md w-full h-full object-cover"
              style={{ maxHeight: "700px" }}
            />
          </div>
        </div>

        <div id="product-outcome" className="mt-12 px-4 text-white">
          <h2 className="text-2xl pb-2">
            Product{" "}
            <span className="font-instrument italic tracking-wider">
              Outcome
            </span>
          </h2>
          <p>
            By collaborating closely with cross-functional teams, including
            Retail, Finance, Brand, Master Data Management, and other product
            and engineering teams, we successfully launched the Greggs Kiosk
            into live stores, reaching three locations within the first week,
            each equipped with 2–6 kiosks. The rollout is progressing steadily,
            with continuous improvements based on real-time feedback from
            customers, shop staff, and stakeholders. Despite a tight development
            timeline, the product has been widely praised for its quality,
            stability, and overall user experience. My contributions to both the
            foundational architecture and later feature development,
            particularly in areas such as order sharing, meal deals,
            customisation, add to cart, basket, and upselling, played a key role
            in what many consider a standout achievement and a blueprint for
            future platform expansion.
          </p>
        </div>
      </div>

      <GeneralFooter />
    </div>
  );
};

export default Project;
