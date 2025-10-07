import { useRef, useState } from "react";
import CodeBlock from "./components/codeblock.jsx";
import Button from "./components/button.jsx";


const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function App() {
  const inputRef = useRef(null);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function investigate() {
    setErr(""); setLoading(true);
    const code = (inputRef.current?.value || "").trim();
    if (!code) { setErr("Paste some code first"); setLoading(false); return; }

    try {
      const r = await fetch(`${API}/investigate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      if (!r.ok) throw new Error(`API ${r.status}`);
      const data = await r.json();
      // show the investigation block if present, else full payload
      setOut(JSON.stringify(data.investigation ?? data, null, 2));
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    if (inputRef.current) inputRef.current.value = "";
    setOut(""); setErr("");
  }

  return (
    <main className="min-h-screen p-4 max-w-6xl mx-auto">
      <h1 className="mb-4 text-5xl font-semibold">CodeLens</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <CodeBlock
          kind="input"
          label="Input code"
          placeholder="Paste code here…"
          ref={inputRef}
          actions={
            <>
              <Button onClick={investigate} loading={loading} size="lg" text="Investigate">
              </Button>
              <Button variant="outline" onClick={clearAll} text="Clear"></Button>
            </>
          }
        />
        <CodeBlock
          kind="output"
          label="Output"
          value={out}
          placeholder="// Results will appear here"
          actions={err ? <span className="text-red-400 text-sm">{err}</span> : null}
        />
      </div>
    </main>
  );
}
