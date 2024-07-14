import { api } from "@/trpc/server";
import React from "react";
import Link from "next/link";

const BlogPage = async () => {
  const data = await api.article.getAllPublished({ page: 0 });
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      {data?.map((article) => (
        <div className="" key={article.id}>
          <Link href={`/articles/${article.slug_name}`}>
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-sm bg-gray-500 text-center ">
              Image
            </div>
          </Link>
          <h2 className=" text-xl font-semibold">
            <Link href={`/articles/${article.slug_name}`}>{article.title}</Link>
          </h2>
          <p className="text-sm font-light">{article.description}</p>
        </div>
      ))}
    </section>
  );
};

export default BlogPage;
