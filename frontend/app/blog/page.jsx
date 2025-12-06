"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <section className="pt-32 pb-24 relative overflow-hidden">
         {/* Background Gradients */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Insights & Intelligence
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Navigating the AI revolution with practical guides, deep analysis, and future-forward thinking.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer h-full relative bg-zinc-900/50 border border-white/10 rounded-2xl p-8 hover:bg-zinc-900/80 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                              {post.icon}
                          </div>
                          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider border border-white/5 px-3 py-1 rounded-full">
                              {post.category}
                          </span>
                      </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-zinc-400 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-sm text-zinc-500">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform text-white">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
