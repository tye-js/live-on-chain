"use client";
import Image from "next/image";

import Link from "next/link";

import {
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  LoaderCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { useState } from "react";
import { type EnumStatus } from "@prisma/client";
import { usePathname } from "next/navigation";

type ArticleStatus = EnumStatus | "ALL";
// type ArticleDataType = {
//   id: number;
//   title: string;
//   published: boolean;
//   slug_name: string;
//   description: string;
//   content: string;
//   status: EnumStatus;
//   createdAt: Date;
//   updatedAt: Date;
//   createdById: string;
// }[];
export default function Articles() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<ArticleStatus>("ALL");

  const pathName = usePathname();

  const count = api.article.getAllCount.useQuery({ status });
  const data = api.article.getAll.useQuery({ page, status });
  const handelClickTabs = (status: ArticleStatus) => {
    setStatus(status);
  };
  return (
    <main className="grid flex-1 items-start gap-4  md:gap-8">
      <Tabs defaultValue={status}>
        <div className="flex items-center">
          <TabsList>
            <Link href={pathName + "?" + `status=ALL`}>
              <TabsTrigger
                value="ALL"
                onClick={() => handelClickTabs("ALL")}
                disabled={status === "ALL"}
              >
                All
              </TabsTrigger>
            </Link>
            <Link href={pathName + "?" + `status=ARCHIVE`}>
              <TabsTrigger
                value="ARCHIVE"
                onClick={() => handelClickTabs("ARCHIVE")}
              >
                Archive
              </TabsTrigger>
            </Link>
            <Link href={pathName + "?" + `status=PUBLISHED`}>
              <TabsTrigger
                value="PUBLISHED"
                onClick={() => handelClickTabs("PUBLISHED")}
              >
                Published
              </TabsTrigger>
            </Link>
            <Link href={pathName + "?" + `status=UNPUBLISHED`}>
              <TabsTrigger
                value="UNPUBLISHED"
                onClick={() => handelClickTabs("UNPUBLISHED")}
                className="hidden sm:flex"
              >
                Unpublished
              </TabsTrigger>
            </Link>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Published
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Unpublished</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Active</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/dashboard/write">
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Article
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value={status}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>

                    <TableHead className="hidden md:table-cell">
                      Reading Volume
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.isLoading && (
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton className="h-[64px] w-full rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-[40px] w-full rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-[40px] w-full rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-[40px] w-full rounded-full"></Skeleton>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-[40px] w-full rounded-full"></Skeleton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                  {data.isSuccess &&
                    data.data?.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/logo.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link href={`/blog/${article.slug_name}`}>
                            {article.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {article.status === "UNPUBLISHED" && (
                            <Badge variant="secondary">Unpublished</Badge>
                          )}
                          {article.status === "ARCHIVE" && (
                            <Badge variant="outline">Archived</Badge>
                          )}
                          {article.status === "PUBLISHED" && (
                            <Badge variant="default">Published</Badge>
                          )}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          25
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {article.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <strong>
                  {10 * page}-{(page + 1) * 10}
                </strong>{" "}
                of{" "}
                {count.isLoading ? (
                  <LoaderCircle className="inline-block h-[14px] w-[14px] animate-spin" />
                ) : (
                  count.data
                )}{" "}
                products
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={pathName + "?" + `page=0`}
                      onClick={() => setPage(0)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(1)}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
