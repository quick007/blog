import { globby } from "globby";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface MDXMetaData {
  name: string;
	description: string;
  posted: Date;
	cover: StaticImport;
}

export const readMDXFile = (path: string) => {
  const rawContent = fs.readFileSync(path, "utf-8");
  return serialize(rawContent, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
};

export const getAllPosts = async () => {
  const files = await globby(["./app/posts/**/page.mdx"]);

  const metadataArray = await Promise.all(
    files.map(async (file) => {
      const fileData = await readMDXFile(file);
      const routeMatch = /\.\/app\/posts\/([^\/]+)\/page\.mdx/;
      const date = fileData.frontmatter.posted as string;

      return {
        ...fileData.frontmatter,
        posted: new Date(date),
        route: `/posts/${file.match(routeMatch)![1]}`,
      } as unknown as MDXMetaData; // Assuming each file exports a 'metadata' object
    })
  );

  return metadataArray;
};

export const getPosts = async (options?: {
  limit?: number;
  sortBy?: "date" | "semi-random";
}) => {
  let posts = await getAllPosts();
  if (!options) {
    return posts;
  }

  const { limit, sortBy } = options;
  if (sortBy) {
    posts.sort((a, b) => a.posted.getTime() - b.posted.getTime());
  }
  if (limit) {
    posts = posts.slice(0, limit);
  }
  return posts;
};
