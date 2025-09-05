"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api.ts";
import { IPost } from "@/types";

export default function HomePage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const endpoint = searchTerm
          ? `/posts/search?q=${searchTerm}`
          : "/posts";
        const response = await api.get(endpoint);
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const searchTimeout = setTimeout(() => {
      fetchPosts();
    }, 500); // Debounce search to avoid too many requests

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading &&
          posts.map((post) => (
            <div key={post._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">by {post.author}</p>
              <p className="mt-2">{post.content.substring(0, 100)}...</p>
              {/* Link to the post detail page */}
            </div>
          ))}
      </div>
    </div>
  );
}
