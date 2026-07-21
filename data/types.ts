export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSource {
  title: string;
  url: string;
  publisher: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  /** ISO date (YYYY-MM-DD) when the article was last substantially updated */
  dateModified?: string;
  author: string;
  tags: string[];
  faq?: BlogFaq[];
  sources?: BlogSource[];
  relatedSlugs?: string[];
}

export interface Author {
  name: string;
  title: string;
  bio: string;
  website?: string;
}
