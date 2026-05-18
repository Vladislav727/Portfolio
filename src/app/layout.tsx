import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Manrope, Rubik } from "next/font/google";

import { PreferencesProvider } from "@/components/preferences-provider";
import {
  defaultLocale,
  defaultTheme,
  isLocale,
  isTheme,
} from "@/lib/translations";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const displayFont = Rubik({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Владислав | Portfolio",
  description:
    "Портфолио Владислава — техника-программиста из Cesis, Latvia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("portfolio-locale")?.value;
  const themeCookie = cookieStore.get("portfolio-theme")?.value;

  const initialLocale = isLocale(localeCookie) ? localeCookie : defaultLocale;
  const initialTheme = isTheme(themeCookie) ? themeCookie : defaultTheme;

  return (
    <html
      lang={initialLocale}
      data-theme={initialTheme}
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PreferencesProvider
          initialLocale={initialLocale}
          initialTheme={initialTheme}
        >
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
