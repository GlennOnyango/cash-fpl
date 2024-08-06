import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers, ReactQueryProvider } from "./providers";

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
        <ReactQueryProvider>
          <Providers>
            <div
              className={`${poppins.className} flex flex-col bg-gray-800 overflow-y-hidden h-screen`}
            >
              {children}
            </div>
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
