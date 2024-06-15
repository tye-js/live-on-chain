import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import AsideNav from "../_components/dashboard/aside-nav";
import HeaderNavEnd from "../_components/dashboard/header-nav-end";
import { Toaster } from "@/components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";
import NextTopLoader from "nextjs-toploader";
export const metadata = {
  title: "Dashboard",
  description: "Live on blockchain-dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextTopLoader showSpinner={false} height={2} />
        <TRPCReactProvider>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <AsideNav></AsideNav>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <HeaderNavEnd />
              <div className=" p-4 sm:px-6 sm:py-0">{children}</div>
            </div>
          </div>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
