import { api } from "@/trpc/server";
import React, { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPage = () => {
  return (
    <Suspense fallback={<ArticlesListSkeleton />}>
      <ArticlesList></ArticlesList>
    </Suspense>
  );
};

export default BlogPage;

const ArticlesList = async () => {
  const data = await api.article.getAllPublished({ page: 0 });

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      {data?.map((article) => (
        <section className="p-2 outline-none" key={article.id}>
          <Link href={`/articles/${article.slug_name}`}>
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-sm bg-gray-500 text-center ">
              Image
            </div>
          </Link>
          <h2 className=" text-xl font-semibold">
            <Link href={`/articles/${article.slug_name}`}>{article.title}</Link>
          </h2>
          <p className="text-sm font-light">{article.description}</p>
        </section>
      ))}
    </section>
  );
};

const ArticlesListSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <section
          key={index}
          className="flex h-60 animate-pulse flex-col gap-2 rounded-sm p-2"
        >
          <Skeleton className=" h-32 w-full rounded-sm"></Skeleton>
          <Skeleton className="h-6 w-full"></Skeleton>
          <Skeleton className="h-6 w-2/3"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-full"></Skeleton>
        </section>
      ))}
    </section>
  );
};
