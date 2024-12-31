import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", lato.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className={siteConfig.containerWidth}>
              <div className="flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <Image src="/logo.svg" alt={siteConfig.name} width={40} height={40} />
                  <span className="text-xl font-bold">{siteConfig.name}</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  {Object.entries(mainMenu).map(([key, href]) => (
                    <Button key={key} variant="ghost" asChild>
                      <Link href={href}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Link>
                    </Button>
                  ))}
                  <ThemeToggle />
                </nav>
                <MobileNav />
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t bg-background">
            <div className={siteConfig.containerWidth}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
                <div className="space-y-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.svg" alt={siteConfig.name} width={40} height={40} />
                    <span className="text-xl font-bold">{siteConfig.name}</span>
                  </Link>
                  <p className="text-muted-foreground">{siteConfig.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Website</h3>
                  <nav className="flex flex-col gap-2">
                    {Object.entries(mainMenu).map(([key, href]) => (
                      <Link key={key} href={href} className="text-muted-foreground hover:text-foreground">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Blog</h3>
                  <nav className="flex flex-col gap-2">
                    {Object.entries(contentMenu).map(([key, href]) => (
                      <Link key={key} href={href} className="text-muted-foreground hover:text-foreground">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Stay Connected</h3>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
              <div className="border-t py-6 flex flex-col md:flex-row justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground">
                  Crafted with ❤️ in UAE
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
