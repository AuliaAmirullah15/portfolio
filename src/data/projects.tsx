import {
  customisationImg,
  hiwImg,
  menuPageImg,
  nutritionImg,
  orderNumberImg,
  photoBehindTheSceneImg,
  photoFoodImg,
  photoKiosk2Img,
  photoKioskImg,
  photoOrderFoodImg,
  welcomeScreenImg,
} from "@/utils";
import { StaticImageData } from "next/image";

export type DevelopmentImages = {
  id: number;
  link: string;
};

export type Projects = {
  id: number;
  title: {
    normal: string;
    highlight: string;
    description: string;
  };
  overview: string;
  company: string;
  techStacks: string[];
  images: StaticImageData[];
  development?: {
    description: string;
    images: StaticImageData[];
  };
  outcome?: string;
};

export const projects: Projects[] = [
  {
    id: 1,
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
    images: [
      welcomeScreenImg,
      menuPageImg,
      customisationImg,
      nutritionImg,
      hiwImg,
      orderNumberImg,
    ],
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
];
