import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Bench Boasters",
  description: "Bet on yourself to win big in fantasy football.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div
            className={`${roboto.className} flex flex-col bg-gray-800 overflow-y-hidden h-screen`}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
