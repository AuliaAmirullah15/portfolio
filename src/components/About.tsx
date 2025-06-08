"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { gsap } from "gsap";
import Image from "next/image";
import { bannerPhotoImg } from "../utils";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ScrollDownArrow from "./ScrollDownArrow";
import RingParticles from "./RingParticles";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ContactMeButton({ className }: { className?: string }) {
  return (
    <button
      className={`contact-button relative group px-8 py-4 text-white font-semibold rounded-full bg-black/40 backdrop-blur-md border border-white/30 overflow-visible 
      before:absolute before:inset-0 before:rounded-full before:border before:border-white/40 before:shadow-inner
      transition duration-300 ease-in-out hover:scale-105 hover:bg-black/70 hover:border-white hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3 ${className}`}
    >
      <span className="shiny-text">Say Hello</span>
      <span
        className="inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
}

export default function About() {
  useEffect(() => {
    // Animate gradient border
    const gradientEl = document.getElementById("gradient-border");
    const gradientTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#myself",
        toggleActions: "play pause reverse restart",
        start: "10% bottom",
        once: true,
      },
    });

    gradientTl
      .to(gradientEl, {
        opacity: 1,
        height: "80px",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(gradientEl, {
        width: "100%",
        duration: 2,
        ease: "power2.out",
      })
      .to(gradientEl, {
        height: "2px",
        duration: 1,
        ease: "power2.inOut",
      });

    // Banner entrance animation
    const bannerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#banner",
        start: "top center",
        once: true,
      },
    });

    bannerTl
      .from(".profile-image", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(1.7)",
      })
      .from(
        ".availability",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".name-text",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".role-text",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".social-icons a",
        {
          opacity: 0,
          y: 10,
          stagger: 0.2,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // Animate contact buttons by class selector, no filtering
      .fromTo(
        ".banner-contact-button",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    // Animate #myself section
    const myselfTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#myself",
        start: "top 80%",
        once: true,
      },
    });

    myselfTl
      .from("#myself h2, #myself p", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      })
      .fromTo(
        ".myself-contact-button",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

    const items = gsap.utils.toArray(".value-item") as HTMLElement[];

    gsap.to(items, {
      scrollTrigger: {
        trigger: "#values",
        pin: true,
        scrub: true,
        start: "top top",
        end: `+=${items.length * 100}%`,
      },
      opacity: 1,
      y: 0,
      stagger: {
        each: 1,
        onStart: (i) => {
          items.forEach((el, idx) => {
            if (idx !== i) {
              gsap.set(el, { opacity: 0, y: 40 });
            }
          });
        },
      },
    });
  }, []);

  return (
    <div className="w-full min-h-screen font-funnel">
      <Header />

      <div
        id="banner"
        className="w-full min-h-screen flex flex-col justify-center items-center text-white text-center space-y-6 px-4 border-b-[6px] border-white/10"
      >
        <RingParticles />

        {/* Profile Image */}
        <div className="relative mb-4 w-[150px] h-[150px] rounded-full overflow-hidden profile-image">
          <div className="absolute inset-0 z-10 rounded-full border-[10px] border-white/10 pointer-events-none" />
          <Image
            alt="hero photo image"
            src={bannerPhotoImg}
            width={150}
            height={150}
            className="rounded-full object-cover scale-[0.96]"
            quality={100}
            priority
          />
        </div>

        {/* Availability Status */}
        <div className="flex flex-row items-center space-x-4 availability">
          <div className="relative">
            <span className="absolute -right-1.5 bottom-0.5 inline-flex h-5 w-5 rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </div>
          <span className="text-md text-zinc-400 tracking-wider">
            available for work
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl mt-2 name-text">
          Aulia{" "}
          <span className="font-instrument text-zinc-400 italic tracking-wider">
            Zulkarneidi
          </span>
        </h1>

        {/* Role */}
        <p className="text-lg text-zinc-400 mt-1 role-text">
          Web Developer based in Newcastle, UK
        </p>

        {/* Social Icons */}
        <div className="flex gap-16 mt-4 text-zinc-400 social-icons">
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            aria-label="Instagram"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} className="hover:text-white duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            aria-label="LinkedIn"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} className="hover:text-white duration-300" />
          </a>
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            aria-label="GitHub"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} className="hover:text-white duration-300" />
          </a>
        </div>

        {/* Contact Button */}
        <ContactMeButton className="banner-contact-button" />

        <ScrollDownArrow className="justify-end" />
      </div>

      <div
        id="myself"
        className="relative w-full h-full bg-black min-h-screen text-white px-4 md:px-20 py-12 md:py-24"
      >
        {/* Gradient Border */}
        <div
          id="gradient-border"
          className="absolute top-0 left-1/2 translate-x-[-50%] h-[80px] z-10 overflow-hidden pointer-events-none"
          style={{
            width: "0px",
            height: "0px",
            background:
              "linear-gradient(90deg, #5182ec, #2d192a, #c261d3, #863557, #de5456, #334f90)",
            opacity: 0,
            transformOrigin: "center top",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        {/* About Section Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-20 lg:space-y-0 p-8">
          <div className="flex-1">
            <h2 className="text-5xl mb-6">
              More about{" "}
              <span className="font-instrument italic tracking-wider text-zinc-400">
                myself
              </span>
            </h2>
            <p className="text-zinc-300 text-lg pb-4">
              Hi, I’m Aulia, a web developer with a strong focus on building
              thoughtful, user-centred digital solutions. I believe in looking
              beyond the obvious, whether that’s exploring the right technology
              stack, refining software architecture, or crafting interfaces that
              are both intuitive and accessible. My approach is all about
              creating apps and systems that truly work for people and
              businesses alike, delivering lasting value through careful design
              and solid engineering.
            </p>
            <ContactMeButton className="hidden lg:flex myself-contact-button" />
          </div>
          <div className="flex-1">
            <p className="text-zinc-300 leading-relaxed pb-4">
              With just over four years’ experience as a developer, I’ve come to
              understand that great software isn’t just about writing code that
              works! It’s about building solutions that last. For me, that means
              thinking deeply about maintainability, testing, and architecture
              from the start, while always keeping the user experience front and
              centre.
            </p>
            <p className="text-zinc-300 leading-relaxed pb-4">
              I treat every project as a chance to do something meaningful,
              whether it’s designing kiosks with Flutter that are accessible and
              handle payments smoothly, or building mobile and iPad apps for
              tracking inventory that tap into device features like cameras,
              biometrics systems and memory. I’m heavily involved in choosing
              the right tech stacks and designing software architecture that not
              only meets business needs but scales well for the future.
            </p>
            <p className="text-zinc-300 leading-relaxed pb-4">
              What drives me is the challenge of balancing solid engineering
              with great design, making sure interfaces aren’t just visually
              appealing but genuinely intuitive and enjoyable to use. I believe
              good UI and UX are as essential as clean, tested code.
            </p>
            <ContactMeButton className="block lg:hidden myself-contact-button" />
          </div>
        </div>
      </div>
      <div
        id="values"
        className="w-full h-full min-h-screen bg-zinc-900 text-white px-4 md:px-20 py-12 md:py-24 overflow-hidden relative flex flex-row justify-center items-center"
      >
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 p-8 items-center justify-center">
          <div
            id="value-title"
            className="w-full md:w-1/2 mb-8 md:mb-0 sticky self-start font-funnel"
          >
            <h2 className="text-4xl pb-4">
              What’s important{" "}
              <span className="font-instrument tracking-wider italic">
                to me?
              </span>
            </h2>
            <p>
              I believe that great digital solutions live at the intersection of
              thoughtful design and solid engineering. For me, success means
              building systems that not only function well but also feel
              intuitive, scale effectively, and bring real value to both users
              and businesses.
            </p>
          </div>

          {/* Animated values */}
          <div
            id="value-content"
            className="w-full md:w-1/2 relative h-[150px] self-start"
          >
            <div className="absolute inset-0 flex flex-col justify-center items-start value-item opacity-0 translate-y-20">
              <p className="text-lg mb-2">01</p>
              <h3 className="text-2xl font-semibold mb-2">Team Culture</h3>
              <p className="text-zinc-300">
                I thrive on clear communication and cross-functional
                collaboration. Working closely with designers, product teams,
                and stakeholders ensures that everyone’s aligned on what we’re
                building and why, so the final product reflects a shared vision.
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-start value-item opacity-0 translate-y-20">
              <p className="text-lg mb-2">02</p>
              <h3 className="text-2xl font-semibold mb-2">
                User-First Engineering
              </h3>
              <p className="text-zinc-300">
                Technology should serve people. Whether it’s a kiosk interface,
                web or a mobile app, I always start by understanding the user’s
                needs. Every line of code and architectural choice is made with
                the user experience in mind: ensuring solutions are accessible,
                intuitive, and genuinely useful.
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-start value-item opacity-0 translate-y-20">
              <p className="text-lg mb-2">03</p>
              <h3 className="text-2xl font-semibold mb-2">
                Scalable, Thoughtful Architecture
              </h3>
              <p className="text-zinc-300">
                Great software isn’t just about what works now, it’s about what
                lasts. I focus on maintainable, testable, and scalable systems,
                selecting tech stacks and designing architectures that evolve
                alongside business goals.
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-start value-item opacity-0 translate-y-20">
              <p className="text-lg mb-2">04</p>
              <h3 className="text-2xl font-semibold mb-2">
                Constant Learning and Refinement
              </h3>
              <p className="text-zinc-300">
                Technology never stands still, and neither do I. I stay curious,
                continuously learning from new tools, patterns, and challenges.
                Each project is a chance to refine my approach and push the
                boundaries of what’s possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="timeline"
        className="w-full h-full min-h-screen bg-black text-white"
      >
        ashjdgfjasd
      </div>
    </div>
  );
}
