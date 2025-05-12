import React, { useState } from "react";
import {
  bannerPhotoImg,
  heroPhotoPattern,
  introCallImg,
  pattern1Img,
} from "../utils";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import CustomCursor from "./CustomCursor";

function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full h-[80vh] flex items-center bg-blue-950 text-white overflow-hidden relative">
      <div id="pattern1" className="absolute w-[80%] h-full z-0">
        <Image
          alt="pattern1"
          src={pattern1Img}
          width={200}
          height={200}
          className="object-cover mt-36"
          quality={100}
          priority
        />
      </div>
      <div
        id="hero-content"
        className="w-full m-28 flex flex-row justify-between items-center gap-10 relative"
      >
        {/* Main content */}
        <div id="main-content-texts" className="flex flex-col gap-8 z-10">
          <h2 className="font-bold text-6xl w-96">Web Developer.</h2>
          <p className="w-96">
            Crafting scalable and maintainable web applications and software
            which are accessible for everyone.
          </p>
          <div className="flex flex-row">
            <div
              id="book-intro-call"
              className="relative flex flex-row justify-between items-center gap-2 bg-white text-blue-950 hover:text-white font-bold py-2 pl-2 pr-3 shadow-md ring-1 ring-titanium hover:ring-titanium-600 overflow-hidden group rounded-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered && <CustomCursor />}
              <span className="absolute inset-0 bg-titanium-600 transition-all duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0 rounded-md z-0" />
              <div className="relative w-6 h-6 rounded-md overflow-hidden z-10">
                <Image
                  alt="intro call image"
                  src={introCallImg}
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
              </div>
              <p className="z-10">Book an intro call</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 z-10 mt-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-950 p-2 rounded-full hover:bg-titanium transition shadow-md ring-1 ring-titanium"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-950 p-2 rounded-full hover:bg-titanium transition shadow-md ring-1 ring-titanium"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:youremail@example.com"
              className="bg-white text-blue-950 p-2 rounded-full hover:bg-titanium transition shadow-md ring-1 ring-titanium"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-950 p-2 rounded-full hover:bg-titanium transition shadow-md ring-1 ring-titanium"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        <div className="relative w-[450px] h-[450px] z-10">
          {/* White square background */}
          <div className="absolute w-[258px] h-[256px]  border-2 border-titanium rounded-md left-[20%] top-[20%] translate-x-10 translate-y-10 z-0" />

          {/* Pattern behind everything */}
          <Image
            alt="hero photo pattern"
            src={heroPhotoPattern}
            fill
            className="object-cover z-[-10]"
            quality={100}
            priority
          />

          {/* Foreground image */}
          <Image
            alt="hero photo image"
            src={bannerPhotoImg}
            width={250}
            height={250}
            className="object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-md shadow-md ring-1 ring-titanium"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
