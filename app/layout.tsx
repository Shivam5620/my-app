import { Providers } from "@/lib/Providers";
import "./globals.css";
import { NavigationMenu } from "./component/navbar/Header";
import { Toaster } from "@/components/ui/sonner"
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
          {children}
           <Toaster />
        </Providers>
      </body>
    </html>
  );
}
