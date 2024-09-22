// https://nextjs.org/docs/app/building-your-application/configuring/mdx#global-styles-and-components

import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}