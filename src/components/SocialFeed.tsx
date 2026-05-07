"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, ExternalLink, MessageSquare, Heart, Loader2 } from "lucide-react";
import Image from "next/image";

// Behold API response type
interface BeholdPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
  media_type: string;
}

interface SocialPost {
  id: string;
  platform: "instagram" | "linkedin";
  image?: string;
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
        // We only fetch if the URL is updated from placeholder
        if (BEHOLD_FEED_URL.includes("YOUR_FEED_ID")) {
          // Using mock data until user provides real URL
          setPosts([
            {
              id: "m1",
              platform: "instagram",
              content: "Pehla post placeholder hai. Jab aap Behold URL dalenge toh real posts yahan aa jayengi!",
              link: "https://instagram.com",
              date: "Just now"
            }
          ]);
          setLoading(false);
          return;
        }

        const response = await fetch(BEHOLD_FEED_URL);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: BeholdPost[] = await response.json();
        
        // Increased limit to 18 to show more previous posts
        const formattedPosts: SocialPost[] = data.slice(0, 18).map(p => ({
          id: p.id,
          platform: "instagram",
          image: p.media_url,
          content: p.caption || "View on Instagram",
          link: p.permalink,
          date: new Date(p.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
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
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-sm font-semibold uppercase tracking-wide text-transparent">
                Live Feed
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Social Highlights
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">
              Mera Instagram feed jo ab automated hai. Jo bhi main post krunga woh yahan show hoga.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://instagram.com/hannan_rasool" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/hannanrasool"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        ) : error ? (
          <div className="text-center py-20 border border-dashed border-emerald-500/10 rounded-3xl">
            <p className="text-gray-500 italic">Feed load nahi ho saka. Behold URL check krein.</p>
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
                      alt="Social post" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
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

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-6">Social media pr mazeed updates ke liye:</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a
              href="https://instagram.com/hannan_rasool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30"
            >
              Follow on Instagram
            </a>
            <a
              href="https://linkedin.com/in/hannanrasool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30"
            >
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
