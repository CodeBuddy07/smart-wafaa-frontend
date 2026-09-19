import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smart Wafaa",
    short_name: "Smart Wafaa",
    description: "Native wallet loyalty engine for Apple & Google Wallet.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0F4C3A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
