"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { postsApi } from "@/lib/api";
import { Post } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

const EditPostPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  // Verifica se o usuário tem permissão para editar posts
  React.useEffect(() => {
    if (user && user.role !== "professor" && user.role !== "administrador") {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const postData = (await postsApi.getPost(id)) as Post;
        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar o post.");
        toast({
          title: "Erro ao Carregar o Post",
          description:
            err.message || "Não foi possível encontrar os dados do post.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPost();
    }
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !id) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha o título e o conteúdo.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      await postsApi.updatePost(id, title.trim(), content.trim());

      toast({
        title: "Post Atualizado com Sucesso!",
        description: "Suas alterações foram salvas.",
      });

      router.push(`/posts/${id}`);
    } catch (error: any) {
      toast({
        title: "Falha ao Atualizar o Post",
        description:
          error.message || "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (post && (title !== post.title || content !== post.content)) {
      if (
        window.confirm("Você tem certeza que deseja descartar as alterações?")
      ) {
        router.push(`/posts/${id}`);
      }
    } else {
      router.push(`/posts/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">
              Carregando post...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Post não encontrado."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
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
                  Editar Post
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Atualize o conteúdo do seu post.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Título do Post
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Digite um título cativante..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={saving}
                  className="text-lg h-12"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {title.length}/200 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-medium">
                  Conteúdo do Post
                </Label>
                <Textarea
                  id="content"
                  placeholder="Escreva o conteúdo aqui..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={saving}
                  className="min-h-[400px] text-base leading-relaxed"
                  maxLength={10000}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {content.length}/10.000 caracteres
                </p>
              </div>

              {(title.trim() || content.trim()) && (
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Pré-visualização
                  </Label>
                  <Card className="border-2 border-dashed border-border">
                    <CardContent className="pt-6">
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
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={saving || !title.trim() || !content.trim()}
                  className="gradient-primary"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPostPage;
