import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Namibia Family Safari | December 2025",
  description: "14-day family safari adventure through Namibia - Sossusvlei, Swakopmund, Damaraland, Etosha and more.",
  openGraph: {
    title: "Namibia Family Safari",
    description: "14-day family safari adventure through Namibia",
    images: ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
