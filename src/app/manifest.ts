import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Hotel Dream",
    description:
      "Hotel Dream Rimini a Miramare: a 150m dal mare, colazione 7:00-11:00, camere confortevoli e servizi smart.",
    start_url: "/it",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0c1f3f",
    lang: "it",
    scope: "/",
    id: SITE_URL,
    icons: [
      {
        src: "/images/logo-v3.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo-v3.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
