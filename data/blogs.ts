export * from './types';
import { BlogPost } from './types';
import { blogs1 } from './blogs_part1';
import { blogs2 } from './blogs_part2';
import { blogs3 } from './blogs_part3';

/** Only these slugs are published. All other posts stay in data but are disabled. */
export const ENABLED_BLOG_SLUGS = [
  'what-is-the-internet-really',
  'osi-model-explained-top-down',
  'understanding-dns-the-phonebook-of-the-internet',
  'tcp-three-way-handshake-explained',
  'ip-addresses-explained-v4-vs-v6',
] as const;

const allBlogs: BlogPost[] = [...blogs1, ...blogs2, ...blogs3];

export const blogs: BlogPost[] = ENABLED_BLOG_SLUGS.map(
  (slug) => allBlogs.find((blog) => blog.slug === slug)
).filter((blog): blog is BlogPost => Boolean(blog));
