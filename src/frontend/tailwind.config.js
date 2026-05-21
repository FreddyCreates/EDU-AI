import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
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
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        'text-primary': 'oklch(var(--text-primary) / 0.9)',
        'text-secondary': 'oklch(var(--text-secondary) / 0.7)',
        'text-tertiary': 'oklch(var(--text-tertiary) / 0.5)',
        'mastery-expert': 'oklch(var(--mastery-expert))',
        'mastery-learning': 'oklch(var(--mastery-learning))',
        'mastery-cold': 'oklch(var(--mastery-cold))',
        'mastery-hot': 'oklch(var(--mastery-hot))',
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        subtle: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        glass: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg": "0 24px 64px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.08)",
        "portal-student": "0 0 24px rgba(0,210,255,0.18), 0 0 48px rgba(0,210,255,0.06)",
        "portal-teacher": "0 0 24px rgba(160,100,255,0.18), 0 0 48px rgba(160,100,255,0.06)",
        "portal-principal": "0 0 24px rgba(255,185,0,0.18), 0 0 48px rgba(255,185,0,0.06)",
        "portal-it": "0 0 24px rgba(0,220,130,0.18), 0 0 48px rgba(0,220,130,0.06)",
      },
      blur: {
        "glass-sm": "8px",
        "glass": "16px",
        "glass-lg": "24px",
        "glass-xl": "48px",
      },
      spacing: {
        /* Direct Fibonacci values (no prefix) for className convenience */
        "fib-2": "2px",
        "fib-3": "3px",
        "fib-5": "5px",
        "fib-8": "8px",
        "fib-13": "13px",
        "fib-21": "21px",
        "fib-34": "34px",
        "fib-55": "55px",
        "fib-89": "89px",
        "fib-144": "144px",
        "fib-233": "233px",
        /* Legacy phi- prefix retained for backward compat */
        "phi-1": "1px",
        "phi-2": "2px",
        "phi-3": "3px",
        "phi-5": "5px",
        "phi-8": "8px",
        "phi-13": "13px",
        "phi-21": "21px",
        "phi-34": "34px",
        "phi-55": "55px",
        "phi-89": "89px",
        "phi-144": "144px",
        "phi-233": "233px",
      },
      width: {
        "phi-primary": "61.8%",
        "phi-secondary": "38.2%",
      },
      maxWidth: {
        "phi-primary": "61.8%",
        "phi-secondary": "38.2%",
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
        "glass-shimmer": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "portal-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.05)" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        "fade-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to:   { transform: "translateY(0)",   opacity: "1" },
        },
        "card-slide-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.96)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "data-stream-pulse": {
          "0%, 100%": { opacity: "0.7", boxShadow: "0 0 12px rgba(0,210,255,0.2)" },
          "50%":      { opacity: "1",   boxShadow: "0 0 24px rgba(0,210,255,0.35)" },
        },
        "metric-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.02)" },
        },
        "glow-cycle": {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 8px currentColor)" },
          "50%":      { filter: "brightness(1.1) drop-shadow(0 0 16px currentColor)" },
        },
        "shimmer-stream": {
          "0%":   { transform: "translateX(-200%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glass-shimmer": "glass-shimmer 4s ease-in-out infinite",
        "portal-pulse": "portal-pulse 2s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "fade-up": "fade-up 0.3s ease-out",
        "card-slide-in": "card-slide-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        "data-stream": "data-stream-pulse 3s ease-in-out infinite",
        "metric-breathe": "metric-breathe 2.618s ease-in-out infinite",
        "glow-cycle": "glow-cycle 4.236s ease-in-out infinite",
        "shimmer-stream": "shimmer-stream 2.618s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
