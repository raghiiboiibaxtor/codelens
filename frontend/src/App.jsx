// src/App.jsx
import GeminiRunner from "./components/GeminiRunner.jsx";

export default function App() {
  return (
    <main className="min-h-screen bg-[#111] text-zinc-100 p-6 flex flex-col items-center">
      <h1 className="mb-6 text-5xl font-semibold text-center text-[#85FF58]">
        CodeLens
      </h1>
      <p className="text-zinc-400 mb-8 text-center max-w-xl">
        Paste your Python code below and let Gemini find bugs, fix them, and give you a tip.
      </p>

      <div className="w-full max-w-5xl">
        <GeminiRunner />
      </div>
    </main>
  );
}
