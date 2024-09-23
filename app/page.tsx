import { simpleDateFormat } from "@/lib/formatDate";
import { getPosts } from "@/lib/getPosts";
import Image from "next/image";
import Link from "next/link";

export const revalidate = false;

export default async function Home() {
  const posts = await getPosts({ limit: 3, sortBy: "date" });

  return (
    <main className="flex flex-col items-center">
      <h1>Home</h1>
      <h2>Recent Posts</h2>
      <div className="grid grid-cols-3 gap-8">
        {posts.map((post) => (
          <div className="flex flex-col relative overflow-clip w-72" key={post.name}>
            <Image
              src={post.cover}
              className="aspect-[2/1] object-cover w-72 rounded-t-lg"
              width={400}
              height={200}
              alt={`Cover image for ${post.name}`}
            />
            <Image
              src={post.cover}
              className="aspect-[2/1] object-cover w-72 rounded-t-lg absolute -z-10 blur-lg"
              width={400}
              height={200}
              alt=""
            />
            <div className="grow border-b border-x rounded-b-lg border-zinc-800 pt-6 px-4 pb-2 bg-zinc-400/5">
              <h3 className="font-medium truncate">{post.name}</h3>
              <p className="text-xs text-zinc-500">
                {simpleDateFormat(post.posted)}
              </p>
              <p className="mt-4 text-zinc-300">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link href="">
        <p>post</p>
      </Link>
    </main>
  );
}
