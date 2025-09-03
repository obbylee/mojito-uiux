import "@/lib/gsap";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mojito: The Spirit of Summer Cocktails",
  description:
    "Sip the spirit of summer. Explore our menu of crafted cocktails, a blend of premium ingredients, creative flair, and timeless recipes designed to delight your senses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
