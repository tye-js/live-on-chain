import React from "react";

const Blog = ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  return <div>Blog</div>;
};

export default Blog;
