import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Wanderlast | Discover Your Next Adventure",
  description: "Curated travel experiences for your next adventure.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className
        } h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
