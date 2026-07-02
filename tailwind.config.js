/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'sans-serif'],
      },
      colors: {
        background: '#09090b', // zinc-950
        foreground: '#fafafa', // zinc-50
        card: '#18181b', // zinc-900
        'card-foreground': '#fafafa',
        primary: '#fafafa',
        'primary-foreground': '#18181b',
        secondary: '#27272a', // zinc-800
        'secondary-foreground': '#fafafa',
        muted: '#27272a',
        'muted-foreground': '#a1a1aa', // zinc-400
        accent: '#27272a',
        'accent-foreground': '#fafafa',
        border: '#27272a',
        input: '#27272a',
        ring: '#a1a1aa',
      },
    },
  },
  plugins: [],
}
