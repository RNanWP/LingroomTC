"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, BookOpen, Loader2, AlertCircle } from "lucide-react";
import PostCard from "@/components/PostCard";
import { postsApi } from "@/lib/api";
import { IPost } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

const AuthorProfilePage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      if (!authorId) return;

      try {
        setLoading(true);
        setError(null);

        // Get all posts and filter by author (will be updated when real API supports this)
        const allPosts = (await postsApi.getAllPosts()) as IPost[];
        const authorPosts = allPosts.filter(
          (post: IPost) => post.author._id === authorId
        );

        setPosts(authorPosts);

        // Set author name from first post if available
        if (authorPosts.length > 0) {
          setAuthorName(authorPosts[0].author.name);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load author posts");
        toast({
          title: "Error loading posts",
          description: err.message || "Failed to load author posts",
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
              Loading author profile...
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
      {/* Author Header */}
      <section className="gradient-hero border-b border-border/40">
        <div className="container py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <User className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-balance mb-4">
              {authorName || "Author Profile"}
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore all posts by this author
            </p>
          </div>
        </div>
      </section>

      {/* Author Stats */}
      <section className="container py-8">
        <Card className="gradient-card shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Posts by {authorName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {posts.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {Math.round(
                    posts.reduce((acc, post) => acc + post.content.length, 0) /
                      posts.length
                  ) || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg. Content Length
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {posts.length > 0
                    ? new Date(posts[0].createdAt).getFullYear()
                    : "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member Since
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-1">
            All Posts ({posts.length})
          </h2>
          <p className="text-muted-foreground">
            {posts.length === 1 ? "Post" : "Posts"} authored by {authorName}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">
              This author hasn't published any posts yet.
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
};

export default AuthorProfilePage;
