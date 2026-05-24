export * from './types';
import { BlogPost } from './types';
import { blogs1 } from './blogs_part1';
import { blogs2 } from './blogs_part2';
import { blogs3 } from './blogs_part3';

export const blogs: BlogPost[] = [...blogs1, ...blogs2, ...blogs3];
