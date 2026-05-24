import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogs } from '@/data/blogs';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

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

  // Truncate title to <= 60 chars (leaves room for " | OSI Blog" suffix = 11 chars → ~71 total)
  const rawTitle = blog.title;
  const seoTitle =
    rawTitle.length <= 55
      ? `${rawTitle} | OSI Blog`
      : `${rawTitle.substring(0, 55).trimEnd()}… | OSI Blog`;

  // Build a rich description >100 chars
  const baseDesc = blog.excerpt;
  const description =
    baseDesc.length >= 120
      ? baseDesc
      : `${baseDesc} Covering topics: ${blog.tags.join(', ')}. A detailed guide from OSI Model Simulator.`;

  return {
    title: seoTitle,
    description,
    authors: [{ name: blog.author }],
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: rawTitle,
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

  // A very simple markdown to HTML parser for the blog content
  // In a real production environment, you might use a library like 'marked' or 'react-markdown'
  const parseContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">{trimmedLine.substring(4)}</h3>;
      } else if (trimmedLine.startsWith('## ')) {
        return <h2 key={i} className="text-3xl font-bold text-foreground mt-10 mb-6">{trimmedLine.substring(3)}</h2>;
      } else if (trimmedLine.startsWith('# ')) {
        return <h2 key={i} className="text-4xl font-bold text-foreground mt-12 mb-6">{trimmedLine.substring(2)}</h2>;
      } else if (trimmedLine.startsWith('- ')) {
        return <li key={i} className="ml-6 list-disc my-2 text-foreground/80">{trimmedLine.substring(2)}</li>;
      } else if (trimmedLine === '') {
        return <div key={i} className="h-4"></div>;
      }
      
      // Replace bold text within lines
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="my-4 text-foreground/80 leading-relaxed text-lg">
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          {/* Article Header */}
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
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Article Content */}
            <div className="max-w-none text-foreground/90">
              {parseContent(blog.content)}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
