import React from "react";

function GeneralButton({
  text,
  className,
  link,
}: {
  text: string;
  className?: string;
  link?: string;
}) {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`contact-button relative group px-8 py-4 text-white font-semibold rounded-full bg-black/40 backdrop-blur-md border border-white/30 overflow-visible 
      before:absolute before:inset-0 before:rounded-full before:border before:border-white/40 before:shadow-inner
      transition duration-300 ease-in-out hover:scale-105 hover:bg-black/70 hover:border-white hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3 ${className}`}
    >
      <span className="shiny-text">{text}</span>
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

export default GeneralButton;
