import { Providers } from "@/lib/Providers";
import "./globals.css";
import { NavigationMenu } from "./component/navbar/Header";
import { Toaster } from "@/components/ui/sonner"
import { Banner } from "./component/navbar/Banner";
import { Footer } from "./component/navbar/Footer";
export const metadata = {
  title: "My App",
  description: "Using TanStack Query in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavigationMenu />
          <Banner/>
          {children}
           <Toaster />
           <Footer/>
        </Providers>
      </body>
    </html>
  );
}
