import { api } from "@/trpc/server";
import React from "react";

const Edit = async ({
  params: { article_title },
}: {
  params: { article_title: string };
}) => {
  const data = await api.article.getOne({ slug_name: article_title });
  console.log(data);
  return <div>{article_title}</div>;
};

export default Edit;
