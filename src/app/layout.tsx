import { Inter, Roboto_Mono } from "next/font/google";
import "../../styles/globals.css";

import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "mx-auto flex flex-col bg-background font-sans antialiased bg-slate-100",
          inter.variable,
          roboto_mono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
