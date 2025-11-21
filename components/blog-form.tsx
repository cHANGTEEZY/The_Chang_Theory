"use client";

import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRef } from "react";
import { ForwardRefEditor } from "./Markdown/ForwardRefEditor";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "../app/mdx-editor-theme.css";
import { Button } from "./ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.any().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content is too long"),
  tags: z.string().optional(),
});

type BlogFormProps = z.infer<typeof formSchema>;

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });
  const editorRef = useRef<MDXEditorMethods>(null);

  const pathName = usePathname();
  console.log("Current Pathname:", pathName);

  const handleFormSubmit = async (data: BlogFormProps) => {
    const markdownContent = editorRef.current?.getMarkdown() || "";

    const imageFile = data.image && data.image[0] ? data.image[0] : undefined;

    const formData = {
      title: data.title,
      image: imageFile,
      content: markdownContent,
      tags: data.tags,
    };

    console.log("Form Data:", formData);
    console.log("Image File:", imageFile);

    alert("Blog post submitted successfully!");
  };

  return (
    <section className="border-2 p-10 rounded-lg shadow-md">
      <h1 className="text-3xl font-sans font-bold ">BlogForm</h1>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-10 grid gap-6"
      >
        <div className="space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter a title for your blog."
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          {errors.image && typeof errors.image.message === "string" && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <Label htmlFor="content">Content</Label>
          <div className="border rounded-md overflow-hidden max-h-[600px] h-[600px]">
            <ForwardRefEditor
              ref={editorRef}
              markdown="# Start writing your blog content here..."
              contentEditableClassName={` max-w-none p-4 `}
              className="h-full"
              onChange={(markdown) => setValue("content", markdown)}
            />
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            type="text"
            placeholder="Enter tags (comma-separated)"
            {...register("tags")}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </section>
  );
};

export default BlogForm;
