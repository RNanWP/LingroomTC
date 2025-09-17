"use client";

import React from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Image } from "lucide-react";
import { IPost } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getContentPreview = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength).trim() + "...";
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 gradient-card overflow-hidden">
      {/* Placeholder Image */}
      <div className="aspect-video bg-gradient-hero flex items-center justify-center border-b border-border/40">
        <Image className="h-12 w-12 text-primary/60" />
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl font-heading hover:text-primary transition-colors">
          <Link to={`/post/${post._id}`} className="story-link">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
          {getContentPreview(post.content)}
        </p>

        <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
          <Link
            to={`/author/${post.author._id}`}
            className="flex items-center space-x-2 hover:text-primary transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="font-medium">{post.author.name}</span>
          </Link>

          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
