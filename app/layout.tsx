import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/provider"

const lexend = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "kuraz Tech Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  );
}
