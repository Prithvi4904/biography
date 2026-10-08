import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "SHAMBHAVI | The Series",
  description: "A story told through memories, moments, chaos, dreams, people and the little things that make someone impossible to forget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans bg-[#141414] text-[#ffffff] antialiased`}>
        <div className="film-grain"></div>
        {children}
      </body>
    </html>
  );
}
