"use client";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, LogOut, Plus, Settings, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of LingroomTC",
    });
    router.push("/");
  };

  const canCreatePosts =
    user?.role === "professor" || user?.role === "administrador";
  const canAccessAdmin = user?.role === "administrador";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="font-heading text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LingroomTC
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-sm mx-2 md:max-w-md md:mx-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full text-sm"
            />
          </div>
        </form>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="text-sm">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* Create Post Button (for professors and admins) */}
              {canCreatePosts && (
                <Button asChild size="sm" className="hidden sm:flex">
                  <Link href="/create-post">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
              )}

              {/* Admin Dashboard Link */}
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
              {/* Login/Register Buttons */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs md:text-sm px-2 md:px-4"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="text-xs md:text-sm px-2 md:px-4"
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (if needed) */}
      {isAuthenticated && (
        <div className="sm:hidden border-t border-border/40 px-4 py-2">
          <div className="flex items-center justify-between">
            {canCreatePosts && (
              <Button asChild size="sm" variant="outline">
                <Link href="/create-post">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
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
