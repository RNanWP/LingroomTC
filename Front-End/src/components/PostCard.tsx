// src/components/PostCard.tsx
import Link from "next/link";
import { IPost } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User, Image as ImageIcon } from "lucide-react";

interface PostCardProps {
  post: IPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post._id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader>
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="aspect-video w-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-t-lg">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <CardTitle className="pt-4">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{post.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground mt-auto pt-4 border-t">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{post.author?.name || "Autor"}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

// import React from "react";
// import Link from "next/link";
// import { User, Calendar, Image } from "lucide-react";
// import { IPost } from "@/types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface PostCardProps {
//   post: IPost;
// }

// const PostCard: React.FC<PostCardProps> = ({ post }) => {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const getContentPreview = (content: string, maxLength: number = 150) => {
//     if (content.length <= maxLength) {
//       return content;
//     }
//     return content.substring(0, maxLength).trim() + "...";
//   };

//   return (
//     <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 gradient-card overflow-hidden">
//       {/* Imagem do Post */}
//       <Link href={`/posts/${post._id}`} className="block">
//         <div className="aspect-video bg-gradient-hero flex items-center justify-center border-b border-border/40">
//           {post.imageUrl ? (
//             <img
//               src={post.imageUrl}
//               alt={post.title}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <Image className="h-12 w-12 text-primary/60" />
//           )}
//         </div>
//       </Link>

//       <CardHeader className="pb-3">
//         <CardTitle className="text-lg md:text-xl font-heading hover:text-primary transition-colors">
//           <Link href={`/posts/${post._id}`} className="story-link">
//             {post.title}
//           </Link>
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
//           {getContentPreview(post.content)}
//         </p>

//         <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
//           <Link
//             href={`/author/${post.author._id}`}
//             className="flex items-center space-x-2 hover:text-primary transition-colors"
//           >
//             <User className="h-4 w-4" />
//             <span className="font-medium">{post.author.name}</span>
//           </Link>

//           <div className="flex items-center space-x-1">
//             <Calendar className="h-4 w-4" />
//             <span>{formatDate(post.createdAt)}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default PostCard;
