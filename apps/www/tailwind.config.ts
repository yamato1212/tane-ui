/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("../../packages/base/tailwind.config")], // パスを修正
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // パッケージのパスを修正
    "../../packages/base/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}