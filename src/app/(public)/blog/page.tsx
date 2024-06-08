import React from "react";

const BlogPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
      {Array.from(Array(20)).map((_, i) => (
        <div className="" key={i}>
          <div className="flex h-32 items-center justify-center overflow-hidden rounded-sm bg-gray-500 text-center ">
            image
          </div>
          <h2 className=" text-xl font-semibold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
            numquam!
          </h2>
          <p className="text-sm font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            quo quae ducimus, ratione quaerat esse? Rerum est assumenda
            recusandae deserunt veniam quaerat, enim distinctio ab officia, aut
            soluta corporis beatae.
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
