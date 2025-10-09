import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 bg-inherit w-full py-5 mb-10 flex flex-col md:flex-row sm:items-left lg:items-center justify-between gap-4 border-b border-gray-100/10 text-stone-400 font-[Montserrat]">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2">
        <img
          src="/CodelensLogo.png"
          alt="Codelens logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-3xl font-black font-[Montserrat] text-[#EBEBEB]">CodeLens</h1>
      </div>

      {/* Center: Tagline */}
      <div className="text-left">
        <p className="text-sm lg:text-md font-medium text-stone-400">
         Your AI-Powered Python Investigator 🕵️‍♂️ 🐍
        </p>
      </div>

      {/* Right: GitHub Link */}
      <div class="space-x-8">
         <a
          href="https://github.com/raghiiboiibaxtor/codelens"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm lg:text-sm font-light lg:font-medium"
        >
          <span className="underline hover:italic">GitHub</span>
        </a>
           <a
          href="https://rbxtr.web.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm lg:text-sm font-light lg:font-medium "
        > 
          <span className="underline hover:italic ml-2 text-[#EBEBEB] font-bold">@Raghiiboii Baxtor</span>
        </a>
      </div>
    </header>
  );
}
