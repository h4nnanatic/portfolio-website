"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, ExternalLink, Loader2 } from "lucide-react";

// Behold API response types
interface BeholdPostSize {
  mediaUrl: string;
  height: number;
  width: number;
}

interface BeholdPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  prunedCaption: string;
  timestamp: string;
  mediaType: string;
  sizes: {
    small: BeholdPostSize;
    medium: BeholdPostSize;
    large: BeholdPostSize;
    full: BeholdPostSize;
  };
}

interface BeholdFeed {
  username: string;
  posts: BeholdPost[];
}

interface SocialPost {
  id: string;
  image: string;
  content: string;
  link: string;
  date: string;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Live Behold Feed URL
  const BEHOLD_FEED_URL = "https://feeds.behold.so/CvRjoLNFt4hQS1VJbvdc";

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);

        const response = await fetch(BEHOLD_FEED_URL);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: BeholdFeed = await response.json();

        const formattedPosts: SocialPost[] = data.posts.slice(0, 18).map(p => ({
          id: p.id,
          image: p.sizes?.medium?.mediaUrl || p.mediaUrl,
          content: p.prunedCaption || p.caption || "",
          link: p.permalink,
          date: new Date(p.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Social feed error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="relative z-20 bg-[#0a0a0a] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-sm font-semibold uppercase tracking-wide text-transparent">
              Live Feed
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Instagram Highlights
          </h2>
          <p className="mt-4 max-w-2xl text-gray-400">
            Latest posts from my Instagram, updated automatically.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        ) : error ? (
          <div className="text-center py-20 border border-dashed border-emerald-500/10 rounded-3xl">
            <p className="text-gray-500 italic">Could not load the feed. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] transition-all hover:border-emerald-500/20 hover:bg-white/[0.02]"
              >
                <div className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Instagram className="h-3 w-3 text-emerald-400" />
                    Instagram
                  </div>
                </div>

                <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt="Instagram post"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                      <span className="text-4xl opacity-20">📸</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-300">
                    {post.content}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{post.date}</span>
                    <span className="text-[10px] text-emerald-500/70 font-semibold tracking-widest uppercase">View Post</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
