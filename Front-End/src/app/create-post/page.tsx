"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { postsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Post } from "@/types";
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user || (user.role !== "professor" && user.role !== "administrador")) {
      router.push("/");
    }
  }, [user, router]);

  const handleImageSelected = (url: string) => {
    setImageUrl(url);
    toast({
      title: "Imagem Adicionada",
      description: "A URL da imagem foi vinculada ao post.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha o título e o conteúdo.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const newPost = (await postsApi.createPost(
        title.trim(),
        content.trim(),
        imageUrl.trim()
      )) as Post;

      toast({
        title: "Post Criado com Sucesso!",
        description: "Seu post foi publicado no LingroomTC.",
      });

      if (newPost && newPost.id) {
        router.push(`/posts/${newPost.id}`);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Falha ao Criar o Post",
        description: error.message || "Não foi possível criar o post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (
        window.confirm("Você tem certeza que deseja descartar suas alterações?")
      ) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  if (!user || (user.role !== "professor" && user.role !== "administrador")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background gradient-hero">
      <div className="container py-8 max-w-4xl">
        <Card className="gradient-card shadow-strong">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-heading">
                  Criar Novo Post
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Compartilhe seu conhecimento com a comunidade LingroomTC
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos de Título e Conteúdo */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Título do Post
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Digite um título cativante para seu post..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  className="text-lg h-12"
                  maxLength={200}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-medium">
                  Conteúdo do Post
                </Label>
                <Textarea
                  id="content"
                  placeholder="Escreva o conteúdo do seu post aqui..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                  className="min-h-[400px] text-base leading-relaxed"
                  maxLength={10000}
                />
              </div>

              {/* Seção de Imagem (Thumbnail Pequeno) */}
              <div className="space-y-2">
                <Label>Imagem do Post</Label>
                {imageUrl ? (
                  <div className="relative w-56 h-32">
                    <Image
                      src={imageUrl}
                      alt="Pré-visualização da imagem do post"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setImageUrl("")}
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <ImageUpload
                    onImageSelect={handleImageSelected}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                )}
              </div>

              {/* --- BLOCO DE PRÉ-VISUALIZAÇÃO REINSERIDO --- */}
              {(title.trim() || content.trim() || imageUrl) && (
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Pré-visualização
                  </Label>
                  <div className="space-y-4 rounded-lg border-2 border-dashed border-border p-4">
                    {imageUrl && (
                      <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt="Pré-visualização da imagem do post"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    {(title.trim() || content.trim()) && (
                      <div className="pt-4">
                        {title.trim() && (
                          <h3 className="text-xl font-heading font-semibold mb-3">
                            {title}
                          </h3>
                        )}
                        {content.trim() && (
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {content.length > 300
                              ? content.substring(0, 300) + "..."
                              : content}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* --- FIM DO BLOCO DE PRÉ-VISUALIZAÇÃO --- */}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={loading || !title.trim() || !content.trim()}
                  className="gradient-primary"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Publicar Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="mt-6 gradient-card shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold mb-3">
              Dicas de Escrita
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use títulos claros e descritivos.</li>
              <li>• Estruture seu conteúdo com parágrafos.</li>
              <li>
                • Adicione imagens relevantes para ilustrar seus pontos e
                envolver os leitores
              </li>
              <li>• Inclua exemplos do mundo real.</li>
              <li>• Revise seu conteúdo antes de publicar.</li>
              <li>• Interaja com os comentários.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePostPage;

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Save, Loader2, BookOpen } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import { postsApi } from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { Post } from "@/types";
// import ImageUpload from "@/components/ImageUpload";
// import Image from "next/image";

// const CreatePostPage: React.FC = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { user } = useAuth();
//   const router = useRouter();

//   React.useEffect(() => {
//     if (!user || (user.role !== "professor" && user.role !== "administrador")) {
//       router.push("/");
//     }
//   }, [user, router]);

//   const handleImageSelected = (url: string) => {
//     setImageUrl(url);
//     toast({
//       title: "Imagem Adicionada",
//       description: "A URL da imagem foi vinculada ao post.",
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title.trim() || !content.trim()) {
//       toast({
//         title: "Erro de Validação",
//         description: "Por favor, preencha o título e o conteúdo.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const newPost = (await postsApi.createPost(
//         title.trim(),
//         content.trim(),
//         imageUrl.trim()
//       )) as Post;

//       toast({
//         title: "Post Criado com Sucesso!",
//         description: "Seu post foi publicado no LingroomTC.",
//       });

//       if (newPost && newPost.id) {
//         router.push(`/posts/${newPost.id}`);
//       } else {
//         router.push("/");
//       }
//     } catch (error: any) {
//       toast({
//         title: "Falha ao Criar o Post",
//         description: error.message || "Não foi possível criar o post.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (title.trim() || content.trim()) {
//       if (
//         window.confirm("Você tem certeza que deseja descartar suas alterações?")
//       ) {
//         router.push("/");
//       }
//     } else {
//       router.push("/");
//     }
//   };

//   if (!user || (user.role !== "professor" && user.role !== "administrador")) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background gradient-hero">
//       <div className="container py-8 max-w-4xl">
//         <Card className="gradient-card shadow-strong">
//           <CardHeader>
//             <div className="flex items-center space-x-3">
//               <BookOpen className="h-8 w-8 text-primary" />
//               <div>
//                 <CardTitle className="text-2xl font-heading">
//                   Criar Novo Post
//                 </CardTitle>
//                 <p className="text-muted-foreground mt-1">
//                   Compartilhe seu conhecimento com a comunidade LingroomTC
//                 </p>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="title" className="text-base font-medium">
//                   Título do Post
//                 </Label>
//                 <Input
//                   id="title"
//                   type="text"
//                   placeholder="Digite um título cativante para seu post..."
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   disabled={loading}
//                   className="text-lg h-12"
//                   maxLength={200}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="content" className="text-base font-medium">
//                   Conteúdo do Post
//                 </Label>
//                 <Textarea
//                   id="content"
//                   placeholder="Escreva o conteúdo do seu post aqui..."
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   disabled={loading}
//                   className="min-h-[400px] text-base leading-relaxed"
//                   maxLength={10000}
//                 />
//               </div>

//               {/* Seção de Imagem */}
//               <div className="space-y-2">
//                 <Label>Imagem do Post</Label>
//                 {imageUrl ? (
//                   <div className="relative w-full h-64">
//                     <Image
//                       src={imageUrl}
//                       alt="Pré-visualização da imagem do post"
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-md border"
//                     />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute top-2 right-2"
//                       onClick={() => setImageUrl("")}
//                     >
//                       Remover
//                     </Button>
//                   </div>
//                 ) : (
//                   <ImageUpload
//                     onImageSelect={handleImageSelected}
//                     imageUrl={imageUrl}
//                     setImageUrl={setImageUrl}
//                   />
//                 )}
//               </div>

//               {/* BLOCO DE PRÉ-VISUALIZAÇÃO */}
//               {(title.trim() || content.trim() || imageUrl) && (
//                 <div className="space-y-2">
//                   <Label className="text-base font-medium">
//                     Pré-visualização
//                   </Label>
//                   <div className="space-y-4 rounded-lg border-2 border-dashed border-border p-4">
//                     {imageUrl && (
//                       <div className="relative w-full aspect-video rounded-md overflow-hidden">
//                         <Image
//                           src={imageUrl}
//                           alt="Pré-visualização da imagem do post"
//                           layout="fill"
//                           objectFit="cover"
//                         />
//                       </div>
//                     )}
//                     {(title.trim() || content.trim()) && (
//                       <div className="pt-4">
//                         {title.trim() && (
//                           <h3 className="text-xl font-heading font-semibold mb-3">
//                             {title}
//                           </h3>
//                         )}
//                         {content.trim() && (
//                           <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                             {content.length > 300
//                               ? content.substring(0, 300) + "..."
//                               : content}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center justify-between pt-4 border-t border-border">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handleCancel}
//                   disabled={loading}
//                 >
//                   Cancelar
//                 </Button>

//                 <Button
//                   type="submit"
//                   disabled={loading || !title.trim() || !content.trim()}
//                   className="gradient-primary"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Publicando...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="mr-2 h-4 w-4" />
//                       Publicar Post
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//         <Card className="mt-6 gradient-card shadow-soft">
//           <CardContent className="pt-6">
//             <h3 className="font-heading font-semibold mb-3">
//               Dicas de Escrita
//             </h3>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>• Use títulos claros e descritivos.</li>
//               <li>• Estruture seu conteúdo com parágrafos.</li>
//               <li>
//                 • Adicione imagens relevantes para ilustrar seus pontos e
//                 envolver os leitores
//               </li>
//               <li>• Inclua exemplos do mundo real.</li>
//               <li>• Revise seu conteúdo antes de publicar.</li>
//               <li>• Interaja com os comentários.</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CreatePostPage;
