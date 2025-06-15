import React from "react";

const GeneralFooter = ({ className }: { className?: string }) => {
  return (
    <div
      id="footer"
      className={`w-full relative font-funnel text-white flex flex-row items-center justify-between px-16 py-16 ${className}`}
    >
      <div className="flex flex-row items-center justify-center">
        <p className="text-white/80 text-md text-center">
          Aulia Zulkarneidi &copy; 2025{" "}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center">
        <p className="text-white/80 text-md text-center">
          Made with React (NextJS){" "}
        </p>
      </div>
    </div>
  );
};

export default GeneralFooter;
