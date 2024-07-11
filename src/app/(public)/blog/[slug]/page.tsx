import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const data = await api.article.getOne({ slug_name: params.slug });

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
  const data = await api.article.getOne({ slug_name: params.slug });
  return (
    <article className="prose  lg:prose-lg prose-a:font-light prose-a:text-blue-500">
      <h1>{data?.title}</h1>
      <section className="flex h-6 items-center justify-between px-4 text-center">
        <p>{data?.createdAt.toDateString()}</p>

        <span className="flex items-center gap-2">
          {data?.createdBy.image && (
            <Image
              src={data?.createdBy.image}
              alt="Author's profile picture"
              width={24}
              height={24}
              className="rounded-full"
            ></Image>
          )}
          <span>{data?.createdBy.name}</span>
        </span>
      </section>
      {data?.content && (
        <article
          className="font-light"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        >
          {/* <data ></data> */}
        </article>
      )}
    </article>
  );
};

export default Blog;
