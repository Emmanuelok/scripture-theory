import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Scripture Theory — Encounter JESUS. Engage the Word. Live the Kingdom.",
  description:
    "An inter-denominational, Scripture-centered AI platform for global discipleship: citation-grounded answers, multi-tradition lenses, and a path from the Word to a local body.",
  metadataBase: new URL("https://scripture-theory.vercel.app"),
  openGraph: {
    title: "Scripture Theory",
    description:
      "Encounter JESUS. Engage the Word. Live the Kingdom. Connect with the Body.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
