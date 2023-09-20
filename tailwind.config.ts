import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      heading1: [
        "2.4rem",
        {
          lineHeight: "3.5rem",
          letterSpacing: "-0.0333rem",
          fontWeight: "700",
        },
      ],
      heading2: [
        "2rem",
        {
          lineHeight: "2.9rem",
          letterSpacing: "-0.025rem",
          fontWeight: "700",
        },
      ],
      heading3: [
        "1.8rem",
        {
          // lineHeight: "2.6rem",
          letterSpacing: "-0.025rem",
          fontWeight: "700",
        },
      ],
      heading4: [
        "1.4rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.0194rem",
          fontWeight: "700",
        },
      ],
      heading5: [
        "1.3rem",
        {
          letterSpacing: "-0.0181rem",
          fontWeight: "700",
        },
      ],
      buttonText: [
        "1.4rem",
        {
          fontWeight: "700",
        },
      ],
      body1: [
        "1.6rem",
        {
          // lineHeight: "2.3rem",
          fontWeight: "400",
        },
      ],
      body2: [
        "1.5rem",
        {
          lineHeight: "2.2rem",
          fontWeight: "400",
        },
      ],
      body3: [
        "1.3rem",
        {
          // lineHeight: "1.9rem",
          fontWeight: "600",
        },
      ],
      sortButtonText: [
        "1.6rem",
        {
          fontWeight: "400",
        },
      ],
    },
    extend: {
      colors: {
        "light-purple-500": "rgb(173, 31, 234)",
        "dark-blue": "rgb(70, 97, 230)",
        "dark-grayish-500": "rgb(55, 63, 104)",
        "dark-grayish-400": "rgb(58, 67, 116)",
        "light-gray-200": "rgb(100, 113, 150)",
        "clr-white": "rgb(255, 255, 255)",
        "light-purple-100": "rgb(242, 244, 255)",
        "ghost-white-100": "rgb(247, 248, 253)",
        "light-orange-500": "rgb(244, 159, 133)",
        "light-blue-500": "rgb(98, 188, 250)",
        "nav-opc": "rgba(0, 0, 0, 0.5)",
        "comment-divide": "rgba(140,146,179, 0.25)",
      },
      fontFamily: {
        sans: ["Jost", "sans-serif"],
      },
      keyframes: {
        "nav-down": {
          from: { height: "h-screen" },
          to: { height: "h-0" },
        },
        "nav-up": {
          from: { height: "h-0" },
          to: { height: "h-screen" },
        },
      },
      animation: {
        "nav-down": "nav-down 0.2s ease-out",
        "nav-up": "nav-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
