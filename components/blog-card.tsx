import { Calendar, Tag, Eye } from "lucide-react";
import Link from "next/link";

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

const BlogCard = ({ blog }: { blog: Blog }) => {
    const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const tags = blog.tags ? blog.tags.split(",").map((tag) => tag.trim()) : [];

    const excerpt =
        blog.content.replace(/^#\s+.*?\n+/g, "").substring(0, 120).trim() +
        (blog.content.length > 120 ? "..." : "");

    return (
        <Link
            href={`/blog/${blog.slug}`}
            className="
        group block rounded-xl border 
        border-gray-300 dark:border-slate-700
        bg-white/90 dark:bg-black 
        shadow-sm hover:shadow-md dark:hover:shadow-lg
        transition-all duration-200
        flex flex-col
      "
        >
            {/* Top Section */}
            <div className="p-5 border-b border-gray-200 dark:border-slate-700">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {blog.title}
                    </h3>

                    {!blog.published && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100">
                            Draft
                        </span>
                    )}
                </div>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {excerpt}
                </p>
            </div>

            {/* Middle Content (Flexible height) */}
            <div className="px-5 py-3 flex flex-wrap gap-2 flex-grow">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="
              inline-flex items-center gap-1 
              px-2.5 py-1 
              text-xs font-medium 
              bg-gray-100 dark:bg-slate-800 
              text-gray-700 dark:text-gray-300 
              rounded-md
            "
                    >
                        <Tag size={12} />
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer — Sticks to bottom */}
            <div
                className="
          px-5 py-3 
          bg-gray-100/70 dark:bg-slate-900 
          border-t border-gray-200 dark:border-slate-700 
          flex items-center justify-between 
          text-sm text-gray-600 dark:text-gray-400
          mt-auto
        "
            >
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formattedDate}
                </div>

                <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{blog.published ? "Published" : "Unpublished"}</span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
