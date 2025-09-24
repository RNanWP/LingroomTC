"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { User, BookOpen, Loader2, AlertCircle } from "lucide-react";
import PostCard from "@/components/PostCard";
import { postsApi } from "@/lib/api";
import { Post } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

const AuthorProfilePage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      if (!authorId) return;

      try {
        setLoading(true);
        setError(null);

        // Obter todas as postagens e filtrar por autor
        const allPosts = (await postsApi.getAllPosts()) as Post[];
        const authorPosts = allPosts.filter(
          (post: Post) => post.author.id === authorId
        );

        setPosts(authorPosts);

        // Define o nome do autor a partir da primeira postagem, se disponível
        if (authorPosts.length > 0) {
          setAuthorName(authorPosts[0].author.name);
        }
      } catch (err: any) {
        setError(err.message || "Falha ao carregar as postagens do autor");
        toast({
          title: "Erro ao carregar postagens",
          description:
            err.message ||
            "Não foi possível carregar as postagens deste autor.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorPosts();
  }, [authorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">
              Carregando perfil do autor...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho do autor */}
      <section className="gradient-hero border-b border-border/40">
        <div className="container py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-balance mb-4">
              {authorName || "Perfil do Autor"}
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore todas as publicações deste autor.
            </p>
          </div>
        </div>
      </section>

      {/* Estatísticas do autor */}
      <section className="container py-8">
        <Card className="gradient-card shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Postagens de {authorName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {posts.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total de Postagens
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {Math.round(
                    posts.reduce((acc, post) => acc + post.content.length, 0) /
                      (posts.length || 1) // Evita divisão por zero
                  ) || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Tamanho médio do conteúdo
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {posts.length > 0
                    ? new Date(posts[0].createdAt).toLocaleDateString("pt-BR", {
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Membro desde
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Postagens */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-1">
            Todas as postagens ({posts.length})
          </h2>
          <p className="text-muted-foreground">
            {posts.length === 1 ? "Postagem" : "Postagens"} de autoria de{" "}
            {authorName}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Nenhuma postagem ainda
            </h3>
            <p className="text-muted-foreground">
              Este autor ainda não publicou nada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AuthorProfilePage;

// front-end/src/app/author/[authorId]/page.tsx

// _____________________________________________________________________________________________________________________;

// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { User, BookOpen, Loader2, AlertCircle, Calendar } from "lucide-react";
// import PostCard from "@/components/PostCard";
// import { postsApi } from "@/lib/api";
// import { Post, User as UserType } from "@/types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { toast } from "@/hooks/use-toast";

// const AuthorProfilePage: React.FC = () => {
//   const { authorId } = useParams<{ authorId: string }>();
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [author, setAuthor] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAuthorData = async () => {
//       if (!authorId) return;

//       try {
//         setLoading(true);
//         setError(null);
//         // Obter todas as postagens e filtrar por autor
//         const allPosts = (await postsApi.getAllPosts()) as Post[];
//         const authorPosts = allPosts.filter(
//           (post: Post) => post.author.id === authorId
//         );

//         setPosts(authorPosts);

//         if (authorPosts.length > 0) {
//           const authorData = authorPosts[0].author;
//           setAuthor({
//             id: authorData.id,
//             name: authorData.name,
//             email: "",
//             role: "professor",
//             createdAt: "2025-01-01T00:00:00Z",
//           });
//         } else {
//           setError("Autor não encontrado ou sem posts.");
//         }
//       } catch (err: any) {
//         setError(err.message || "Falha ao carregar os dados do autor");
//         toast({
//           title: "Erro ao Carregar a Página",
//           description: err.message,
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAuthorData();
//   }, [authorId]);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("pt-BR", {
//       year: "numeric",
//       month: "long",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex justify-center items-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-2">Carregando perfil do autor...</span>
//       </div>
//     );
//   }

//   if (error || !author) {
//     return (
//       <div className="container py-8">
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>
//             {error || "Autor não encontrado."}
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Cabeçalho do Autor */}
//       <section className="gradient-hero border-b border-border/40">
//         <div className="container py-12">
//           <div className="text-center max-w-2xl mx-auto">
//             <div className="flex items-center justify-center mb-6">
//               <User className="h-16 w-16 text-primary" />
//             </div>
//             <h1 className="text-4xl font-heading font-bold text-balance mb-4">
//               {author.name}
//             </h1>
//             <p className="text-xl text-muted-foreground capitalize">
//               {author.role}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Estatísticas do Autor */}
//       <section className="container py-8">
//         <Card className="gradient-card shadow-soft mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <BookOpen className="h-5 w-5 text-primary" />
//               <span>Estatísticas</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//               <div>
//                 <div className="text-3xl font-bold text-primary">
//                   {posts.length}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   Total de Posts
//                 </div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-primary">
//                   {Math.round(
//                     posts.reduce((acc, post) => acc + post.content.length, 0) /
//                       (posts.length || 1)
//                   )}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   Média de Caracteres
//                 </div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-primary">
//                   {author.createdAt ? formatDate(author.createdAt) : "N/A"}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   Membro Desde
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Seção de Postagens */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-heading font-semibold mb-1">
//             Postagens de {author.name} ({posts.length})
//           </h2>
//         </div>

//         {posts.length === 0 ? (
//           <div className="text-center py-12">
//             <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">
//               Nenhum post encontrado
//             </h3>
//             <p className="text-muted-foreground">
//               Este autor ainda não publicou nada.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {posts.map((post) => (
//               <PostCard key={post.id} post={post} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default AuthorProfilePage;
