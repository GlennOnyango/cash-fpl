import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Captain Cash",
  description: "Bet on yourself to win big in fantasy football.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${inter.className} flex flex-col bg-gray-800 overflow-y-auto min-h-screen`} >
        {children}
      </body>
    </html>
  );
}
