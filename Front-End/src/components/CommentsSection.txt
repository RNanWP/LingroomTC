// src/components/CommentsSection.tsx
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { IComment } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface CommentsSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await api.post(`/posts/${postId}/comments`, { content: newComment });
      setNewComment("");
      fetchComments(); // Recarrega os comentários após adicionar um novo
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentários</h2>

      {isAuthenticated && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Deixe seu comentário..."
            className="w-full p-2 border rounded mb-2 text-black"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Enviar Comentário
          </button>
        </form>
      )}

      {loading ? (
        <p>Carregando comentários...</p>
      ) : (
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <p className="font-semibold text-gray-800">
                  {comment.author?.name || "Usuário"}
                </p>
                <p className="text-gray-700 mt-1">{comment.content}</p>
              </div>
            ))
          ) : (
            <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          )}
        </div>
      )}
    </div>
  );
}
