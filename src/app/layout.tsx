import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorWrapper from "@/components/CursorWrapper";
import Logo from "@/assets/images/logo.svg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aulia Zulkarneidi | Portfolio",
  description:
    "Aulia Zulkarneidi - A developer who builds fast, clean, and responsive user interfaces that solve real business problems. I care about getting things shipped, looking great, and solving the right problems.",
  icons: {
    icon: Logo.src,
  },
  openGraph: {
    title: "Aulia Zulkarneidi | Portfolio",
    description:
      "Aulia Zulkarneidi - A developer who builds fast, clean, and responsive user interfaces that solve real business problems. I care about getting things shipped, looking great, and solving the right problems.",
    url: "https://auliaz.com",
    siteName: "Aulia Zulkarneidi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Aulia Zulkarneidi | Portfolio",
    description:
      "Aulia Zulkarneidi - A developer who builds fast, clean, and responsive user interfaces that solve real business problems. I care about getting things shipped, looking great, and solving the right problems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorWrapper>{children}</CursorWrapper>
        {/* {children} */}
      </body>
    </html>
  );
}
