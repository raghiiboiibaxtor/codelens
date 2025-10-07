# python-api/services/Analyser.py
import json, re, time
import google.generativeai as genai

class GeminiAnalyser:
    def __init__(self, api_key: str, model: str = "gemini-1.5-flash"):
        self.model_name = model
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model)

    @staticmethod
    def _force_json(text: str):
        if not text:
            return {}
        s = re.sub(r"^```json\s*|\s*```$", "", text.strip(), flags=re.MULTILINE)
        try:
            return json.loads(s)
        except Exception:
            return {"raw": text}

    def investigate(self, code: str):
        t0 = time.time()
        if not code.strip():
            return {"error": "empty code"}
        prompt = f"""
Analyse the following code and return **JSON only**:

CODE:
{code}

Return exactly:
{{
  "language": "...",
  "purpose": "...",
  "key_components": ["..."],
  "risks": ["..."],
  "summary": "one short paragraph"
}}
"""
        resp = self.model.generate_content(prompt)
        data = self._force_json(resp.text or "")
        return {
            "investigation": data,
            "model": self.model_name,
            "latency_ms": int((time.time() - t0) * 1000),
        }
