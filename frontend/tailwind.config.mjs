/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['GeneralSans', 'Figtree', 'system-ui', 'sans-serif'],
        mono: ['JetBrainsMono', 'monospace'],
      },
      spacing: {
        'fib-xs': '3px',
        'fib-sm': '5px',
        'fib-md': '8px',
        'fib-lg': '13px',
        'fib-xl': '21px',
        'fib-2xl': '34px',
        'fib-3xl': '55px',
      },
      backdropBlur: {
        'glass-surface': '24px',
        'glass-primary': '16px',
        'glass-secondary': '12px',
        'glass-tertiary': '8px',
      },
    },
  },
  plugins: [],
};
