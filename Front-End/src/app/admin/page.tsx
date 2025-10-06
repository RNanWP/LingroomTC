"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trash2,
  Edit,
  Shield,
  Users,
  MessageSquare,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { adminApi, postsApi } from "@/lib/api";
import { Post, User, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const AdminDashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [deleting, setDeleting] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user || user.role !== "administrador") {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [postsData, usersData, commentsData] = await Promise.all([
          adminApi.getAllPosts(),
          adminApi.getAllUsers().catch(() => []),
          adminApi.getAllComments().catch(() => []),
        ]);

        setPosts(postsData as Post[]);
        setUsers(usersData as User[]);
        setComments(commentsData as Comment[]);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar dados do administrador");
        toast({
          title: "Erro ao carregar dados do administrador",
          description:
            err.message || "Falha ao carregar dados do administrador",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "administrador") {
      fetchData();
    }
  }, [user]);

  const handleDeletePost = async (postId: string) => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      setDeleting(postId);
      await postsApi.deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
      toast({
        title: "Post excluído",
        description: "O post foi excluído com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Falha ao excluir post",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      setDeleting(userId);
      await adminApi.deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Falha ao excluir usuário",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      setDeleting(commentId);
      await adminApi.deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      toast({
        title: "Comentário excluído",
        description: "O comentário foi excluído com sucesso",
      });
    } catch (error: any) {
      toast({
        title: "Falha ao excluir comentário",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "administrador":
        return "destructive";
      case "professor":
        return "default";
      case "aluno":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (!user || user.role !== "administrador") {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">
              Carregando painel do administrador...
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
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-heading font-bold">
              Painel do Administrador
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie posts, usuários e comentários no LingroomTC
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Usuários
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Comentários
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comments.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card shadow-medium">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts">Gerenciar Posts</TabsTrigger>
                <TabsTrigger value="users">Gerenciar Usuários</TabsTrigger>
                <TabsTrigger value="comments">
                  Gerenciar Comentários
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Criado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium max-w-xs truncate">
                            {post.title}
                          </TableCell>
                          <TableCell>{post.author.name}</TableCell>
                          <TableCell>{formatDate(post.createdAt)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(`/edit-post/${post.id}`)
                              }
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              disabled={deleting === post.id}
                            >
                              {deleting === post.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>Cadastrado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((userData) => (
                        <TableRow key={userData.id}>
                          <TableCell className="font-medium">
                            {userData.name}
                          </TableCell>
                          <TableCell>{userData.email}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(userData.role)}>
                              {userData.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {userData.createdAt
                              ? formatDate(userData.createdAt)
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            {userData.id !== user.id && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteUser(userData.id)}
                                disabled={deleting === userData.id}
                              >
                                {deleting === userData.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Conteúdo</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Post</TableHead>
                        <TableHead>Criado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comments.map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell className="max-w-xs truncate">
                            {comment.content}
                          </TableCell>
                          <TableCell>{comment.author.name}</TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {comment.post ? (
                              <Link
                                href={`/posts/${comment.post.id}`}
                                className="text-primary hover:underline"
                              >
                                {comment.post.title}
                              </Link>
                            ) : (
                              "Post não disponível"
                            )}
                          </TableCell>
                          <TableCell>{formatDate(comment.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={deleting === comment.id}
                            >
                              {deleting === comment.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
