// src/app/admin/posts/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { IPost } from "@/types";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<IPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await api.get(`/posts/${id}`);
          const postData = response.data;
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
          setImageUrl(postData.imageUrl || "");
        } catch (err) {
          setError("Não foi possível carregar o post para edição.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.put(`/posts/${id}`, { title, content, imageUrl });
      router.push("/admin");
    } catch (err) {
      setError("Falha ao atualizar o post. Tente novamente.");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Carregando...</p>;
  }

  if (!post) {
    return (
      <p className="text-center mt-8 text-red-500">
        {error || "Post não encontrado."}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Editar Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">URL da Imagem (Opcional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Conteúdo</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={10}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
