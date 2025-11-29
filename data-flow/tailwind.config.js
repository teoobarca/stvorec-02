/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'void': '#050505',
                'neon-cyan': '#00F0FF',
                'neon-purple': '#7000FF',
                'acid-green': '#CCFF00',
            },
            fontFamily: {
                mono: ['"Space Mono"', 'monospace'],
            },
        },
    },
    plugins: [],
}
