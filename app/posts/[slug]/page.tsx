import { simpleDateFormat } from "@/lib/formatDate";
import { getAllPosts } from "@/lib/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.route,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  // This might have an issue if we have posts with similar names, but oh well. If it becomes an issue I'll use regex or split
  const post = (await getAllPosts()).find((post) =>
    post.route.endsWith(params.slug),
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="">
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {post.name}
      </h1>
      <div className="mb-8 mt-2 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {simpleDateFormat(post.posted)}
        </p>
      </div>
      <article className="prose">
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
}
