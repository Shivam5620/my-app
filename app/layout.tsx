import { Providers } from "@/lib/Providers";
import "./globals.css";
import { NavigationMenu } from "./component/navbar/Header";
import { Toaster } from "@/components/ui/sonner";
import { Banner } from "./component/navbar/Banner";
import { Footer } from "./component/navbar/Footer";
import { Inter, Philosopher } from "next/font/google";

export const metadata = {
  title: "Shop~Easy",
  description: "Using TanStack Query in Next.js",
};

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${philosopher.className} bg-gradient-to-r from-yellow-300 to-yellow-500 p-6 text-black rounded-lg`}
      >
        <Providers>
          <NavigationMenu />
          <Banner />
          {children}
          <Toaster />
          <Banner />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
