import React, { forwardRef } from "react";

const CodeBlock = forwardRef(function CodeBlock(
  {
    kind = "input",          // "input" | "output"
    label = "Code",
    placeholder = "",
    value = "",              // used for output
    defaultValue = "",       // used for input (uncontrolled)
    actions = null,          // optional buttons/UI, no logic here
    className = "",
  },
  ref
) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex gap-2">{actions}</div>
      </div>

      {kind === "input" ? (
        <textarea
          ref={ref}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="min-h-[300px] w-full rounded-md border-[0.75px] border-zinc-800
                     bg-[#1E1E1E] text-zinc-100 placeholder-zinc-500
                     p-3 font-mono text-sm outline-none focus:ring-1 focus:ring-[#85FF58]/20"
        />
      ) : (
        <pre className="min-h-[300px] w-full overflow-auto rounded-md border border-zinc-800 bg-zinc-900 p-3">
          <code className="font-mono text-sm text-zinc-100 whitespace-pre-wrap">
            {value || placeholder}
          </code>
        </pre>
      )}
    </div>
  );
});

export default CodeBlock;
