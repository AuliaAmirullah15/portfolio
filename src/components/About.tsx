"use client";
import React, { useEffect, useRef } from "react";
import Header from "./Header";

import RingParticles from "./RingParticles";
import Image from "next/image";
import { bannerPhotoImg } from "../utils";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ScrollDownArrow from "./ScrollDownArrow";
import { gsap } from "gsap";
import {
  FaUsers,
  FaUserCheck,
  FaProjectDiagram,
  FaLightbulb,
} from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsBentoBox from "./ProjectsBentoBox";
import GeneralFooter from "./GeneralFooter";
import GeneralButton from "./GeneralButton";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Flutter",
  "Dart",
  "Vue.js",
  "Nuxt.js",
  "SCSS",
  "SASS",
  "GSAP",
  "Three.js",
  "Framer Motion",
  "D3.js",
  ".NET",
  "Node.js",
  "SQL",
  "MongoDB",
  "GraphQL",
  "Python",
  "Cypress",
  "Vitest",
  "Mocha",
];

const experience = [
  {
    company: "Greggs PLC",
    country: "United Kingdom",
    roles: [
      {
        position: "Web Developer",
        period: "January 2024 - Present",
      },
    ],
  },
  {
    company: "Vi8e Interactive Pte Ltd",
    country: "Singapore",
    roles: [
      {
        position: "Web Developer",
        period: "October 2021 - November 2022",
      },
      {
        position: "Front End Developer",
        period: "April 2021 - October 2021",
      },
    ],
  },
  {
    company: "Universitas Sumatera Utara",
    country: "Indonesia",
    roles: [
      {
        position: "Web Developer (Freelancer / Project Based)",
        period: "January 2017 - April 2020",
      },
      {
        position: "Data Science Instructor (w/ Kominfo)",
        period: "September 2019 - December 2019",
      },
      {
        position: "Laboratory Assistant",
        period: "September 2016 - July 2017",
      },
    ],
  },
];

const education = [
  {
    degree: "MSc Data Science & Artificial Intelligence",
    institution: "Newcastle University",
    note: "Distinction",
    year: "2023",
  },
  {
    degree: "BSc Information Technology",
    institution: "Universitas Sumatera Utara",
    note: "3.76 out of 4.00 (2:1)",
    year: "2020",
  },
];

function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center text-gray-300 italic text-xl font-funnel w-full px-4 ${className}`}
    >
      <div className="w-full max-w-12 h-1 bg-[linear-gradient(to_right,rgba(156,163,175,0),rgba(156,163,175,1))] scale-y-[0.3] origin-left" />
      <span className="mx-4 whitespace-nowrap text-sm">{title}</span>
      <div className="w-full max-w-12 h-1 bg-[linear-gradient(to_left,rgba(156,163,175,0),rgba(156,163,175,1))] scale-y-[0.3] origin-right" />
    </div>
  );
}

function SocialMedia() {
  return (
    <div className="flex gap-16 mt-4 text-zinc-400 social-icons">
      <a
        href="https://www.instagram.com/auliaamir153/"
        target="_blank"
        aria-label="Instagram"
        rel="noopener noreferrer"
      >
        <FaInstagram size={24} className="hover:text-white duration-300" />
      </a>
      <a
        href="https://www.linkedin.com/in/auliaamirullah/"
        target="_blank"
        aria-label="LinkedIn"
        rel="noopener noreferrer"
      >
        <FaLinkedin size={24} className="hover:text-white duration-300" />
      </a>
      <a
        href="https://github.com/AuliaAmirullah15"
        target="_blank"
        aria-label="GitHub"
        rel="noopener noreferrer"
      >
        <FaGithub size={24} className="hover:text-white duration-300" />
      </a>
    </div>
  );
}

const sayHelloLink =
  "mailto:auliaamir153@gmail.com?subject=Hello%20There&body=I%20wanted%20to%20reach%20out%20because...";

export default function About() {
  const titaniumRef = useRef<HTMLHeadingElement | null>(null);
  const skillsExperienceRef = useRef<HTMLDivElement | null>(null);

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
        height: "4px",
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
    const progressBar = document.getElementById("values-progress-bar");

    if (items.length === 0 || !progressBar) return;

    // Optional: Reveal animation as before
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

    const rainbowText = document.getElementById("rainbow-important");

    if (rainbowText) {
      gsap.to(rainbowText, {
        backgroundPosition: "200% center",
        ease: "none",
        scrollTrigger: {
          trigger: "#values",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Progress bar update based on scroll
    ScrollTrigger.create({
      trigger: "#values",
      start: "top top",
      end: `+=${items.length * 100}%`,
      scrub: true,
      onUpdate: (self) => {
        gsap.to(progressBar, {
          scaleX: self.progress,
          ease: "power2.out",
          overwrite: true,
          duration: 0.2,
        });
      },
    });

    // Animate the values-dot-indicator
    gsap.fromTo(
      "#values-dot-indicator",
      {
        opacity: 0,
        y: 40,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "#values-dot-indicator",
          start: `top bottom`,
          end: `+=${items.length * 100}%`,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      })
      .from(".project-item", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
      })
      .fromTo(
        ".see-more",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    const glow = { strength: 0 };

    gsap.to(glow, {
      strength: 0.5,
      scrollTrigger: {
        trigger: titaniumRef.current,
        start: "top 80%", // when bottom of screen reaches the element
        end: "top 20%",
        scrub: true,
      },
      onUpdate: () => {
        const intensity = glow.strength;

        const shadow =
          intensity === 0
            ? "none"
            : `
            /* Core glow around text */
            0 0 ${2 * intensity}px #FADADD,     /* light rose */
            0 0 ${5 * intensity}px #F4B6B6,    /* muted coral */
            0 0 ${7 * intensity}px #E89A9A,    /* rosewood */
            0 0 ${10 * intensity}px #D47B7B,    /* deeper blush */

            /* Linear vertical trail */
            0 ${5 * intensity}px ${5 * intensity}px #FADADD,
            0 ${10 * intensity}px ${15 * intensity}px #F4B6B6,
            0 ${20 * intensity}px ${25 * intensity}px #E89A9A,
            0 ${30 * intensity}px ${35 * intensity}px #D47B7B
        `;

        if (titaniumRef.current) {
          titaniumRef.current.style.textShadow = shadow;
        }
      },
    });

    const section = skillsExperienceRef.current;
    if (!section) return;
    const targets: HTMLElement[] = [];

    const skills = section.querySelector("#skills");
    if (skills) targets.push(skills as HTMLElement);

    const experienceItems = section.querySelectorAll("#experience > div");
    experienceItems.forEach((el) => targets.push(el as HTMLElement));

    const educationItems = section.querySelectorAll("#education > div");
    educationItems.forEach((el) => targets.push(el as HTMLElement));

    const resumeBtn = section.querySelector(".resume");
    if (resumeBtn) targets.push(resumeBtn as HTMLElement);

    // Animate each target as it enters view
    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // ✅ Animate skill pills one-by-one
    const skillsContainer = section.querySelector("#skills");
    if (skillsContainer) {
      const skillItems = skillsContainer.querySelectorAll("div");

      gsap.fromTo(
        skillItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsContainer,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Animate #contactme children with stagger
    const contactMeTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contactme",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    contactMeTl
      .from("#contactme > *", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      }) // Animate contact buttons by class selector, no filtering
      .fromTo(
        ".contactme-contact-button",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    // Animate #footer children with stagger
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer",
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });

    footerTl.from("#footer > *", {
      opacity: 0,
      y: 10,
      stagger: 0.15,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full min-h-screen font-funnel bg-black">
      <Header />

      <div
        id="banner"
        className="w-full min-h-screen flex flex-col justify-center items-center text-white text-center px-4 border-b-[6px] border-white/10"
      >
        <RingParticles />

        {/* Profile Image */}
        <div
          id="banner-content-wrapper"
          className="w-full h-full flex flex-col justify-center items-center space-y-6 z-10"
        >
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
          <SocialMedia />

          {/* Contact Button */}
          <GeneralButton
            text="Say Hello"
            className="banner-contact-button"
            link={sayHelloLink}
          />

          <ScrollDownArrow className="justify-end" />
        </div>
      </div>

      <div
        id="myself"
        className="relative w-full h-full bg-black min-h-screen text-white px-4 md:px-20 py-12 md:py-24 border-b-[1px] border-white/10"
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
            <p className="text-zinc-300 text-lg pb-8">
              Hi, I’m Aulia, a web developer with a strong focus on building
              thoughtful, user-centred digital solutions. I believe in looking
              beyond the obvious, whether that’s exploring the right technology
              stack, refining software architecture, or crafting interfaces that
              are both intuitive and accessible. My approach is all about
              creating apps and systems that truly work for people and
              businesses alike, delivering lasting value through careful design
              and solid engineering.
            </p>
            <div className="w-full flex">
              <GeneralButton
                text="Say Hello"
                className="hidden lg:flex myself-contact-button"
                link={sayHelloLink}
              />
            </div>
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
            <div className="w-full flex">
              <GeneralButton
                text="Say Hello"
                className="block lg:hidden myself-contact-button"
                link={sayHelloLink}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-1/2 h-72 bg-gradient-radial from-white/20 to-transparent blur-2xl rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />
      </div>
      <div
        id="values"
        className="w-full h-full min-h-screen bg-zinc-900 text-white px-4 md:px-20 py-12 md:py-24 overflow-hidden relative flex flex-row justify-center items-center"
      >
        {/* Progress Bar*/}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-white/10">
          <div
            id="values-progress-bar"
            className="h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          ></div>
        </div>

        {/* Pill container with dots indicator */}
        <div
          id="values-dot-indicator"
          className="absolute bottom-10 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 flex space-x-4 items-center cursor-pointer"
          aria-label="Values section progress indicator"
          role="region"
        >
          {[
            { icon: <FaUsers size={18} />, label: "Team Culture" },
            {
              icon: <FaUserCheck size={18} />,
              label: "User-First Engineering",
            },
            {
              icon: <FaProjectDiagram size={18} />,
              label: "Scalable Architecture",
            },
            { icon: <FaLightbulb size={18} />, label: "Constant Learning" },
          ].map((item, i) => (
            <div
              key={i}
              //   className="dot relative w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] rounded-full bg-white/90 text-zinc-800 flex items-center justify-center transition-transform hover:scale-110"
              className="dot relative w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] rounded-full bg-white/90 text-zinc-800 flex items-center justify-center transition-all duration-300 hover:scale-150 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-pink-500 hover:to-red-500 hover:text-white"
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
              <span className="dot-fill absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-150 ease-out rounded-full" />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-20 pt-0 md:p-8 items-center justify-center">
          <div
            id="value-title"
            className="w-full md:w-1/2 mb-8 md:mb-0 sticky self-start font-funnel"
          >
            <h2 className="text-4xl pb-4">
              What’s {/* STATIC */}
              {/* <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                important
              </span>{" "} */}
              <span
                className="rainbow-text font-semibold"
                id="rainbow-important"
              >
                important
              </span>{" "}
              <span className="font-instrument tracking-wider italic">
                to me?
              </span>
            </h2>
            <p className="hidden md:block">
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
              <h3 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Team Culture
              </h3>
              <p className="text-zinc-300">
                I thrive on clear communication and cross-functional
                collaboration. Working closely with designers, product teams,
                and stakeholders ensures that everyone’s aligned on what we’re
                building and why, so the final product reflects a shared vision.
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-start value-item opacity-0 translate-y-20">
              <p className="text-lg mb-2">02</p>
              <h3 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
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
              <h3 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
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
              <h3 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
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
        id="projects"
        className="w-full h-full min-h-screen relative bg-black text-white flex flex-col items-center justify-center px-8 py-16 space-y-6 border-b-[1px] border-white/10"
      >
        <SectionTitle className="project-item" title="Projects" />
        <h2 className="project-item text-4xl md:text-5xl mb-6 text-center">
          My Latest{" "}
          <span className="font-instrument italic tracking-wider text-zinc-400">
            Projects
          </span>
        </h2>

        <ProjectsBentoBox
          className="project-item project-bento"
          key="layout-3"
        />

        <GeneralButton className="see-more block" text="Swipe Left" />

        <div
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-1/2 h-72 bg-gradient-radial from-white/20 to-transparent blur-2xl rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />
      </div>

      <div
        ref={skillsExperienceRef}
        id="skillsExperience"
        className="w-full h-full min-h-screen relative bg-black text-white flex flex-col items-center justify-center px-8 py-16 space-y-6 border-b-[1px] border-white/10"
      >
        <SectionTitle
          className="experience-item max-w-5xl"
          title="Skills & Exprience"
        />
        <h2
          ref={titaniumRef}
          className="text-5xl text-fadedwhite-200 neon-text max-w-5xl"
        >
          Experience
        </h2>

        <div
          id="skills"
          className="flex max-w-5xl justify-center flex-row flex-wrap gap-4 w-full h-full rounded-xl bg-white/5 backdrop-blur-md overflow-visible p-8"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="font-funnel text-sm px-5 py-2 rounded-sm text-white/80 bg-black"
            >
              {skill}
            </div>
          ))}
        </div>

        <div
          id="experience"
          className="w-full max-w-5xl mt-12 mx-auto space-y-10"
        >
          {experience.map((company, idx) => (
            <div
              key={idx}
              className="w-full rounded-2xl bg-white/5 backdrop-blur-md p-8 shadow-xl border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold text-white tracking-tight">
                  {company.company}
                </div>
                <div className="text-sm text-white/50">{company.country}</div>
              </div>

              <div className="space-y-4">
                {company.roles.map((role, rIdx) => {
                  const match = role.position.match(/^(.*?)\s*(\(.+\))$/);
                  const mainTitle = match ? match[1] : role.position;
                  const subtlePart = match ? match[2] : "";

                  return (
                    <div
                      key={rIdx}
                      className="grid grid-cols-12 items-center border-t border-white/10 pt-4"
                    >
                      <div className="col-span-6 text-white text-sm font-medium tracking-wide">
                        {mainTitle}
                        {subtlePart && (
                          <span className="text-white/40 italic pl-1">
                            {subtlePart}
                          </span>
                        )}
                      </div>
                      <div className="col-span-6 text-right text-white/60 text-sm">
                        {role.period}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          id="education"
          className="w-full max-w-5xl mx-auto mt-20 space-y-6 px-4 md:px-0 flex flex-col items-center"
        >
          <h2 className="text-5xl font-semibold bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Education
          </h2>

          {education.map((edu, idx) => (
            <div
              key={idx}
              className="relative w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <div className="text-white text-lg font-semibold tracking-tight">
                    {edu.degree}
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    {edu.institution}
                    {edu.note && (
                      <span className="text-white/40 italic pl-1">
                        ({edu.note})
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-white/50 text-sm mt-4 sm:mt-0 sm:text-right">
                  {edu.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        <GeneralButton
          className="resume block"
          text="Download CV"
          link="/cv/Aulia_Amirullah_Zulkarneidi_CV.pdf"
          download
        />

        <div
          className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-1/2 h-72 bg-gradient-radial from-white/20 to-transparent blur-2xl rounded-full pointer-events-none z-0"
          aria-hidden="true"
        />
      </div>

      <div
        id="contactme"
        className="w-full font-funnel relative bg-zinc-800 text-white flex flex-col items-center justify-center px-8 py-16 space-y-6"
      >
        <SectionTitle className="experience-item" title="Reach out anytime" />
        <h2 className="text-4xl">
          Let’s Stay{" "}
          <span className="font-instrument italic tracking-wider text-zinc-400">
            Connected
          </span>
        </h2>
        <p className="text-white/80 text-sm max-w-md text-center">
          Got questions or want to collaborate? Feel free to reach out - I’m
          open to new projects or just a casual chat!
        </p>

        <GeneralButton
          className="contactme-contact-button block"
          text="Contact Me"
          link={sayHelloLink}
        />

        <SocialMedia />
        <p className="text-white/80 text-sm max-w-md text-center">
          auliaamir153@gmail.com
        </p>
      </div>

      <GeneralFooter className="bg-zinc-800" />
    </div>
  );
}
