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
          <Link
            className="group relative flex w-72 flex-col"
            key={post.name}
            href={post.route}
          >
            <div className="absolute inset-x-0 -top-2.5 flex">
              <div className="mx-auto flex translate-y-1 select-none justify-center rounded border border-zinc-200/30 bg-zinc-800/75 px-2 text-sm opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="whitespace-nowrap">
                  {simpleDateFormat(post.posted)}
                </p>
              </div>
            </div>
            <Image
              src={post.cover}
              className="aspect-[2/1] w-72 rounded-t-lg object-cover"
              width={400}
              height={200}
              alt={`Cover image for ${post.name}`}
            />
            <div className=""></div>
            <Image
              src={post.cover}
              className="absolute -z-10 aspect-[2/1] w-72 rounded-t-lg object-cover blur-lg brightness-50"
              width={400}
              height={200}
              alt=""
            />
            <div className="grow rounded-b-lg border-x border-b border-zinc-800 bg-zinc-400/5 px-4 pb-2 pt-4">
              <h3 className="truncate font-medium">{post.name}</h3>
              <p className="text-sm text-zinc-400">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="">
        <p>post</p>
      </Link>
    </main>
  );
}
