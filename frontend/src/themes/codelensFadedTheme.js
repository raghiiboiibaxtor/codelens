// 🍋 Codelens Faded — Refined pastel edition
// Softer contrast, balanced text weight, and smoother eye flow.

export const codelensFaded = {
  plain: {
    backgroundColor: "#071A19", // deep olive-slate base
    color: "#E3F1DE",           // misty lime-cream default
    fontWeight: 200,            // lighter baseline for better contrast
  },
  styles: [
    // 💬 Comments — faded sage green, gentle italic
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#A8DA8A", fontStyle: "italic", fontWeight: 200 },
    },

    // 🧡 Punctuation — soft tangerine, reduced brightness
    { types: ["punctuation"], style: { color: "#89F2B4", fontWeight: 200 } },

    // 🟢 Constants, numbers, booleans —  lime 
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#B9F49C", fontWeight: 400 } },

    // 🌿 Tags, properties — pastel green
    { types: ["property", "tag"], style: { color: "#BEE8B1", fontWeight: 200 } },

    // 💛 Strings — pale lemon cream, slightly dimmed
    { types: ["string", "char"], style: { color: "#FFF3A1", fontWeight: 300 } },

    // 🩵 Variables, operators — calm aqua-blue
    { types: ["variable", "operator", "entity", "url"], style: { color: "#A4DDEE", fontWeight: 200 } },

    // 🍊 Keywords — soft-orange
    { types: ["keyword", "selector", "inserted"], style: { color: "#F5C57C", fontStyle: "italic", fontWeight: 400 } },

    // 🍋 Functions — lime highlight
    { types: ["function", "builtin"], style: { color: "#B3FF9C", fontWeight: 400 } },

    // 💚 Class names — structured, slightly stronger but not bold
    { types: ["class-name"], style: { color: "#B3E0A3", fontWeight: 400 } },

    // 💠 Attributes — calm sky blue
    { types: ["attr-name"], style: { color: "#9CE8FF", fontWeight: 200 } },

    // 🔻 Deleted text — faded red 
    { types: ["deleted"], style: { color: "#F49B91", fontWeight: 200 } },

    // 💫 Emphasis — unified italic tone
    { types: ["italic"], style: { fontStyle: "italic", fontWeight: 200 } },
  ],
};
