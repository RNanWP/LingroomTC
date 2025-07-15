import { Comment, IComment } from "../models/Comment";
import { Types } from "mongoose";

// busca comentários
export async function getCommentsByPostService(
  postId: string
): Promise<IComment[]> {
  return Comment.find({ post: postId, parentComment: null })
    .populate("author", "name")
    .populate({
      path: "replies",
      populate: { path: "author", select: "name" },
    })
    .sort({ createdAt: "desc" });
}

// cria comentario
export async function createCommentService(data: {
  content: string;
  postId: string;
  authorId: string;
}): Promise<IComment> {
  const comment = new Comment({
    content: data.content,
    post: data.postId,
    author: data.authorId,
  });
  return await comment.save();
}

// cria resposta
export async function createReplyService(data: {
  content: string;
  postId: string;
  authorId: string;
  parentCommentId: string;
}): Promise<IComment> {
  const reply = new Comment({
    content: data.content,
    post: data.postId,
    author: data.authorId,
    parentComment: data.parentCommentId,
  });
  return await reply.save();
}
