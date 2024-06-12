import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";

const Blog = async ({ params }: { params: { slug: string } }) => {
  const data = await api.article.getOne({ slug_name: params.slug });
  return (
    <article className="prose lg:prose-xl font-serif">
      <h1>{data?.title}</h1>
      <div className="flex h-6 items-center justify-between px-4 text-center">
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
      </div>
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
      )}
    </article>
  );
};

export default Blog;
