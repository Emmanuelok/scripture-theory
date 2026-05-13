import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth";
import { ProfileSyncBridge } from "@/components/ProfileSyncBridge";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Scripture Theory — Encounter JESUS. Engage the Word. Live the Kingdom.",
  description:
    "An inter-denominational, JESUS-centered platform for global discipleship. Read the Bible in 14 trusted public-domain translations. Pray for a different nation every day. Memorize Scripture. Find a real local body.",
  metadataBase: new URL("https://scripture-theory.vercel.app"),
  applicationName: "Scripture Theory",
  appleWebApp: {
    capable: true,
    title: "Scripture Theory",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Scripture Theory",
    description:
      "Encounter JESUS. Engage the Word. Live the Kingdom. Connect with the Body.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripture Theory",
    description:
      "Encounter JESUS. Engage the Word. Live the Kingdom. Connect with the Body.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f0" },
    { media: "(prefers-color-scheme: dark)", color: "#120a06" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline script that runs before paint to set the theme AND apply
// the user's accessibility prefs — prevents flash of unthemed content.
const themeBootScript = `(function(){try{var s=localStorage.getItem('scripture-theory-theme')||'system';var d=s==='dark'||(s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');var a=localStorage.getItem('scripture-theory-a11y');if(a){var p=JSON.parse(a);var r=document.documentElement;if(p.textSize&&p.textSize!=='base')r.setAttribute('data-a11y-text',p.textSize);if(p.font&&p.font!=='default')r.setAttribute('data-a11y-font',p.font);if(p.contrast&&p.contrast!=='normal')r.setAttribute('data-a11y-contrast',p.contrast);if(p.motion&&p.motion!=='system')r.setAttribute('data-a11y-motion',p.motion);if(p.underline&&p.underline!=='off')r.setAttribute('data-a11y-underline',p.underline);}}catch(e){}})();`;

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
        <AuthProvider>
          <ProfileSyncBridge />
          <ServiceWorkerRegistrar />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
