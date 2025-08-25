import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Header } from "@/widgets/header/index";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Samara AQI",
  description: "Samara AQI client app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`lg:w-[1700px] md:w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${inter.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
