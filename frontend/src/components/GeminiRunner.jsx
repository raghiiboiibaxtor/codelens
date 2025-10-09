// src/components/GeminiRunner.jsx
import { useState } from "react";

export default function GeminiRunner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.DEV
  ? "http://127.0.0.1:8000"               // dev access
  : import.meta.env.VITE_API_URL; // live backend on Render 

  async function handleInvestigate() {
    setError("");
    setLoading(true);
    setOutput(null);

    if (!input.trim()) {
      setError("I'm hungry! Paste some python code in the box above 🤤🐍");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Send code to your FastAPI endpoint
      const res = await fetch(`${API}/investigate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: input }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      // 2️⃣ Parse Gemini’s response intelligently
      let parsed;
      try {
        // Case 1: Already structured JSON
        if (data.bug_count !== undefined) {
          parsed = data;
        }
        // Case 2: Wrapped inside "analysis" as string with ```json fences
        else if (typeof data.analysis === "string") {
          const clean = data.analysis
            .replace(/```json|```/g, "")
            .trim();
          parsed = JSON.parse(clean);
        }
        // Case 3: Raw output string
        else if (data.raw_output) {
          parsed = JSON.parse(data.raw_output);
        } else {
          parsed = data;
        }
      } catch {
        parsed = { error: "Ouch, Gemini sucker punched me 🥊🥲 Try again?" };
      }

      // 3️⃣ Update UI
      setOutput(parsed);
    } catch (e) {
      setError(e.message || "Shucks! Something's up.");
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setInput("");
    setOutput(null);
    setError("");
  }

  return (
    <section className="w-full flex flex-col lg:flex-row gap-6 text-stone-200">
      {/* Input box */}
      <div className="flex flex-col gap-2 min-w-2xl max-w-4xl min-h-[500px] max-h-full">
        <label className="text-sm font-medium text-stone-400">
          <span class="font-bold text-stone-200">Step 1:</span> Add your broken Python code 👇❤️‍🩹
        </label>
        <label className="text-sm font-medium text-stone-400">
          <span class="font-bold text-stone-200">Step 2:</span> Click Investigate 🕵️‍♂️🧩
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type code here..."
          className="min-h-[400px] w-full rounded-md border border-zinc-800 bg-[#1E1E1E]
                     text-stone-200 placeholder-zinc-500 p-3 font-mono text-sm
                     outline-none focus:ring-1 focus:ring-[#85FF58]/20"
        />

        <div className="flex gap-2">
          <button
            onClick={handleInvestigate}
            disabled={loading}
            className="px-4 py-2 bg-[#85FF58] text-black rounded font-medium hover:bg-[#9AFF73] transition-colors"
          >
            {loading ? "Investigating…" : "Investigate"}
          </button>

          <button
            onClick={clearAll}
            className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded font-medium hover:bg-zinc-700 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Output Section */}
       <div className="flex flex-col gap-2 min-w-2xl max-w-4xl min-h-[500px] max-h-full">
       <label className="text-sm font-medium text-stone-400">
            <span class="font-bold text-stone-200">Step 3:</span> Grab your dreamy code & go! 🛸💫
        </label>
         <label className="text-sm font-medium text-stone-400">
           --
        </label>
      <div className="  rounded-md border border-zinc-800 bg-[#1E1E1E] p-4 min-h-[500px] max-h-full min-w-2xl max-w-4xl">

        {error && (
          <div className="p-3 rounded-md bg-red-900/40 border border-red-700 text-red-200">
            ⚠️ {error}
          </div>
        )}

        {!error && loading && (
          <p className="text-zinc-500 italic">Chatting to Gemini 💬♊️ </p>
        )}

        {!loading && !error && output && (
          <>
            {output.bug_count !== undefined ? (
              <div className="space-y-3">
                <p className="text-zinc-300">
                <strong>
                    🐛 Found {(output.bugs?.length ?? output.bug_count) || 0} bug{((output.bugs?.length ?? output.bug_count) || 0) !== 1 && "s"}:
                </strong>

                </p>

                {output.bugs && (
                  <ul className="list-disc ml-6 text-zinc-400">
                    {output.bugs.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                {output.corrected_code && (
                  <div className="mt-3">
                    <p className="text-zinc-300 font-medium mb-1">
                      ✅ Corrected Code:
                    </p>
                    <pre className="p-3 rounded-md bg-black/50 border border-zinc-800 text-sm font-mono whitespace-pre-wrap text-zinc-100">
                      {output.corrected_code}
                    </pre>
                  </div>
                )}

                {output.tip && (
                  <p className="text-sm text-zinc-400 mt-3">
                    💡 <strong>Tip:</strong> {output.tip}
                  </p>
                )}
              </div>
            ) : (
              <pre className="text-sm font-mono text-zinc-400 whitespace-pre-wrap">
                {JSON.stringify(output, null, 2)}
              </pre>
            )}
          </>
        )}

        {!loading && !error && !output && (
          <p className="text-zinc-500 italic">Incoming! 🚀💫</p>
        )}
      </div>
      </div>
    </section>
  );
}
