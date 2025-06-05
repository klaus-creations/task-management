import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";


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
            <div className="size-full bg-background1 text-text1 font-lexend">
              {children}
            </div>
      </body>
    </html>
  );
}
