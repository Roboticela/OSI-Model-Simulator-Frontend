import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authors } from '@/data/authors';
import { blogs } from '@/data/blogs';
import { APP_URL } from '@/lib/appLinks';
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react';

const BASE_URL = 'https://osi-model-simulator.roboticela.com';
const author = authors[0];

export const metadata: Metadata = {
  title: `${author.name} – Author | OSI Model Simulator`,
  description: author.bio.slice(0, 160),
  authors: [{ name: author.name, url: '/author' }],
  alternates: {
    canonical: '/author',
  },
  openGraph: {
    title: author.name,
    description: author.title,
    type: 'profile',
    url: '/author',
    siteName: 'OSI Model Simulator',
  },
};

export default function AuthorPage() {
  const posts = blogs
    .filter((blog) => blog.author === author.name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `${BASE_URL}/author`,
    sameAs: author.website ? [author.website] : [],
    knowsAbout: [
      'OSI model',
      'TCP/IP',
      'Computer networking education',
      'Network protocols',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Roboticela',
      url: 'https://roboticela.com',
    },
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full flex flex-col">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main className="flex-grow pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-6 md:p-12 mb-10">
            <p className="text-sm uppercase tracking-wide text-foreground/50 mb-2">Author</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">{author.name}</h1>
            <p className="text-lg md:text-xl text-primary font-medium mb-6">{author.title}</p>
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">{author.bio}</p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {author.website.replace(/^https?:\/\//, '')} <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                OSI Model Simulator <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          <section aria-labelledby="author-articles-heading">
            <h2 id="author-articles-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Articles by {author.name}
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="block p-5 md:p-6 rounded-2xl border border-border/40 bg-card/40 hover:bg-card/60 transition-colors group"
                >
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-foreground/70 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-foreground/50">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.dateModified ?? post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-primary font-medium">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
