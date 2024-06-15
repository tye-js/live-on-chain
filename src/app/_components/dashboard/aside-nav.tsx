"use client";
import Link from "next/link";
import React from "react";

import {
  Home,
  LineChart,
  FilePenLine,
  Settings,
  Book,
  Users2,
} from "lucide-react";

import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

const AsideNav = () => {
  const pathName = usePathname();
  const pathNameArray = pathName?.split("/").filter((item) => item !== "");
  const lastPathName = pathNameArray.pop();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full border text-lg  font-semibold text-primary-foreground transition-all hover:scale-110 md:h-8 md:w-8 md:text-base"
        >
          <Image src="/logo.svg" alt="Logo" width="20" height="20"></Image>

          <span className="sr-only">后台管理系统</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={
                  (lastPathName === "dashboard"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground") +
                  " flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                }
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/articles"
                className={
                  (lastPathName === "articles"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground") +
                  " flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                }
              >
                <Book className="h-5 w-5" />
                <span className="sr-only">Articles</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Articles</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/write"
                className={
                  (lastPathName === "write"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground") +
                  " flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                }
              >
                <FilePenLine className="h-5 w-5" />
                <span className="sr-only">Write</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Write</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={
                  (lastPathName === "customers"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground") +
                  " flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                }
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/analytics"
                className={
                  (lastPathName === "analytics"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground") +
                  " flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                }
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/setting"
                className={
                  (lastPathName === "setting"
                    ? "bg-accent text-accent-foreground "
                    : "text-muted-foreground") +
                  " flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
                }
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default AsideNav;
