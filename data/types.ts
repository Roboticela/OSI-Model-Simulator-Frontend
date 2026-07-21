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
