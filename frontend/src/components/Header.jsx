import React from "react";

export default function Header() {
  return (
    <header className="w-full pb-5 mb-10 flex flex-col md:flex-row sm:items-left lg:items-center justify-between gap-4 border-b border-gray-100/10 text-white font-[Montserrat]">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2">
        <img
          src="/CodelensLogo.png"
          alt="Codelens logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-3xl font-black font-[Montserrat]">CodeLens</h1>
      </div>

      {/* Center: Tagline */}
      <div className="text-left">
        <p className="text-sm lg:text-md font-medium text-stone-200">
         Your AI-Powered Python Investigator 🕵️‍♂️ 🐍
        </p>
      </div>

      {/* Right: GitHub Link */}
      <div>
        <a
          href="https://github.com/raghiiboiibaxtor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm lg:text-md font-light lg:font-medium"
        >
          <span className="hover:underline">Built by: Raghiiboii Baxtor</span>
        </a>
      </div>
    </header>
  );
}
