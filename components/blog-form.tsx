"use client";

import { useForm, Controller } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { updateBlogPost, createBlogPost } from "@/app/actions/blog";
import { toast } from "sonner";
import { MultiSelect } from "./multiselect";
import { tagsList } from "@/lib/constants";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content is too long"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().optional().default(false),
});

export type BlogFormProps = z.infer<typeof formSchema>;

interface BlogFormComponentProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    tags: string;
    published: boolean;
  };
  onSuccess?: () => void;
}

const BlogForm = ({ initialData, onSuccess }: BlogFormComponentProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormProps>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      tags: initialData?.tags
        ? initialData.tags.split(",").map((t) => t.trim())
        : [],
      published: initialData?.published || false,
    },
  });
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleFormSubmit = async (data: BlogFormProps) => {
    const markdownContent = editorRef.current?.getMarkdown() || "";

    const formData = {
      title: data.title,
      content: markdownContent,
      tags: data.tags.join(","),
      published: data.published,
    };

    let response;

    if (initialData) {
      response = await updateBlogPost({ ...formData, id: initialData.id });
    } else {
      response = await createBlogPost(formData);
    }

    if (!response.success) {
      return toast.error(
        response.error || "Failed processing blog post. Please try again later"
      );
    }

    toast.success(
      `Blog post ${initialData ? "updated" : "created"} successfully`
    );
    if (onSuccess) onSuccess();
  };

  return (
    <section className="border-2 p-10 rounded-lg shadow-md">
      <h1 className="text-3xl font-sans font-bold ">
        {initialData ? "Edit Blog Post" : "Create Blog Post"}
      </h1>

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
          <Label htmlFor="content">Content</Label>
          <p className="text-sm text-muted-foreground">
            Use the formatting buttons above the editor to format your text. The
            editor will automatically format as you type (e.g., type # for
            heading).
          </p>
          <div className="border rounded-md overflow-hidden max-h-[600px] h-[600px]">
            <ForwardRefEditor
              ref={editorRef}
              markdown={
                initialData?.content ||
                "# Start writing your blog content here...\n\nUse the formatting toolbar or markdown shortcuts like:\n- # for headings\n- ** for bold\n- * for italic\n- - for lists"
              }
              contentEditableClassName={` max-w-none p-4 `}
              className="h-full"
              onChange={(markdown) => {
                setValue("content", markdown);
              }}
            />
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div className="space-y-4">
          <Label htmlFor="tags">Tags</Label>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <MultiSelect
                options={tagsList}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder="Select tags"
                variant="inverted"
                animation={2}
                maxCount={3}
              />
            )}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="published"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label htmlFor="published">Publish</Label>
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
