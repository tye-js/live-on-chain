"use client";
import Image from "next/image";

import Link from "next/link";

import { MoreHorizontal, PlusCircle, LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { type EnumStatus } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";

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

function getArticleData(statusParam: ArticleStatus, pageNumber: number) {
  const count = api.article.getAllCount.useQuery({
    status: statusParam,
  });
  const data = api.article.getAll.useQuery({
    page: pageNumber - 1,
    status: statusParam,
  });

  return { count, data };
}
export default function Articles() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const statusParam = searchParams.get("status") ?? "ALL";
  const pageNumber =
    Number(searchParams.get("pageNumber")) === 0
      ? 1
      : Number(searchParams.get("pageNumber"));

  const { count, data } = getArticleData(
    statusParam as ArticleStatus,
    pageNumber,
  );

  const joinUrl = (status?: ArticleStatus, pageNumber?: number) => {
    return pathName + "?" + `status=${status}&&pageNumber=${pageNumber}`;
  };

  return (
    <main className="grid flex-1 items-start gap-4  md:gap-8">
      <Tabs defaultValue={statusParam}>
        <div className="flex items-center">
          <TabsList>
            <Link href={joinUrl("ALL", 1)}>
              <TabsTrigger value="ALL" disabled={statusParam === "ALL"}>
                All
              </TabsTrigger>
            </Link>
            <Link href={joinUrl("ARCHIVE", 1)}>
              <TabsTrigger value="ARCHIVE">Archive</TabsTrigger>
            </Link>
            <Link href={joinUrl("PUBLISHED", 1)}>
              <TabsTrigger value="PUBLISHED">Published</TabsTrigger>
            </Link>
            <Link href={joinUrl("UNPUBLISHED", 1)}>
              <TabsTrigger value="UNPUBLISHED" className="hidden sm:flex">
                Unpublished
              </TabsTrigger>
            </Link>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
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
        <TabsContent value={statusParam}>
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
                              <Link
                                href={`/dashboard/articles/edit/${article.slug_name}`}
                              >
                                <DropdownMenuItem className="hover:cursor-pointer">
                                  Edit
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem className="hover:cursor-pointer">
                                Delete
                              </DropdownMenuItem>
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
                  {10 * (pageNumber - 1)}-{pageNumber * 10}
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
                  <PaginationItem hidden={pageNumber === 1}>
                    <PaginationPrevious
                      href={joinUrl(
                        statusParam as ArticleStatus,
                        pageNumber - 1,
                      )}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <Link href={joinUrl(statusParam as ArticleStatus, 1)}>
                      1
                    </Link>
                  </PaginationItem>
                  <PaginationItem>
                    <Link href={joinUrl(statusParam as ArticleStatus, 2)}>
                      2
                    </Link>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  {count.data && (
                    <PaginationItem hidden={pageNumber === count.data / 10}>
                      <PaginationNext
                        href={joinUrl(
                          statusParam as ArticleStatus,
                          pageNumber + 1,
                        )}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
