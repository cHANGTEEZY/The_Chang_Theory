import React from "react";
import { getAllPublishedBlogPost } from "../../actions/blog";

import BlogCard from "@/components/blog-card";

const page = async () => {
  const response = await getAllPublishedBlogPost();

  return (
    <div className="content-container">
      <h1 className="text-title">
        Discover the latest trends in science, technology <br /> and many other
        topics.
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 md:mx-0 mx-5">
        {response.success ? (
          response.data?.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p>No blog posts found</p>
        )}
      </section>
    </div>
  );
};

export default page;
