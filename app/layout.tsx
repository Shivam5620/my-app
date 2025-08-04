import { Providers } from "@/lib/Providers";
import "./globals.css";
import { NavigationMenu } from "./component/navbar/Header";
import { Toaster } from "@/components/ui/sonner";
import { Banner } from "./component/navbar/Banner";
import { Footer } from "./component/navbar/Footer";
export const metadata = {
  title: "Shop~Easy",
  description: "Using TanStack Query in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-6 text-black rounded-lg">
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
