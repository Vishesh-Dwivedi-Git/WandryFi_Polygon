import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                surface: {
                    base: '#050505', // Deep Black
                    card: '#0A0A0A', // Graphite
                    elevated: '#111111',
                    hover: '#1A1A1A',
                    stroke: '#333333', // More visible stroke for tech look
                },
                accent: {
                    primary: '#FACC15', // Signal Yellow (Cyber-Tech)
                    secondary: '#EAB308', // Gold
                    glow: 'rgba(250, 204, 21, 0.5)',

                    success: '#10B981',
                    warning: '#F59E0B',
                    danger: '#EF4444',
                },
                foreground: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#A1A1A1',
                    muted: '#525252',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'tech-grid': 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                'scanlines': 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
            },
            boxShadow: {
                glow: '0 0 20px -5px rgba(250, 204, 21, 0.4)',
                'glow-lg': '0 0 40px -10px rgba(250, 204, 21, 0.5)',
            },
            animation: {
                'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 20s linear infinite',
                'marquee': 'marquee 20s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    plugins: [],
}

export default config
