import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import HeaderNav from "../_components/header-nav";
import Footer from "@/app/_components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: {
    template: "%s | LiveOnChain",
    default: "LiveOnChain",
  },
  description: "Live on blockchain",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextTopLoader showSpinner={false} height={2} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <HeaderNav></HeaderNav>

            <main className="container mt-4">{children}</main>
          </TRPCReactProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
