import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "CV", link: "/cv/Aulia_Zulkarneidi_CV.pdf", download: true },
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-50 flex items-center justify-between px-10 py-4 bg-transparent">
        <div className="text-white font-geist uppercase font-bold text-2xl tracking-widest hover:cursor-pointer">
          AZ
        </div>

        {/* Desktop Nav */}
        <nav className="mx-auto hidden md:block font-funnel">
          <ul className="flex space-x-12 px-12 py-4 text-white text-md rounded-full tracking-wide shadow-md pulsing-gradient-border bg-white bg-opacity-10 backdrop-blur-md">
            {menuItems.map(({ name, link }) => (
              <li
                key={name}
                className={`hover:cursor-pointer ${
                  name === "CV"
                    ? "relative flex items-center space-x-2 hover:text-gray-300"
                    : ""
                }`}
              >
                <a
                  href={link}
                  target={name === "CV" ? "_blank" : undefined}
                  rel={name === "CV" ? "noopener noreferrer" : undefined}
                  download={name === "CV" ? true : undefined}
                  className="hover:text-gray-300 transition"
                >
                  {name}
                </a>
                {name === "CV" && (
                  <span
                    className="flex justify-center items-center w-6 h-6 rounded-full bg-black bg-opacity-40"
                    style={{ transform: "rotate(45deg)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      className="w-3 h-3"
                    >
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Toggle */}
        <div
          onClick={toggleDrawer}
          className="md:hidden flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer relative z-[60]"
        >
          <motion.div
            key={drawerOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {drawerOpen ? (
              // Close Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-black rounded"></span>
                <span className="block w-6 h-0.5 bg-black rounded"></span>
                <span className="block w-6 h-0.5 bg-black rounded"></span>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="mobile-drawer"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  when: "beforeChildren",
                  staggerChildren: 0.1,
                },
              },
              exit: {
                opacity: 0,
                y: -20,
                transition: {
                  duration: 0.3,
                  when: "afterChildren",
                  staggerChildren: 0.15,
                  staggerDirection: -1,
                },
              },
            }}
            className="md:hidden h-full fixed top-0 left-0 w-full bg-black text-white z-40 py-24 px-10 flex flex-col space-y-4 font-semibold uppercase shadow-md"
          >
            {menuItems.map(({ name, link }) => (
              <motion.a
                key={name}
                href={link}
                onClick={toggleDrawer}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                }}
                transition={{ duration: 0.3 }}
                className="hover:text-gray-400 flex items-center space-x-2"
              >
                <span>{name}</span>
                {name === "CV" && (
                  <span
                    className="flex justify-center items-center w-6 h-6 rounded-full bg-white bg-opacity-20"
                    style={{ transform: "rotate(45deg)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      className="w-3 h-3"
                    >
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </span>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
