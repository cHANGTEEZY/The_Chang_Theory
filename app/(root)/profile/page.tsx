import React from "react";
import { getUserBlogPosts } from "@/app/actions/blog";
import BlogCard from "@/components/blog-card";
import { getUserServerSessionData } from "@/lib/utils/serverUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = async () => {
  const response = await getUserBlogPosts();
  const { user } = (await getUserServerSessionData()) as any;

  return (
    <div className="content-container">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.image} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Blog Posts</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {response.success && response.data && response.data.length > 0 ? (
          response.data.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p className="text-body">You haven't created any blog posts yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
