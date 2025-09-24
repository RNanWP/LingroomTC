"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Calendar, Image } from "lucide-react";
import { Post } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getContentPreview = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength).trim() + "...";
  };

  // Função para navegar para o post
  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card
      className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 gradient-card overflow-hidden h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Placeholder Image */}
      <div className="aspect-video bg-gradient-hero flex items-center justify-center border-b border-border/40 flex-shrink-0">
        <Image className="h-12 w-12 text-primary/60" />
      </div>

      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-lg md:text-xl font-heading hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base flex-grow break-words">
          {getContentPreview(post.content)}
        </p>

        <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mt-auto">
          <Link
            href={`/author/${post.author.id}`}
            className="flex items-center space-x-2 hover:text-primary transition-colors truncate"
            onClick={(e) => e.stopPropagation()}
          >
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium truncate">{post.author.name}</span>
          </Link>

          <div className="flex items-center space-x-1 flex-shrink-0">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
