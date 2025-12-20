import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Echelon Dashboard | AI-Powered Productivity",
  description:
    "An intelligent personal productivity dashboard combining AI insights, task tracking, and data visualization. Built with React, Next.js, and TypeScript.",
  keywords: [
    "productivity",
    "dashboard",
    "AI",
    "task management",
    "habits",
    "analytics",
  ],
  authors: [
    {
      name: "Echelon Team",
      url: "https://github.com/DevAnnafi/Echelon",
    },
  ],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}