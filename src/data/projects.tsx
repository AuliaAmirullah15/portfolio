import {
  allergenNutritionImg,
  appleAdsImg,
  appleChipImg,
  appleHeroImg,
  appleIntelligenceImg,
  appleModelImg,
  appleVideoImg,
  backendImg,
  bannerImg,
  cartImg,
  catalogueImg,
  catalogueProductImg,
  checkoutImg,
  clickCollectImg,
  consultationImg,
  customisationImg,
  deliveryDetailsImg,
  desktopLoginImg,
  exclusiveImg,
  filterSortImg,
  forgotYourPasswordImg,
  goodsReceiveResultsImg,
  hiwImg,
  homeImg,
  instagramImg,
  inventoryImg,
  loginImg,
  mailingListImg,
  menuImg,
  menuPageImg,
  mobileCollectionImg,
  mobileNavigationImg,
  newsImg,
  nutritionImg,
  orderNumberImg,
  photoBehindTheSceneImg,
  photoFoodImg,
  photoKiosk2Img,
  photoKioskImg,
  photoOrderFoodImg,
  pickingDashboardImg,
  pickingDetailsImg,
  shoppingBagImg,
  spaBannerImg,
  spaMailingListImg,
  spaWebBannerImg,
  swiperImg,
  tooltipImg,
  transferImg,
  webConsultationImg,
  webExclusiveImg,
  webFilterSortImg,
  webInstagramImg,
  webMailingListImg,
  webMenuImg,
  webProductImg,
  welcomeScreenImg,
} from "@/utils";
import { StaticImageData } from "next/image";

export type DevelopmentImages = {
  id: number;
  link: string;
};

export type Projects = {
  id: string;
  title: {
    normal: string;
    highlight: string;
    description: string;
  };
  overview: string;
  company: string;
  techStacks: string[];
  link?: string;
  images: {
    width: number;
    height: number;
    children: StaticImageData[];
  };
  development?: {
    description: string;
    images: StaticImageData[];
  };
  outcome?: string;
};

export const projects: Projects[] = [
  {
    id: "greggs-kiosk",
    title: {
      normal: "Greggs",
      highlight: "Kiosk",
      description:
        "The Greggs Kiosk is a modern, customer-facing digital solution developed by the in-house Kiosk team at Greggs that runs on Linux. Designed to enhance the in-shop experience, the kiosk allows customers to browse the full menu, explore current offers, and take advantage of exclusive deals with ease and convenience.",
    },
    overview:
      "I joined the Kiosk team as one of the first developers on a flagship project within the Greggs 2025 roadmap, helping to shape the early prototype that laid the foundation for key customer-facing features. I, later on, led the development of a reusable order-sharing, Google Analytics and loyalty packages with OnePub, now adopted by other teams including POS and drive-through, along with a shared models library that ensures consistency across tills and backend systems.",
    company: "Greggs PLC",
    techStacks: [
      "Flutter",
      "Dart",
      ".NET",
      "Cocoapod",
      "Linux",
      "SSH",
      "Azure DevOps",
      "Wiremock",
      "Dio",
      "Docker",
      "Container",
      "Orchestration",
      "Postman",
    ],
    images: {
      width: 300,
      height: 550,
      children: [
        welcomeScreenImg,
        menuPageImg,
        customisationImg,
        nutritionImg,
        hiwImg,
        orderNumberImg,
      ],
    },
    development: {
      description:
        "Researched UK competitors and in-store experiences to design the initial Greggs Kiosk prototype, forming the basis for user testing and future UI/UX improvements. I led early design work on the Meal Deal builder and upselling flow, and contributed across both frontend and backend, developing core packages for loyalty and order sharing with a focus on performance, reusability, and maintainability. I also introduced local wiremocking of allergen data via NGINX, and used tools like Postman to support efficient testing and collaboration among Frontend developers.",
      images: [
        photoKioskImg,
        photoOrderFoodImg,
        photoFoodImg,
        photoBehindTheSceneImg,
        photoKiosk2Img,
      ],
    },
    outcome:
      "By collaborating closely with cross-functional teams, including Retail, Finance, Brand, Master Data Management, and other product and engineering teams, we successfully launched the Greggs Kiosk into live stores, reaching three locations within the first week, each equipped with 2–6 kiosks. The rollout is progressing steadily, with continuous improvements based on real-time feedback from customers, shop staff, and stakeholders. Despite a tight development timeline, the product has been widely praised for its quality, stability, and overall user experience. My contributions to both the foundational architecture and later feature development, particularly in areas such as order sharing, meal deals, customisation, add to cart, basket, and upselling, played a key role in what many consider a standout achievement and a blueprint for future platform expansion.",
  },
  {
    id: "greggs-website",
    title: {
      normal: "Greggs",
      highlight: "Website",
      description:
        "The Greggs Website is a customer-focused digital platform developed by the in-house Digital team at Greggs to extend the brand experience beyond the shop. It offers a wide range of services including Click & Collect ordering, digital gift card purchases, menu exploration, promotional offers, nutritional and allergen information, a store locator, subscription sign-ups for product news and offers, job applications via the careers portal, and access to corporate and investor information. The website also integrates with third-party delivery services and is optimised for both desktop and mobile use, serving as a key digital touchpoint for engaging customers and supporting the wider Greggs ecosystem.",
    },
    overview:
      "As a full-stack developer in the Web team, I led the implementation of secure mobile number change functionality in .NET, including policy-driven validation and security enhancements, while also integrating Zendesk to streamline customer support. I improved the overall user experience across key areas, such as enhancing the News page with intelligent pagination and return-to-article functionality, refining the digital gift card journey with clearer tooltips and visuals, and resolving critical browser-specific issues like video playback in Firefox. Additionally, I supported internal initiatives by building a dynamic Greggs Foundation form using Microsoft Power Automate, and contributed to accessibility, performance, and design consistency across the wider digital platform.",
    company: "Greggs PLC",
    techStacks: [
      "VueJS",
      "Nuxt",
      "Typescript",
      ".NET",
      "Tailwind",
      "Cypress",
      "Azure DevOps",
      "Pinia",
      "Typescript",
      "Storyblok",
      "Vitest",
      "Storybook",
      "CMS",
      "Axios",
      "Power Automate",
    ],
    link: "https://www.greggs.com/",
    images: {
      width: 350,
      height: 500,
      children: [
        bannerImg,
        allergenNutritionImg,
        clickCollectImg,
        forgotYourPasswordImg,
        newsImg,
        tooltipImg,
      ],
    },
    outcome:
      "Delivered several impactful website enhancements that improved customer experience, accessibility, and support response times. The secure account change and Zendesk integration increased customer trust and operational efficiency, while UI/UX refinements boosted engagement across high-traffic sections. My contributions to frontend consistency and platform resilience helped strengthen the website as a core digital touchpoint for the Greggs brand.",
  },
  {
    id: "activate-erp",
    title: {
      normal: "Activate",
      highlight: "ERP",
      description:
        "Activate ERP is a mobile-first enterprise resource planning system tailored for modern retail and distribution workflows. It streamlines complex operational processes such as goods receiving, stocktaking, inventory tracking, internal transfers, order assembly, logistics, picking, collections, and sales orders, all within a unified, cross-platform application.",
    },
    overview:
      "As the primary frontend developer, I architected and developed Activate ERP from the ground up using Vue.js and Quasar, delivering both mobile and web applications with a single codebase. I worked closely with a full-time backend developer, designer, and product stakeholders, while occasionally collaborating with another frontend developer who focused on separate initiatives. I led the mobile app implementation, handling advanced features like biometric authentication, camera access, geolocation, and secure storage of keys. Using tools like Postman, Android Studio, Xcode, and cross-platform testing in simulators, I ensured smooth deployment and consistent UX on both Android and iOS platforms. The app was built with a strong emphasis on maintainability, security, and responsiveness.",
    company: "Vi8e Interactive Pte Ltd",
    techStacks: [
      "VueJS",
      "Quasar",
      "Cordova",
      "SCSS",
      "SASS",
      "Capacitor",
      "Android Studio",
      "Xcode",
      "Axios",
      "Vuex",
      "Postman",
    ],
    link: "https://apps.apple.com/sg/app/activate-erp/id1601575070",
    images: {
      width: 300,
      height: 600,
      children: [
        loginImg,
        goodsReceiveResultsImg,
        pickingDashboardImg,
        menuImg,
        deliveryDetailsImg,
        pickingDetailsImg,
      ],
    },
    development: {
      description:
        "From inception, I led the frontend architecture and development across both mobile and web, leveraging Quasar and Vue.js to maintain a unified codebase. I implemented biometric login (Face ID/Touch ID), camera-based profile updates, and GPS-based attendance tracking. Collaborating with backend engineers and designers, I integrated secure APIs and real-time data syncing, and ensured compliance with platform-specific guidelines for iOS and Android. I managed builds via Xcode and Android Studio, refined mobile responsiveness, and rigorously tested in simulators and real devices. Security was a key priority, with encrypted key handling and secure storage embedded throughout the application.",
      images: [backendImg, inventoryImg, desktopLoginImg, transferImg],
    },
    outcome:
      "Successfully launched across the Apple App Store and Google Play Store, Activate ERP has become a reliable tool for fitness businesses managing day-to-day operations and customer engagement. My technical contributions ensured a performant, secure, and scalable frontend experience. The project is praised for its clean UI, smooth functionality, and the ability to bridge web and mobile ecosystems with a single development approach.",
  },
  {
    id: "katie-jayne",
    title: {
      normal: "Katie",
      highlight: "Jayne",
      description:
        "Katie Jayne is a modern e-commerce site focused on premium glassware, built as a personal project to explore React, Next.js, and scalable frontend architecture. It demonstrates responsive, mobile-first design and integrates key commerce flows like shopping cart, checkout, and product browsing.",
    },
    overview:
      "Katie Jayne represents my first commercial-level personal project using React and Next.js. I used it as a sandbox to quickly learn and apply advanced concepts in frontend development, focusing heavily on responsive design, user experience, and scalable component architecture. The project features key e-commerce flows such as product catalogues, cart, checkout, and a mailing list powered by Mailchimp. It’s a reflection of my adaptability, quick learning, and frontend problem-solving capabilities.",
    company: "Katie Jayne",
    techStacks: [
      "React",
      "NextJS",
      "Typescript",
      "Tailwind",
      "Redux",
      "Playwright",
      "Tailwind",
    ],
    link: "https://katie-jayne.vercel.app/",
    images: {
      width: 340,
      height: 500,
      children: [
        homeImg,
        catalogueImg,
        catalogueProductImg,
        mobileNavigationImg,
        mobileCollectionImg,
        filterSortImg,
        cartImg,
        checkoutImg,
        mailingListImg,
        shoppingBagImg,
      ],
    },
    development: {
      description:
        "Built from scratch using React and Next.js, I focused on mastering reusable component structures, local and global state management via Redux Toolkit, and responsive Tailwind styling. The app features local storage persistence, dynamic routing, and integration with Mailchimp for mailing list sign-up. I also applied advanced React practices like custom hooks, slice-based state management, and Playwright for end-to-end testing. The codebase was structured with scalability and real-world maintainability in mind, practicing clean architecture and modular logic separation.",
      images: [webMenuImg, webMailingListImg, webFilterSortImg, webProductImg],
    },
    outcome:
      "Katie Jayne was a key milestone in transitioning from learning to applying React in a real-world scenario. It’s helped refine my skills in building production-grade user interfaces and applying Typescript and Redux in a scalable way. The site serves as proof of my ability to learn and adapt quickly, with strong focus on responsive UI/UX, code maintainability, and user-centered commerce workflows. It has been deployed via Vercel and serves as a portfolio showcase for frontend craftsmanship.",
  },
  {
    id: "beauty-and-spa",
    title: {
      normal: "Beauty",
      highlight: "& Spa",
      description:
        "A visually appealing landing page for a Singapore-based beauty and wellness clinic. Designed to attract and convert users through clean UI, smooth animations, and mobile-first responsive layouts, it promotes consultation services and beauty products with a modern digital brand presence.",
    },
    overview:
      "This project was developed for a local Singaporean beauty clinic aiming to establish an elegant and user-friendly online presence. It serves as a marketing landing page. Built with HTML, CSS, and JavaScript (with jQuery), the site includes interactive elements such as image sliders and smooth scroll navigation. The focus was to deliver a high-converting interface with a modern aesthetic and excellent performance across devices.",
    company: "Vi8e Interactive Pte Ltd",
    techStacks: ["Vanilla JavaScript", "HTML", "CSS", "jQuery"],
    link: "https://aha-beauty-products.netlify.app/",
    images: {
      width: 340,
      height: 500,
      children: [
        spaBannerImg,
        exclusiveImg,
        swiperImg,
        consultationImg,
        instagramImg,
        spaMailingListImg,
      ],
    },
    development: {
      description:
        "I led the frontend development, crafting a responsive and elegant design tailored for mobile-first users. Using jQuery and vanilla JavaScript, I implemented smooth animations, a featured swiper section, and collapsible navigation menus. Focus was placed on creating a luxurious brand feel through the use of refined color palettes, modern fonts, and high-resolution imagery. Though built without a JS framework, the site follows clean separation of concerns and progressive enhancement best practices.",
      images: [
        spaWebBannerImg,
        webExclusiveImg,
        webConsultationImg,
        webInstagramImg,
      ],
    },
    outcome:
      "Successfully delivered a fast, stylish, and functional landing page that aligns with the client's branding goals. The site is fully responsive and optimized for mobile conversions, helping to establish a professional online identity for the beauty clinic. It has received positive feedback for its visual appeal and ease of use, contributing to increased client interest and consultation bookings.",
  },
  {
    id: "iphone-clone",
    title: {
      normal: "iPhone",
      highlight: "Clone",
      description:
        "An interactive, animated clone of Apple’s iPhone landing page, built to study and replicate high-end web design and advanced animation techniques using modern frontend tools like Three.js and GSAP.",
    },
    overview:
      "This project was a self-initiated learning exercise aimed at replicating the sleek, interactive feel of Apple’s iPhone product page. Built using React, Next.js, and Typescript, the site features real-time 3D model rendering with Three.js and fluid scroll-based animations using GSAP. The focus was to understand how large-scale tech brands approach storytelling through UI/UX and animation. From device rotations to layered text reveals and video embeds, every section was designed to mimic the polish and responsiveness of Apple's own site.",
    company: "Apple Inc",
    techStacks: [
      "React",
      "NextJS",
      "Typescript",
      "Three.js",
      "GSAP",
      "3D Model",
      "Web Animation",
    ],
    link: "https://apple16-clone.vercel.app/",
    images: {
      width: 340,
      height: 500,
      children: [
        appleHeroImg,
        appleVideoImg,
        appleModelImg,
        appleAdsImg,
        appleIntelligenceImg,
        appleChipImg,
      ],
    },
    outcome:
      "The project provided hands-on experience in complex scroll-linked animation, 3D model integration, and storytelling-driven design. It sharpened my understanding of advanced web performance techniques and helped me rapidly improve my ability to break down high-fidelity commercial designs into reproducible, component-based architectures. It stands as a personal benchmark in my progression as a frontend developer.",
  },
];
