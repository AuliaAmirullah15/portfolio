import React from "react";

const ScrollDownArrow = ({
  className,
  remainingPage,
}: {
  className?: string;
  remainingPage?: string;
}) => {
  return (
    <div
      className={`flex flex-col h-full min-h-12 items-center hover:cursor-pointer ${className}`}
    >
      {remainingPage && (
        <span className="block mb-1 text-sm font-geist uppercase tracking-wide text-white">
          {remainingPage}
        </span>
      )}
      <button
        className="animate-bounce text-white hover:text-gray-300"
        aria-label="Scroll Down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollDownArrow;
