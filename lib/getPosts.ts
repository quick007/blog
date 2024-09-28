import { globbySync } from "globby";
import fs from "fs";
import path from "path";

export interface MDXMetaData {
  name: string;
  description: string;
  posted: string;
  cover: string;
}

// thanks leerob
// apparently nextjs doesn't like me reading files in an async function, but I didn't feel like reinventing the wheel here again to take out the frontmatter
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<MDXMetaData> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof MDXMetaData] = value;
  });

  return { metadata: metadata as MDXMetaData, content };
}

export const readMDXFile = (path: string) => {
  const rawContent = fs.readFileSync(path, "utf-8");
  return parseFrontmatter(rawContent);
};

export const getAllPosts = () => {
  const files = globbySync(["./app/posts/**/page.mdx"]);

  const metadataArray = files.map((file) => {
    const fileData = readMDXFile(path.join(process.cwd(), file));
    const routeMatch = /\.\/app\/posts\/([^\/]+)\/page\.mdx/;
    const date = fileData.metadata.posted as string;

    return {
      metadata: {
        ...fileData.metadata,
        posted: new Date(date),
      },
      route: `/posts/${file.match(routeMatch)![1]}`,
      content: fileData.content,
    };
  });

  return metadataArray;
};

export const getPosts = (options?: {
  limit?: number;
  sortBy?: "date" | "semi-random";
}) => {
  let posts = getAllPosts();
  if (!options) {
    return posts;
  }

  const { limit, sortBy } = options;
  if (sortBy) {
    posts.sort((a, b) => a.metadata.posted.getTime() - b.metadata.posted.getTime());
  }
  if (limit) {
    posts = posts.slice(0, limit);
  }
  return posts;
};
