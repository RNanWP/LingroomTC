// src/app/posts/[id]/page.tsx
import api from "@/lib/api";
import { IPost, IComment } from "@/types";
import Link from "next/link";
import CommentsSection from "@/components/CommentsSection";

async function getPost(id: string): Promise<IPost | null> {
  try {
    const response = await fetch(`${api.defaults.baseURL}/posts/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  if (!post) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold">Post Não Encontrado</h1>
        <Link
          href="/"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Voltar para a Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Imagem do post */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
      )}

      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        by {post.author?.name || "Autor desconhecido"}
      </p>

      <div className="prose lg:prose-xl max-w-none">{post.content}</div>

      <hr className="my-8" />

      <CommentsSection postId={post._id} />
    </div>
  );
}
