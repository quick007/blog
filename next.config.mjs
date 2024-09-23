/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    // https://nextjs.org/docs/app/building-your-application/configuring/mdx#global-styles-and-components
    mdxRs: true,
  },
};

// Merge MDX config with Next.js config
export default nextConfig;
