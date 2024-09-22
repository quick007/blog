import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // experimental: {
  //   turbo: {
  //     resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", "md"],
  //   },
  // },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
