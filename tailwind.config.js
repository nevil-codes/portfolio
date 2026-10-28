/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0c0b09",
        surface: "#141310",
        raised: "#1b1915",
        border: "#25231e",
        "border-strong": "#38352d",
        ink: "#efeae1",
        muted: "#a8a294",
        dim: "#8b8678",
        amber: "#f5a524",
        "amber-light": "#fbbf47",
        mint: "#7ee0a8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        pop: {
          from: { opacity: "0", transform: "translateY(8px) scale(0.98)" },
        },
        fade: {
          from: { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        pop: "pop 180ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        fade: "fade 180ms ease-out",
      },
    },
  },
  plugins: [],
};
