import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cranton",
  description: "Aviation, Vertiport & Heliport Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
