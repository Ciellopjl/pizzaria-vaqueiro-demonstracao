/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                black: "#0A0A0A",
                "dark-gray": "#1A1A1A",
                gold: "#D4AF37",
                "gold-hover": "#E5C35C",
                "gold-light": "#F0D060",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Playfair Display", "serif"],
            },
            animation: {
                "slide-in-right": "slideInRight 0.4s ease-out",
                "fade-in": "fadeIn 0.6s ease-out",
                "float": "float 3s ease-in-out infinite",
            },
            keyframes: {
                slideInRight: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            backgroundImage: {
                "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)",
                "dark-gradient": "linear-gradient(180deg, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,1) 100%)",
            },
        },
    },
    plugins: [],
};
