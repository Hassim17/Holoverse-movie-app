/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#021102", // "#030014",
				secondary: "#131313", // "#151312",
				accent: "#00CC5C", // "#AB8BFF",
				light: {
					100: "#D7FFEC", // "#D6C7FF",
					200: "#A8DBC3", // "#A8B5DB",
					300: "#9CA4AB", // "#9CA4AB",
				},
				dark: {
					100: "#1F3D3C", // "#221F3D",
					200: "#0D2322", // "#0F0D23",
				},
			},
		},
	},
	plugins: [],
};
