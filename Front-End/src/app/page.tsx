// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { IPost } from "@/types";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const endpoint = query ? `/posts/search?q=${query}` : "/posts";
        const response = await api.get(endpoint);
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError("Falha ao carregar os posts. Verifique a conexão com a API.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-center py-12">Carregando...</p>}
      {error && <p className="text-red-500 text-center py-12">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="col-span-full text-center py-12 text-muted-foreground">
              Nenhum post encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
