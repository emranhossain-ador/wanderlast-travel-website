import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Wanderlust",
  description: "This is a simple travel agency website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefin_sans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
