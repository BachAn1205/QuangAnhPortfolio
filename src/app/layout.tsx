import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { fetchDatabaseMedia } from "@/lib/get-db-media";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Quang Anh | Engineering & Entrepreneurship Portfolio",
  description:
    "Personal engineering and entrepreneurship portfolio: hardware prototyping, commercial ventures, and community leadership.",
  openGraph: {
    title: "Quang Anh | Engineering & Entrepreneurship Portfolio",
    description:
      "Electronics, research, and community leadership.",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const initialMedia = await fetchDatabaseMedia();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AppProviders initialMedia={initialMedia}>{children}</AppProviders>
      </body>
    </html>
  );
}
