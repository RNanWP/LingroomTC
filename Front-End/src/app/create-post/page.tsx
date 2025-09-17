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

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  // Check if user has permission to create posts
  React.useEffect(() => {
    if (!user || (user.role !== "professor" && user.role !== "administrador")) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const post = await postsApi.createPost(title.trim(), content.trim());

      toast({
        title: "Post Created Successfully!",
        description: "Your post has been published to LingroomTC",
      });

      router.push(`/post/${(post as any).id}`);
    } catch (error: any) {
      toast({
        title: "Failed to Create Post",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm("Are you sure you want to discard your changes?")) {
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
                  Create New Post
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Share your knowledge with the LingroomTC community
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
                  disabled={loading}
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
                  placeholder="Write your post content here. Share your insights, knowledge, and experiences with the community..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
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
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading || !title.trim() || !content.trim()}
                  className="gradient-primary"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Publish Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Writing Tips */}
        <Card className="mt-6 gradient-card shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold mb-3">Writing Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • Use clear, descriptive titles that summarize your main point
              </li>
              <li>
                • Structure your content with paragraphs for better readability
              </li>
              <li>
                • Include examples and real-world applications when possible
              </li>
              <li>• Proofread your content before publishing</li>
              <li>• Engage with comments to foster community discussion</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePostPage;
