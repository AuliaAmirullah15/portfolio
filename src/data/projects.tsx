import {
  allergenNutritionImg,
  bannerImg,
  clickCollectImg,
  customisationImg,
  forgotYourPasswordImg,
  hiwImg,
  menuPageImg,
  newsImg,
  nutritionImg,
  orderNumberImg,
  photoBehindTheSceneImg,
  photoFoodImg,
  photoKiosk2Img,
  photoKioskImg,
  photoOrderFoodImg,
  tooltipImg,
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
      "Wiremock",
      "Dio",
      "Docker",
      "Container",
      "Orchestration",
      "Postman",
    ],
    images: {
      width: 280,
      height: 500,
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
      "Pinia",
      "Typescript",
      "Storyblok",
      "Vitest",
      "Storybook",
      "CMS",
      "Axios",
    ],
    link: "https://www.greggs.com/",
    images: {
      width: 280,
      height: 400,
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
    id: "activate",
    title: {
      normal: "Activate",
      highlight: "ERP",
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
      "Pinia",
      "Typescript",
      "Storyblok",
      "Vitest",
      "Storybook",
      "CMS",
      "Axios",
    ],
    link: "https://www.greggs.com/",
    images: {
      width: 280,
      height: 400,
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
];
