import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evergreen — Free Death Notice Generator",
  description:
    "Create a dignified death notice for newspaper, social media, or email in minutes. Free tool powered by Gaia.",
  keywords: [
    "death notice generator",
    "death notice template",
    "funeral notice",
    "obituary generator",
    "Australia death notice",
  ],
  openGraph: {
    title: "Evergreen — Free Death Notice Generator",
    description:
      "Create a dignified death notice for newspaper, social media, or email in minutes. Free tool powered by Gaia.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evergreen — Free Death Notice Generator",
    description:
      "Create a dignified death notice for newspaper, social media, or email in minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
