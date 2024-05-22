import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book a Bike!",
  description: "Untitled Case Study | Book a Bike!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-stone-50 text-center px-8 py-8 text-stone-700 border-b border-b-stone-200 font-bold">Book a Bike!</header>
        {children} {/* <main> */}
        <footer className="bg-gradient-to-r from-stone-800 to-stone-900 text-stone-200 text-center px-8 py-8 flex justify-center gap-4 underline">
          <a href="https://github.com/xkema/untitled-case-study-book-a-bike/tree/poc/without-search-param-state-handling">GitHub</a>
          <a href="https://xkema.github.io/untitled-case-study-book-a-bike/">GitHub Demo</a>
        </footer>
      </body>
    </html>
  );
}
