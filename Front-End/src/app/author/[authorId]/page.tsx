// src/app/author/[authorId]/page.tsx
import Link from "next/link";
import { User, BookOpen, AlertCircle } from "lucide-react";
import PostCard from "@/components/PostCard";
import api from "@/lib/api";
import { IPost } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

async function getAuthorPosts(authorId: string): Promise<IPost[]> {
  try {
 
    const response = await fetch(`${api.defaults.baseURL}/posts`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch posts");

    const allPosts: IPost[] = await response.json();
    return allPosts.filter((post) => post.author?._id === authorId);
  } catch (error) {
    console.error("Error fetching author posts:", error);
    return [];
  }
}

export default async function AuthorProfilePage({
  params,
}: {
  params: { authorId: string };
}) {
  const { authorId } = params;
  const posts = await getAuthorPosts(authorId);

  const authorName =
    posts.length > 0 ? posts[0].author.name : "Autor Desconhecido";

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho do Autor */}
      <section className="border-b border-border/40">
        <div className="container py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-balance mb-4">
              {authorName}
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore todos os posts deste autor
            </p>
          </div>
        </div>
      </section>

      {/* Estatísticas do Autor */}
      <section className="container py-8">
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Posts de {authorName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Cálculos de estatísticas podem continuar aqui, sem mudanças */}
            <div className="text-3xl font-bold text-primary">
              {posts.length}
            </div>
            <div className="text-sm text-muted-foreground">Total de Posts</div>
          </CardContent>
        </Card>

        {/* Seção de Posts */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-1">
            Todos os Posts ({posts.length})
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ainda não há posts</h3>
            <p className="text-muted-foreground">
              Este autor ainda não publicou nada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
