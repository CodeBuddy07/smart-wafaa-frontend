import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";

/** Display / headings — Plus Jakarta Sans 800 in the Figma. */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

/** Editorial italic accent line in the hero. */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

/** Nav, buttons, small labels. */
export const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex",
  display: "swap",
});

/** Arabic locale — pairs with IBM Plex Sans; also used for Arabic headings. */
export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const fontVariables = [
  plusJakarta.variable,
  playfair.variable,
  ibmPlex.variable,
  ibmPlexArabic.variable,
].join(" ");
