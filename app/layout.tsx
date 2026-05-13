import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Scripture Theory — Encounter JESUS. Engage the Word. Live the Kingdom.",
  description:
    "An inter-denominational, JESUS-centered platform for global discipleship. Read the Bible in 11 trusted public-domain translations. Pray for a different nation every day. Memorize Scripture. Find a real local body.",
  metadataBase: new URL("https://scripture-theory.vercel.app"),
  openGraph: {
    title: "Scripture Theory",
    description:
      "Encounter JESUS. Engage the Word. Live the Kingdom. Connect with the Body.",
    type: "website",
  },
};

// Inline script that runs before paint to set the theme — prevents the
// flash of unthemed content (FOUC) when a user has selected dark mode.
const themeBootScript = `(function(){try{var s=localStorage.getItem('scripture-theory-theme')||'system';var d=s==='dark'||(s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-ink-50 text-ink-900">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
