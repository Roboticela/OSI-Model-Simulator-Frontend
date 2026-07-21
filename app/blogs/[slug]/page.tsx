import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogFaqAccordion from '@/components/BlogFaq';
import { blogs } from '@/data/blogs';
import { getAuthorByName } from '@/data/authors';
import { APP_URL } from '@/lib/appLinks';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, ExternalLink, List, User } from 'lucide-react';
import type { ReactNode } from 'react';

const BASE_URL = 'https://osi-model-simulator.roboticela.com';

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractToc(content: string) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('## ') && !line.startsWith('### '))
    .map((line) => {
      const text = line.replace(/^##\s+/, '');
      return { text, id: slugifyHeading(text) };
    });
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith('/');
      if (isInternal) {
        return (
          <Link key={key} href={href} className="text-primary font-medium underline underline-offset-2 hover:text-primary/80">
            {label}
          </Link>
        );
      }
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline underline-offset-2 hover:text-primary/80"
        >
          {label}
        </a>
      );
    }
    return part;
  });
}

function parseContent(content: string) {
  return content.split('\n').map((line, i) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('### ')) {
      const text = trimmedLine.substring(4);
      return (
        <h3 key={i} id={slugifyHeading(text)} className="text-2xl font-bold text-foreground mt-8 mb-4 scroll-mt-28">
          {renderInline(text, `h3-${i}`)}
        </h3>
      );
    }
    if (trimmedLine.startsWith('## ')) {
      const text = trimmedLine.substring(3);
      return (
        <h2 key={i} id={slugifyHeading(text)} className="text-3xl font-bold text-foreground mt-10 mb-6 scroll-mt-28">
          {renderInline(text, `h2-${i}`)}
        </h2>
      );
    }
    if (trimmedLine.startsWith('# ')) {
      const text = trimmedLine.substring(2);
      return (
        <h2 key={i} id={slugifyHeading(text)} className="text-4xl font-bold text-foreground mt-12 mb-6 scroll-mt-28">
          {renderInline(text, `h1-${i}`)}
        </h2>
      );
    }
    if (trimmedLine.startsWith('- ')) {
      return (
        <li key={i} className="ml-6 list-disc my-2 text-foreground/80 text-lg leading-relaxed">
          {renderInline(trimmedLine.substring(2), `li-${i}`)}
        </li>
      );
    }
    if (trimmedLine === '') {
      return <div key={i} className="h-4" />;
    }

    return (
      <p key={i} className="my-4 text-foreground/80 leading-relaxed text-lg">
        {renderInline(line, `p-${i}`)}
      </p>
    );
  });
}

function getRelatedPosts(blog: (typeof blogs)[number]) {
  if (blog.relatedSlugs?.length) {
    return blog.relatedSlugs
      .map((slug) => blogs.find((b) => b.slug === slug))
      .filter((b): b is (typeof blogs)[number] => Boolean(b) && b.slug !== blog.slug)
      .slice(0, 6);
  }

  return blogs
    .filter(
      (b) =>
        b.slug !== blog.slug &&
        b.tags.some((tag) => blog.tags.includes(tag))
    )
    .slice(0, 4);
}

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    return {
      title: 'Article Not Found – OSI Model Simulator Blog',
      description: 'The requested article could not be found. Browse our full collection of networking and OSI model articles.',
    };
  }

  const author = getAuthorByName(blog.author);
  const seoTitle =
    blog.title.length <= 55
      ? `${blog.title} | OSI Blog`
      : `${blog.title.substring(0, 55).trimEnd()}… | OSI Blog`;

  const description =
    blog.excerpt.length >= 120
      ? blog.excerpt
      : `${blog.excerpt} Topics covered: ${blog.tags.join(', ')}. A detailed networking guide from OSI Model Simulator.`;

  return {
    title: seoTitle,
    description,
    authors: author?.website
      ? [{ name: author.name, url: author.website }]
      : [{ name: blog.author }],
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `/blogs/${blog.slug}`,
      publishedTime: new Date(blog.date).toISOString(),
      tags: blog.tags,
      siteName: 'OSI Model Simulator',
    },
    twitter: {
      card: 'summary',
      title: seoTitle,
      description: blog.excerpt,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const author = getAuthorByName(blog.author);
  const toc = extractToc(blog.content);
  const relatedPosts = getRelatedPosts(blog);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    author: {
      '@type': 'Person',
      name: blog.author,
      ...(author
        ? {
            ...(author.website ? { url: author.website } : {}),
            jobTitle: author.title,
          }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Roboticela',
      url: 'https://roboticela.com',
    },
    datePublished: new Date(blog.date).toISOString(),
    dateModified: new Date(blog.date).toISOString(),
    url: `${BASE_URL}/blogs/${blog.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blogs/${blog.slug}`,
    },
    keywords: blog.tags.join(', '),
    articleSection: 'Networking',
    inLanguage: 'en-US',
  };

  const faqSchema =
    blog.faq && blog.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: blog.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="flex-grow pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          <article className="bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-6 md:p-12 mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-foreground/60 pb-8 border-b border-border/40 mb-8">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {author?.website ? (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {blog.author}
                  </a>
                ) : (
                  blog.author
                )}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {author && (
              <div className="mb-8 p-5 rounded-2xl border border-border/40 bg-background/50">
                <p className="text-sm uppercase tracking-wide text-foreground/50 mb-1">Written by</p>
                {author.website ? (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {author.name}
                  </a>
                ) : (
                  <p className="text-lg font-semibold text-foreground">{author.name}</p>
                )}
                <p className="text-foreground/70 mt-1">{author.title}</p>
              </div>
            )}

            {toc.length > 0 && (
              <nav aria-label="Table of contents" className="mb-10 p-5 md:p-6 rounded-2xl border border-border/40 bg-background/50">
                <div className="flex items-center gap-2 mb-4 text-foreground font-semibold">
                  <List className="w-5 h-5" />
                  Table of contents
                </div>
                <ol className="space-y-2 list-decimal list-inside">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-primary hover:text-primary/80 underline-offset-2 hover:underline">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="max-w-none text-foreground/90">
              {parseContent(blog.content)}
            </div>

            <div className="mt-12 p-6 rounded-2xl border border-primary/30 bg-primary/5">
              <div className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Try it in the simulator</h2>
                  <p className="text-foreground/70 mb-4">
                    See how packets move through the OSI layers — including Layer 3 (Network) concepts like IP addressing — in the interactive OSI Model Simulator.
                  </p>
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Open OSI Model Simulator <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {blog.faq && blog.faq.length > 0 && (
              <section className="mt-12 pt-10 border-t border-border/40" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-3xl font-bold text-foreground mb-6">
                  Frequently asked questions
                </h2>
                <BlogFaqAccordion items={blog.faq} />
              </section>
            )}

            {blog.sources && blog.sources.length > 0 && (
              <section className="mt-12 pt-10 border-t border-border/40" aria-labelledby="sources-heading">
                <h2 id="sources-heading" className="text-3xl font-bold text-foreground mb-4">
                  Sources & references
                </h2>
                <p className="text-foreground/70 mb-6">
                  Authoritative specifications and reference material cited or used to ground this article.
                </p>
                <ol className="space-y-3 list-decimal list-inside">
                  {blog.sources.map((source) => (
                    <li key={source.url} className="text-foreground/80 leading-relaxed">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium underline underline-offset-2 hover:text-primary/80"
                      >
                        {source.title}
                      </a>
                      <span className="text-foreground/50"> — {source.publisher}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          {relatedPosts.length > 0 && (
            <section className="mb-8" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Related articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="block p-5 rounded-2xl border border-border/40 bg-card/40 hover:bg-card/60 transition-colors group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-2 mb-3">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
