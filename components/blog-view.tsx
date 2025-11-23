"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogForm from "@/components/blog-form";

interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags: string;
}

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
  blog?: Blog;
  isAuthor?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  className = "",
  blog,
  isAuthor = false,
}) => {

  // Remove escape characters that MDX editor adds
  const cleanMarkdown =
    markdown?.replace(/\\([#\-*`_{}[\]()>!|])/g, "$1") || "";

  const [isEditing, setIsEditing] = useState(false);
  if (isEditing && blog) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-background border rounded-lg shadow-lg w-full max-w-7xl relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="p-6">
              <BlogForm
                initialData={blog}
                onSuccess={() => {
                  setIsEditing(false);
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container max-w-4xl mx-auto p-6 relative">
      <div className="mb-8 pr-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white wrap-break-word mb-4">
          {blog?.title}
        </h1>
        {blog?.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        {isAuthor && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-5 w-5" />
            <span className="sr-only">Edit</span>
          </Button>
        )}
      </div>
      <article
        className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white"
                {...props}
              />
            ),
            h4: ({ ...props }) => (
              <h4
                className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white"
                {...props}
              />
            ),
            h5: ({ ...props }) => (
              <h5
                className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white"
                {...props}
              />
            ),
            h6: ({ ...props }) => (
              <h6
                className="text-base font-bold mt-3 mb-2 text-gray-900 dark:text-white"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p
                className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-7"
                {...props}
              />
            ),
            ul: ({ ...props }) => (
              <ul
                className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300"
                {...props}
              />
            ),
            ol: ({ ...props }) => (
              <ol
                className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300"
                {...props}
              />
            ),
            li: ({ ...props }) => (
              <li className="text-gray-700 dark:text-gray-300" {...props} />
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 italic text-gray-700 dark:text-gray-400 my-6 bg-gray-50 dark:bg-gray-800/50"
                {...props}
              />
            ),
            a: ({ ...props }) => (
              <a
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            strong: ({ ...props }) => (
              <strong
                className="font-bold text-gray-900 dark:text-white"
                {...props}
              />
            ),
            em: ({ ...props }) => (
              <em
                className="italic text-gray-800 dark:text-gray-200"
                {...props}
              />
            ),
            code: ({
              inline,
              children,
              ...props
            }: {
              inline?: boolean;
              children?: React.ReactNode;
            }) => {
              if (inline) {
                return (
                  <code
                    className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-red-600 dark:text-red-400"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code
                  className="block text-sm font-mono text-gray-100"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            pre: ({ ...props }) => (
              <pre
                className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700"
                {...props}
              />
            ),
            hr: ({ ...props }) => (
              <hr
                className="my-8 border-t-2 border-gray-300 dark:border-gray-600"
                {...props}
              />
            ),
            img: ({ alt, ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="max-w-full h-auto rounded-lg my-6 shadow-lg"
                alt={alt || "Blog image"}
                {...props}
              />
            ),
            table: ({ ...props }) => (
              <div className="overflow-x-auto my-6">
                <table
                  className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
                  {...props}
                />
              </div>
            ),
            thead: ({ ...props }) => (
              <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
            ),
            th: ({ ...props }) => (
              <th
                className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white"
                {...props}
              />
            ),
            td: ({ ...props }) => (
              <td
                className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300"
                {...props}
              />
            ),
          }}
        >
          {cleanMarkdown}
        </ReactMarkdown>
      </article>
    </div>
  );
};
