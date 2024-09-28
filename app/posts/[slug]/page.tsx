import { simpleDateFormat } from "@/lib/formatDate";
import { getAllPosts } from "@/lib/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.route,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  // This might have an issue if we have posts with similar names, but oh well. If it becomes an issue I'll use regex or split
  const post = getAllPosts().find((post) => post.route.endsWith(params.slug));

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

  return (
    <div className="">
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {metadata.name}
      </h1>
      <div className="mb-8 mt-2 flex items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {simpleDateFormat(metadata.posted)}
        </p>
      </div>
      <article className="prose prose-zinc prose-invert">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
