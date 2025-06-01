"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Beginning from "@/components/Beginning";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <>
      <div className="bg-black w-full min-h-screen relative">
        <Header />
        <motion.div>
          <Beginning />
        </motion.div>
      </div>
    </>
  );
}
