// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { IPost } from "@/types";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/posts");
      setPosts(response.data);
    } catch (err) {
      setError("Falha ao carregar os posts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (window.confirm("Você tem certeza que deseja deletar este post?")) {
      try {
        await api.delete(`/posts/${postId}`);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        setError("Falha ao deletar o post.");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard do Administrador</h1>
        <Link href="/admin/posts/create">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Criar Novo Post
          </button>
        </Link>
      </div>

      {loading && <p>Carregando posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Título</th>
              <th className="py-2 px-4 border-b text-left">Autor</th>
              <th className="py-2 px-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b">
                    {post.author?.name || "Desconhecido"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() =>
                        router.push(`/admin/posts/edit/${post._id}`)
                      }
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
