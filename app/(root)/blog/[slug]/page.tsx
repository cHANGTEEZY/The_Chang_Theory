import React from "react";
import { getBlogPostBySlug } from "@/app/actions/blog";
import { getUserServerSessionData } from "@/lib/utils/serverUser";
import { MarkdownRenderer } from "@/components/blog-view";

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const response = await getBlogPostBySlug({ slug });
  const sessionData = await getUserServerSessionData();
  const user = sessionData?.user;

  if (!response.success || !response.data) {
    return (
      <div className="content-container">
        <h1 className="text-title">Blog Post Not Found</h1>
        <p className="text-body">
          The blog post you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const blog = response.data;
  const isAuthor = user && user.id === blog.userId;

  return <MarkdownRenderer markdown={blog.content} isAuthor={isAuthor} blog={blog} />;
};

export default BlogPage;
