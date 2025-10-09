import React from "react";
import { Highlight } from "prism-react-renderer";
import { codelensFaded } from "../themes/codelensFadedTheme";

export default function InputCodeBlock({
  title,
  language = "python",
  code = "",
}) {
  if (!code) return null;

  return (
    <div className="flex flex-col gap-2 min-w-2xl max-w-4xl min-h-[500px] max-h-full">
      {title && (
        <label className="text-sm font-medium text-stone-400">
          <span className="font-bold text-stone-200">Step 3:</span> Review the code below ✨
        </label>
      )}

      <div className="relative rounded-md  bg-[#1D262F] overflow-hidden shadow-lg">
        <div className="flex justify-between items-center bg-[#2B2A2A] px-3 py-2 text-xs font-regular text-stone-400 border-b border-stone-800">
         <div>Codelens x Gemini</div>
          <span className="uppercase text-stone-400">{language}</span>
        </div>

        {/* 👇 Correct prop is theme={...} */}
        <Highlight code={code.trim()} language={language} theme={codelensFaded}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
         <pre
            className={`
                ${className}
                text-sm font-mono 
                p-6 leading-relaxed tracking-wide
                overflow-x-auto
                rounded-md
            `}
            style={{
                ...style,
                background: "linear-gradient(145deg, #181C1A 0%, #1B1E1C 100%)",
                lineHeight: "1.7",
                letterSpacing: "0.02em",
            }}
         >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
