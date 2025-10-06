"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  User,
  MessageCircle,
  Reply,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { postsApi, commentsApi } from "@/lib/api";
import { Post, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

interface CommentComponentProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => Promise<void>;
  canReply: boolean;
  level?: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  onReply,
  canReply,
  level = 0,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);
      await onReply(comment.id, replyContent.trim());
      setReplyContent("");
      setShowReplyForm(false);
      toast({
        title: "Resposta Enviada",
        description: "Sua resposta foi publicada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Falha ao Enviar Resposta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`${level > 0 ? "ml-8 border-l-2 border-border pl-4" : ""}`}>
      <Card className="gradient-card shadow-soft">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="font-medium">{comment.author.name}</span>
            <span>•</span>
            <span>{formatDate(comment.createdAt)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {canReply && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-primary hover:text-primary-hover"
              >
                <Reply className="h-4 w-4 mr-2" />
                Responder
              </Button>
            </div>
          )}

          {showReplyForm && (
            <form onSubmit={handleReply} className="mt-4 space-y-3">
              <Textarea
                placeholder="Escreva sua resposta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                disabled={submitting}
                className="min-h-[100px]"
              />
              <div className="flex space-x-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={submitting || !replyContent.trim()}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Resposta"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              onReply={onReply}
              canReply={canReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PostDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canReply = user?.role === "professor" || user?.role === "administrador";

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          postsApi.getPost(id),
          commentsApi.getPostComments(id),
        ]);

        setPost(postData as Post);
        setComments(commentsData as Comment[]);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar a postagem");
        toast({
          title: "Erro ao carregar a postagem",
          description:
            err.message || "Não foi possível carregar o conteúdo desta página.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;

    try {
      setSubmitting(true);
      const newCommentData = (await commentsApi.createComment(
        id,
        newComment.trim()
      )) as Comment;

      setComments((prevComments) => [...prevComments, newCommentData]);

      setNewComment("");
      toast({
        title: "Comentário Enviado",
        description: "Seu comentário foi publicado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Falha ao Enviar Comentário",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (commentId: string, content: string) => {
    await commentsApi.replyToComment(commentId, content);
    if (id) {
      const updatedComments = (await commentsApi.getPostComments(
        id
      )) as Comment[];
      setComments(updatedComments);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">
              Carregando postagem...
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
              {error || "Postagem não encontrada."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <article className="mb-8">
          <Card className="gradient-card shadow-medium overflow-hidden">
            {post.imageUrl && (
              <div className="relative w-full aspect-video">
                <Image
                  src={post.imageUrl}
                  alt={`Imagem do post ${post.title}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            )}

            <CardHeader>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-balance">
                {post.title}
              </h1>

              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <Link
                    href={`/author/${post.author.id}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {post.author.name}
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </article>

        <section>
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-heading font-semibold">
              Comentários ({comments.length})
            </h2>
          </div>

          {isAuthenticated && (
            <Card className="gradient-card shadow-soft mb-6">
              <CardContent className="pt-6">
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Compartilhe sua opinião..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={submitting}
                    className="min-h-[120px]"
                  />
                  <Button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Comentário"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Nenhum comentário ainda.
                </p>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated
                    ? "Seja o primeiro a compartilhar sua opinião!"
                    : "Faça login para participar da discussão."}
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentComponent
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                  canReply={canReply}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage;
