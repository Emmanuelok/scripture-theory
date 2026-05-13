import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Scripture Theory — Encounter Jesus. Engage the Word.",
    short_name: "Scripture Theory",
    description:
      "JESUS-centered platform for global discipleship. Bible in 14 trusted public-domain translations, daily prayer for the nations, on-device journal & prayer life.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf7f0",
    theme_color: "#b8420c",
    categories: ["books", "education", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Today",
        short_name: "Today",
        description: "Your daily rhythm with Jesus",
        url: "/today",
      },
      {
        name: "Bible",
        short_name: "Bible",
        description: "Read the Bible",
        url: "/bible",
      },
      {
        name: "My Secret Place",
        short_name: "Secret Place",
        description: "Your private contemplative space",
        url: "/secret-place",
      },
      {
        name: "Pray",
        short_name: "Pray",
        description: "Pray for the nations and the world",
        url: "/pray",
      },
    ],
  };
}
