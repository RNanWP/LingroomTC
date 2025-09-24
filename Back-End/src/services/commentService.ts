import { Comment, IComment } from "../models/Comment";

// busca comentários
export async function getCommentsByPostService(
  postId: string
): Promise<IComment[]> {
  return Comment.find({ post: postId, parentComment: null })
    .populate("author", "name")
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
  authorId: string;
  parentCommentId: string;
}): Promise<IComment> {
  const parentComment = await Comment.findById(data.parentCommentId);
  if (!parentComment) {
    throw new Error("Comentário principal não encontrado");
  }

  const reply = new Comment({
    content: data.content,
    post: parentComment.post,
    author: data.authorId,
    parentComment: data.parentCommentId,
  });
  return await reply.save();
}

// Admin Delete
export async function deleteCommentService(
  id: string
): Promise<IComment | null> {
  await Comment.deleteMany({ parentComment: id });
  return Comment.findByIdAndDelete(id);
}

// Admin: Retorna todos os comentários
export async function getAllCommentsService(): Promise<IComment[]> {
  const comments = await Comment.find()
    .populate("author", "name")
    .sort({ createdAt: "desc" })
    .exec();

  return comments.filter((comment: IComment) => comment.author);
}
