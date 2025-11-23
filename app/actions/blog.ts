"use server";

import { pool as pg } from "@/lib/auth";
import { getUserServerSessionData } from "@/lib/utils/serverUser";

interface CreatePostParams {
  title: string;
  content: string;
  tags: string;
  published?: boolean;
}

export const createBlogPost = async (data: CreatePostParams) => {


  let client;

  const { session, user } = (await getUserServerSessionData()) as any;

  if (!session) {
    return { success: false, status: 401, error: "Unauthorized" };
  }


  try {
    const { title, content, tags, published = false } = data;

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    client = await pg.connect();

    const result = await client.query(
      'INSERT INTO "post" (title, content, slug, tags, "userId", published) VALUES ($1, $2, $3, $4, $5, $6)',
      [title, content, slug, tags, user.id, published]
    );


    if (result.rowCount === 0) {
      return {
        success: false,
        status: 400,
        error: "Failed creating blog post. Please try again later",
      };
    }
    return {
      success: true,
      status: 201,
      message: "Blog post created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : " Failed creating blog post. Please try again later" + error,
    };
  } finally {
    client?.release();
  }
};

export const getUserBlogPosts = async () => {
  let client;
  const { session, user } = (await getUserServerSessionData()) as any;

  if (!session) {
    return { success: false, status: 401, error: "Unauthorized" };
  }

  try {
    client = await pg.connect();
    const result = await client.query(
      'SELECT * FROM "post" WHERE "userId" = $1 ORDER BY "createdAt" DESC',
      [user.id]
    );
    return { success: true, status: 200, data: result.rows };
  } catch (error) {
    return { success: false, status: 500, error: "Failed fetching blog posts" };
  } finally {
    client?.release();
  }
};

interface UpdatePostParams {
  id: string;
  title: string;
  content: string;
  tags: string;
  published: boolean;
}

export const updateBlogPost = async (data: UpdatePostParams) => {
  let client;
  const { session, user } = (await getUserServerSessionData()) as any;

  if (!session) {
    return { success: false, status: 401, error: "Unauthorized" };
  }

  try {
    const { id, title, content, tags, published } = data;
    client = await pg.connect();

    // Verify ownership
    const check = await client.query(
      'SELECT * FROM "post" WHERE id = $1 AND "userId" = $2',
      [id, user.id]
    );
    if (check.rowCount === 0) {
      return {
        success: false,
        status: 403,
        error: "Unauthorized or post not found",
      };
    }

    const result = await client.query(
      'UPDATE "post" SET title = $1, content = $2, tags = $3, published = $4, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $5',
      [title, content, tags, published, id]
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        status: 400,
        error: "Failed updating blog post",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Blog post updated successfully",
    };
  } catch (error) {
    return { success: false, status: 500, error: "Failed updating blog post" };
  } finally {
    client?.release();
  }
};

export const getAllPublishedBlogPost = async () => {
  let client;

  try {
    client = await pg.connect();

    const result = await client.query(
      'SELECT * FROM "post" WHERE published = true'
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        status: 400,
        error: "Failed fetching blog post. Please try again later",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Blog post fetched successfully.",
      data: result.rows,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : " Failed fetching blog post. Please try again later" + error,
    };
  } finally {
    client?.release();
  }
};

export const getBlogPostById = async ({ id }: { id: string }) => {
  let client;

  try {
    client = await pg.connect();

    const result = await client.query('SELECT * FROM "post" WHERE id = $1', [
      id,
    ]);

    if (result.rowCount === 0) {
      return {
        success: false,
        status: 400,
        error: "Failed fetching blog post. Please try again later",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Blog post fetched successfully.",
      data: result.rows[0],
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : " Failed fetching blog post. Please try again later" + error,
    };
  } finally {
    client?.release();
  }
};

export const getBlogPostBySlug = async ({ slug }: { slug: string }) => {

  let client;

  try {
    client = await pg.connect();

    const result = await client.query('SELECT * FROM "post" WHERE slug = $1', [
      slug,
    ]);


    if (result.rowCount === 0) {
      return {
        success: false,
        status: 400,
        error: "Failed fetching blog post. Please try again later",
      };
    }

    const post = result.rows[0];

    return {
      success: true,
      status: 200,
      message: "Blog post fetched successfully.",
      data: result.rows[0],
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : " Failed fetching blog post. Please try again later" + error,
    };
  } finally {
    client?.release();
  }
};

export const publishBlogPostById = async ({ id }: { id: string }) => {
  let client;

  const { session, user } = (await getUserServerSessionData()) as any;

  if (!session) {
    return { success: false, status: 401, error: "Unauthorized" };
  }

  try {
    client = await pg.connect();

    const result = await client.query(
      'UPDATE "post" SET published = true WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        status: 400,
        error: "Failed publishing blog post. Please try again later",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Blog post published successfully.",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : " Failed publishing blog post. Please try again later" + error,
    };
  } finally {
    client?.release();
  }
};
