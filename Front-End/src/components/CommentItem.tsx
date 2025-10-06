// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useAuth } from "@/contexts/AuthContext";
// import { Comment } from "@/types";

// interface CommentItemProps {
//   comment: Comment;
//   onReplySubmit: (commentId: string, content: string) => void;
// }

// const CommentItem: React.FC<CommentItemProps> = ({
//   comment,
//   onReplySubmit,
// }) => {
//   const [isReplying, setIsReplying] = useState(false);
//   const [replyContent, setReplyContent] = useState("");
//   const { user } = useAuth();

//   const handleReply = () => {
//     if (!replyContent.trim()) return;
//     onReplySubmit(comment.id, replyContent);
//     setReplyContent("");
//     setIsReplying(false);
//   };

//   const canReply = user?.role === "professor" || user?.role === "administrador";

//   return (
//     <div className="flex space-x-4">
//       <Avatar>
//         <AvatarImage />
//         <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
//       </Avatar>
//       <div className="flex-1">
//         <div className="flex items-center space-x-2">
//           <p className="font-semibold">{comment.author.name}</p>
//           <p className="text-xs text-muted-foreground">
//             {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
//           </p>
//         </div>
//         <p className="text-sm mt-1">{comment.content}</p>

//         {canReply && (
//           <Button
//             variant="link"
//             size="sm"
//             className="p-0 h-auto mt-2"
//             onClick={() => setIsReplying(!isReplying)}
//           >
//             Responder
//           </Button>
//         )}

//         {isReplying && (
//           <div className="mt-2 space-y-2">
//             <Textarea
//               placeholder={`Respondendo a ${comment.author.name}...`}
//               value={replyContent}
//               onChange={(e) => setReplyContent(e.target.value)}
//             />
//             <div className="flex justify-end space-x-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsReplying(false)}
//               >
//                 Cancelar
//               </Button>
//               <Button size="sm" onClick={handleReply}>
//                 Enviar Resposta
//               </Button>
//             </div>
//           </div>
//         )}

//         {comment.replies && comment.replies.length > 0 && (
//           <div className="mt-4 space-y-4 border-l-2 pl-4">
//             {comment.replies.map((reply) => (
//               <CommentItem
//                 key={reply.id}
//                 comment={reply}
//                 onReplySubmit={onReplySubmit}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentItem;
