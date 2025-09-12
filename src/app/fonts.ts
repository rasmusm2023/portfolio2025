import {
  Hanken_Grotesk,
  Orbitron,
  Audiowide,
  Montserrat,
  Instrument_Serif,
} from "next/font/google";

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

export const montserrat = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});
