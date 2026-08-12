import type { Config } from "tailwindcss";
import { PluginCreator } from "tailwindcss/types/config";

const customPlugin: PluginCreator = ({ addUtilities }) => {
  // const newUtilities = {
  //   '.bg-primary-gradient': {
  //     background: 'var(--primary-gradient)', // Using custom property for the background
  //   },
  // };
  const newUtilities = {
    ".btn": {
      padding: "0.5rem 1rem", // Equivalent to px-4 py-2
      borderRadius: "0.375rem", // Equivalent to rounded-md
    },
    ".btn-primary": {
      background: "var(--primary-gradient)", // Equivalent to bg-blue-500
      color: "#ffffff", // Equivalent to text-white
      "&:hover": {
        background: "#0325E1", // Equivalent to hover:bg-blue-600
      },
      "&:active": {
        background: "#003E6E",
      },
    },
    ".btn-secondary": {
      backgroundColor: "#ffffff", // Equivalent to bg-gray-500
      color: "#000", // Equivalent to text-white
      border: "1px solid #DFDFDF",
      "&:hover": {
        background: "#F2F2F2", // Equivalent to hover:bg-gray-600
      },
      "&:active": {
        background: "#CFCFCF",
      },
    },
  };

  addUtilities(newUtilities); // Applying utilities with variants
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // "h1-black": "#303030", // before-modification-v2
        "h1-black": "#262626",
        "p-black": "#262626",
        "p-grey": "#727272",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        borderInput: "#0973E5",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          light: "#B5E0FD",
          bright: "#a8c4ff",
        },
        grey: {
          light: "#eeedf4",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-animated"),
    customPlugin,
  ],
} satisfies Config;

export default config;
