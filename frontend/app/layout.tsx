import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/redux/provider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Setup from "@/components/utils/Setup";

import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "700"],
  subsets: ["latin"],
});
// Metadata for each page
export const metadata: Metadata = {
  title: "SoundNest",
  description: "Explore your taste in music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <Setup />
          <Navbar />
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
