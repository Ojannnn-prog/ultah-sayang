import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Things | Birthday Scrapbook",
  description: "An interactive birthday keepsake, made with love.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
