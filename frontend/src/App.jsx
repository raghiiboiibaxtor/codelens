// src/App.jsx
import GeminiRunner from "./components/GeminiRunner.jsx";
import Header from "./components/Header.jsx";

const API_URL = import.meta.env.DEV
  ? "http://127.0.0.1:8000"  // local backend when running `npm run dev`
  : import.meta.env.VITE_API_URL; // live backend when deployed

async function checkBackend() { // Health check, Debugging purposes
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    console.log("✅ Backend connected:", data);
  } catch (err) {
    console.error("❌ Backend not reachable:", err);
  }
}

checkBackend();

export default function App() {
  return (
    <main className="min-h-screen top-0 bg-[#181818] text-zinc-100 pt-0 pb-6 px-6 flex flex-col items-center">
      <Header/>
      <p className="text-zinc-400 mb-8 text-center max-w-xl">
        Paste your Python code below and let Gemini find bugs, fix them, and give you a tip.
      </p>

      <div className="w-full max-w-5xl">
        <GeminiRunner />
      </div>
    </main>
  );
}
