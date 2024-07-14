import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogLoading = async () => {
  return (
    <article className="prose  lg:prose-lg">
      <Skeleton className="h-8 w-full"></Skeleton>
      <Skeleton className="mt-4 h-8 w-3/4"></Skeleton>
      <section className="mt-4 flex h-6 items-center justify-between px-4">
        <Skeleton className="h-4 w-24"></Skeleton>

        <section className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full"></Skeleton>

          <Skeleton className="h-5 w-20 "></Skeleton>
        </section>
      </section>

      <section className="mt-10 flex flex-col gap-4">
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
      </section>
    </article>
  );
};

export default BlogLoading;
