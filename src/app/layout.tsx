import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umfrage zur Wahrnehmung digitaler Oberflächen",
  description: "Kurze wissenschaftliche Umfrage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-white text-black antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
