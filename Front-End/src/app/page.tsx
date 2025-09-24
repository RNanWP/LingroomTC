"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, BookOpen, AlertCircle } from "lucide-react";
import PostCard from "@/components/PostCard";
import { postsApi } from "@/lib/api";
import { Post } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const POSTS_PER_PAGE = 9;

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (searchQuery) {
          const allResults = (await postsApi.searchPosts(
            searchQuery
          )) as Post[];
          const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
          const endIndex = startIndex + POSTS_PER_PAGE;
          data = allResults.slice(startIndex, endIndex);
          setTotalCount(allResults.length);
          setTotalPages(Math.ceil(allResults.length / POSTS_PER_PAGE));
        } else {
          const allPosts = (await postsApi.getAllPosts()) as Post[];
          const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
          const endIndex = startIndex + POSTS_PER_PAGE;
          data = allPosts.slice(startIndex, endIndex);
          setTotalCount(allPosts.length);
          setTotalPages(Math.ceil(allPosts.length / POSTS_PER_PAGE));
        }

        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar os posts");
        toast({
          title: "Erro ao carregar os posts",
          description: err.message || "Não foi possível carregar os posts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationNumbers = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis1" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis2" />);
      }

      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              isActive={currentPage === totalPages}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">
              Carregando posts...
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
      {/* Hero Section */}
      <section className="gradient-hero border-b border-border/40">
        <div className="container py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-balance mb-4">
              Bem-vindo ao{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                LingroomTC
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Sua principal plataforma educacional para aprender, compartilhar e
              crescer juntos. Descubra insights de professores e interaja com
              uma comunidade de alunos.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="container py-8 px-4 md:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold">
                {searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : "Últimas Postagens"}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                {totalCount}{" "}
                {totalCount === 1 ? "post encontrado" : "posts encontrados"}
                {totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
              </p>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery ? "Nenhum post encontrado" : "Ainda não há posts"}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Tente ajustar seus termos de busca."
                : "Seja o primeiro a compartilhar seu conhecimento."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(Math.max(1, currentPage - 1));
                        }}
                        className={`cursor-pointer ${
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      />
                    </PaginationItem>

                    {renderPaginationNumbers()}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          );
                        }}
                        className={`cursor-pointer ${
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
