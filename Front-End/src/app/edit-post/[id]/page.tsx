"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { postsApi } from "@/lib/api";
import { IPost } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user has permission to edit posts
  React.useEffect(() => {
    if (!user || (user.role !== "professor" && user.role !== "administrador")) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const postData = (await postsApi.getPost(id)) as IPost;
        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
      } catch (err: any) {
        setError(err.message || "Failed to load post");
        toast({
          title: "Error loading post",
          description: err.message || "Failed to load post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "professor" || user?.role === "administrador") {
      fetchPost();
    }
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !id) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      await postsApi.updatePost(id, title.trim(), content.trim());

      toast({
        title: "Post Updated Successfully!",
        description: "Your changes have been saved",
      });

      navigate(`/post/${id}`);
    } catch (error: any) {
      toast({
        title: "Failed to Update Post",
        description: error.message || "Failed to update post",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (post && (title !== post.title || content !== post.content)) {
      if (window.confirm("Are you sure you want to discard your changes?")) {
        navigate(`/post/${id}`);
      }
    } else {
      navigate(`/post/${id}`);
    }
  };

  if (!user || (user.role !== "professor" && user.role !== "administrador")) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">
              Loading post...
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
            <AlertDescription>{error || "Post not found"}</AlertDescription>
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
                  Edit Post
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Update your post content
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Post Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a compelling title for your post..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={saving}
                  className="text-lg h-12"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  {title.length}/200 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-medium">
                  Post Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={saving}
                  className="min-h-[400px] text-base leading-relaxed"
                  maxLength={10000}
                />
                <p className="text-xs text-muted-foreground">
                  {content.length}/10,000 characters
                </p>
              </div>

              {/* Preview Section */}
              {(title.trim() || content.trim()) && (
                <div className="space-y-2">
                  <Label className="text-base font-medium">Preview</Label>
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
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={saving || !title.trim() || !content.trim()}
                  className="gradient-primary"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
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
