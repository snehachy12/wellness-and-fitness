import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google"; // 1. Import the font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 2. Configure the cursive font
const greatVibes = Great_Vibes({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-great-vibes" // We create a CSS variable to use it easily
});

export const metadata: Metadata = {
  title: "Madeleine Abeid - Pilates",
  description: "Move with calm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 3. Add the font variable to the body class */}
      <body className={`${inter.className} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}