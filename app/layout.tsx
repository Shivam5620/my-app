import { Providers } from "@/lib/Providers";
import "./globals.css";
import { NavigationMenu } from "./component/navbar/Header";

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
        </Providers>
      </body>
    </html>
  );
}
