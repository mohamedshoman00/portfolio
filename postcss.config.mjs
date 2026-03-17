// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // ✅ No autoprefixer needed — v4 handles vendor prefixes internally
  },
};

export default config;
