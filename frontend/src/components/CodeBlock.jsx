import { useState } from "react";
// Allows the state to be changed. 

// Linking python fastAPI & port
const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Declaring CodeIO (input/output) function & targeting useState variables to allow UI change
export default function CodeBlock() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");


  async function onInvestigate() {
    setErr(""); setLoading(true);
    try {
      const res = await fetch(`${API}/investigate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      // Show structured JSON as "code-like" output for now
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    setInput("");
    setOutput("");
    setErr("");
  }

  // allow Tab in textarea
  function handleKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const next = input.slice(0, selectionStart) + "  " + input.slice(selectionEnd);
      setInput(next);
      // move caret
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
      });
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Input code</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste code here…"
          className="min-h-[300px] w-full rounded-md border p-3 font-mono text-sm outline-none focus:ring-2"
        />
        <div className="flex gap-2">
          <button
            onClick={onInvestigate}
            disabled={!input || loading}
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Investigate (Gemini)"}
          </button>
          <button onClick={onClear} className="rounded-md border px-4 py-2">
            Clear
          </button>
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </div>

      {/* Output */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Output</label>
        <pre className="min-h-[500px] w-full overflow-auto rounded-md border p-3 ">
          <code className="font-mono text-sm whitespace-pre-wrap">{output}</code>
        </pre>
        <p className="text-xs ">
          Output shows JSON for now (from <code>/investigate</code>). We’ll switch to rewritten code when we add <code>/rewrite</code>.
        </p>
      </div>
    </div>
  );
}
