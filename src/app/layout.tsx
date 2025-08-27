import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Header } from "@/widgets/header/index";

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
        className={`min-h-screen h-full flex flex-col ${inter.variable} antialiased`}
      >
        <Header />
        <main className="mx-auto flex-1 w-full max-w-[3840px] sm:px-6 lg:px-10 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
