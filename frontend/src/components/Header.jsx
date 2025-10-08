import React from "react";


export default function Header() {
  return (
    <header className="w-full pb-5 mb-10 flex flex-row items-center justify-between  border-b border-gray-100/10 text-white font-[Montserrat]">
    
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-black ">CodeLens</h1>
          <img
            src="/CodelensLogo.png"
            alt="Codelens logo"
            className="h-8 w-8 object-contain"
        />
      </div>

     
      <div className="flex-1 text-center">
        <p className="text-md font-light text-stone-200">
        Meet your new AI powered Python Investigator 🕵️‍♂️ 🐍
        </p>
      </div>


      <div>
        <a
          href="https://github.com/raghiiboiibaxtor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-black "
        >
        <span className="underline">@rbxtr</span>
        </a>
      </div>
    </header>
  );
}
