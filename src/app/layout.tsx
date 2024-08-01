import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
            className={`${poppins.className} light flex flex-col bg-gray-800 overflow-y-hidden h-screen`}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
