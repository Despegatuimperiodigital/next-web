module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F04132", // Coral como color principal
          light: "#FC7965",
          dark: "#0D2940",
          foreground: "#FDFAFA",
        },
        secondary: {
          DEFAULT: "#0D2940", // Azul oscuro como secundario
          foreground: "#FDFAFA",
        },
        destructive: {
          DEFAULT: "#F04132",
          foreground: "#FDFAFA",
        },
        muted: {
          DEFAULT: "#1A1B1C",
          foreground: "#FDFAFA",
        },
        accent: {
          DEFAULT: "#FC7965",
          foreground: "#1A1B1C",
        },
        popover: {
          DEFAULT: "#FDFAFA",
          foreground: "#1A1B1C",
        },
        card: {
          DEFAULT: "#FDFAFA",
          foreground: "#1A1B1C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}