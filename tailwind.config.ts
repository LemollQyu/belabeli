import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        nunitoLight: ["nunitoLight", "sans-serif"],
        nunitoBold: ["nunitoBold", "sans-serif"],
      },
      colors: {
        warnaUtama: "#51d7b1",
        buttonGrey: "#f1f1f1",
        warnaKetiga: "#EAFBEE",
        warnaShadeBase: "#00BAE1",
        putihBase: "#FDFDFD",
        warnaKedua: "#09CBCA",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #51D7B1 0.22%, #6ADFA6 52.97%, #3AD5B8 82.03%, #00BAE1 135.08%)",
      },
    },
  },
  plugins: [],
};
export default config;
