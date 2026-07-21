'use client';

import { Suspense, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogs } from '@/data/blogs';
import { getAuthorByName } from '@/data/authors';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

const POSTS_PER_PAGE = 30;

function BlogsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);

  const deferredSearch = useDeferredValue(searchTerm);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') ?? '');
  }, [searchParams]);

  const updateSearchUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set('search', value.trim());
      } else {
        params.delete('search');
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const filteredBlogs = useMemo(
    () =>
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(deferredSearch.toLowerCase())
          )
      ),
    [deferredSearch]
  );

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden w-full max-w-full flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              OSI Model Insights
            </h1>
            <motion.p
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Explore our latest articles, deep dives, and tutorials on the OSI Model and computer networking.
            </motion.p>

            <motion.div
              className="relative max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-foreground/50" />
              </div>
              <input
                type="text"
                id="blog-search"
                aria-label="Search articles"
                className="w-full pl-12 pr-4 py-4 bg-card/40 backdrop-blur-md border border-border/40 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Search articles by title or tag..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  setCurrentPage(1);
                  updateSearchUrl(value);
                }}
              />
            </motion.div>
          </div>

          {currentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog, index) => {
                const author = getAuthorByName(blog.author);
                return (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl overflow-hidden hover:bg-card/60 transition-all flex flex-col h-full group"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blogs/${blog.slug}`}>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                      </Link>
                      <p className="text-foreground/70 mb-6 line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-foreground/60 pt-4 border-t border-border/20 mt-auto">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                          {author ? (
                            <Link
                              href="/author"
                              className="hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {blog.author}
                            </Link>
                          ) : (
                            blog.author
                          )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-6 mt-auto">
                      <Link href={`/blogs/${blog.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-foreground/60">
              <p className="text-xl">No articles found matching your search.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-card/40 border border-border/40 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card/60 transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary text-background border-primary'
                        : 'bg-card/40 border-border/40 text-foreground hover:bg-card/60'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-card/40 border border-border/40 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card/60 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-foreground/60">
          Loading articles…
        </div>
      }
    >
      <BlogsPageContent />
    </Suspense>
  );
}
