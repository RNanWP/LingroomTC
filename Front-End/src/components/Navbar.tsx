// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, LogOut, Plus, Settings, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/`);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado do LingroomTC",
    });
    router.push("/");
  };

  const canCreatePosts =
    user?.role === "professor" || user?.role === "administrador";
  const canAccessAdmin = user?.role === "administrador";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="font-heading text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LingroomTC
          </span>
        </Link>

        {/* Barra de pesquisa */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Pesquisar posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </form>

        {/* Ações de navegação */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Informações do usuário */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="text-sm">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* Botão Criar Postagem */}
              {canCreatePosts && (
                <Button asChild size="sm" className="hidden sm:flex">
                  <Link href="/create-post">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Post
                  </Link>
                </Button>
              )}

              {/* Painel de administração */}
              {canAccessAdmin && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Link href="/admin">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}

              {/* Logout Button */}
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              {/* Botões de login/registro */}
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Registrar</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Menu móvel */}
      {isAuthenticated && (
        <div className="sm:hidden border-t border-border/40 px-4 py-2">
          <div className="flex items-center justify-between">
            {canCreatePosts && (
              <Button asChild size="sm" variant="outline">
                <Link href="/create-post">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Post
                </Link>
              </Button>
            )}
            {canAccessAdmin && (
              <Button asChild variant="outline" size="sm">
                <Link href="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
