import { api } from "@/trpc/server";
import Image from "next/image";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const data = await api.article.getMetaDataForSeo({ slug_name: params.slug });
  if (!data) {
    return notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.title,
    description: data?.description,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}
const Blog = async ({ params }: Props) => {
  if (!params.slug) return notFound();
  return (
    <Suspense fallback={<ArticleContentSkeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
};
const ArticleContent = async ({ params }: Props) => {
  const data = await api.article.getOne({ slug_name: params.slug });
  return (
    <article className="prose  lg:prose-lg prose-a:font-light prose-a:text-blue-500">
      <h1 className="text-xl md:text-2xl">{data?.title}</h1>
      <section className="flex h-6 items-center justify-between px-4 text-center">
        <p className="text-sm text-gray-500 md:text-base">
          {data?.createdAt.toDateString()}
        </p>

        <section className="flex items-center gap-2">
          {data?.createdBy.image && (
            <Image
              src={data?.createdBy.image}
              alt="Author's profile picture"
              width={20}
              height={20}
              className="rounded-full"
            ></Image>
          )}
          <p className="text-sm text-gray-500 md:text-base">
            {data?.createdBy.name}
          </p>
        </section>
      </section>
      {data?.content && (
        <article
          className="prose mt-10 font-light lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></article>
      )}
    </article>
  );
};
const ArticleContentSkeleton = () => {
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

export default Blog;
