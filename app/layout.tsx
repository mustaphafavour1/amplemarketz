import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duo — AI Sales Platform",
  description: "Step into the future of sales: Human + AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
