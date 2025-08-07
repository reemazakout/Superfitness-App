/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        none: "0",
      },
      lineHeight: {
        full: "100%",
        140: "140%",
      },
      screens: {
        "laptop-sm": { raw: "(min-height: 700px) and (max-height: 800px)" },
        "laptop-lg": { raw: "(min-height: 1080px)" },
      },
      backgroundImage: {
        "meal-bg-img": "url('/src/assets/images/meals/meals.jpg')",
        "breakfast-bg": "url('/src/assets/images/meals/breakfast.jpg')",
        "lunch-bg": "url('/src/assets/images/meals/lunch.jpg')",
        "dinner-bg": "url('/src/assets/images/meals/dinner.jpg')",
        "ChatAi-bg": "url('/src/assets/images/ChatAi/chatAi.jpg')",
        "model-bg": "url('/src/assets/images/ChatAi/model.jpg')",
        "human-bg": "url('/src/assets/images/ChatAi/human.jpg')",
        "hero-bg": "url('/src/assets/images/hero-bg.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        rubik: ['"Rubik"', "sans-serif"],
        baloo: ['"Baloo Thambi 2"', "cursive"],
      },
      colors: {
        "motion-gray": "#b0b0b0",
        "light-gray": "#D3D3D3",
        "orange-base": "#FF410033",
        "muted-white": "#D9D9D9",
        flame: "#FF4100",
        cloudy: "#F3F3F4",
        charcoal: "#242424",
        graphite: "#282828",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
