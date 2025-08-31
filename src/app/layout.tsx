import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Header } from "@/widgets/header/index";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
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
    <html lang="en" className="h-full">
      <body
        className={`min-h-screen h-full max-w-[3840px] overflow-x-hidden flex flex-col ${inter.variable} antialiased`}
      >
        <Header />
        <main className="flex-1 lg:px-10 4k:px-20 flex flex-col">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
