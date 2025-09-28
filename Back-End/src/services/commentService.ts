import { Comment, IComment } from "../models/Comment";

// Cria e busca comentários
export async function getCommentsByPostService(
  postId: string
): Promise<IComment[]> {
  const populateReplies: any = {
    path: "replies",
    populate: [
      { path: "author", select: "name" },
      {
        path: "replies",
        populate: [
          { path: "author", select: "name" },
          {
            path: "replies",
            populate: { path: "author", select: "name" },
          },
        ],
      },
    ],
  };

  const comments = await Comment.find({ post: postId, parentComment: null })
    .populate("author", "name")
    .populate(populateReplies)
    .sort({ createdAt: "desc" });

  return comments;
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
  await comment.save();

  return await comment.populate("author", "name");
}

// cria resposta
export async function createReplyService(data: {
  content: string;
  postId: string;
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
  await reply.save();
  return await reply.populate("author", "name");
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
