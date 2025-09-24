import { Request, Response } from "express";
import * as commentService from "../services/commentService";

// listar comentarios
export async function getCommentsByPost(req: Request, res: Response) {
  try {
    const comments = await commentService.getCommentsByPostService(
      req.params.postId
    );
    res.status(200).json(comments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar comentários", error: error.message });
  }
}

// Criar comentario
export async function createComment(req: Request, res: Response) {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    const authorId = (req.user as any).id;

    if (!content) {
      return res
        .status(400)
        .json({ message: "O conteúdo do cometário é obrigatório" });
    }

    const newComment = await commentService.createCommentService({
      content,
      postId,
      authorId,
    });
    res.status(201).json(newComment);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar comentário", error: error.message });
  }
}

// Criar resposta
export async function createReply(req: Request, res: Response) {
  try {
    const { content } = req.body;
    const { commentId } = req.params;
    const authorId = (req.user as any).id;

    if (!content) {
      return res
        .status(400)
        .json({ message: "O conteúdo da resposta é obrigatório" });
    }

    const newReply = await commentService.createReplyService({
      content,
      authorId,
      parentCommentId: commentId,
    });
    res.status(201).json(newReply);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar resposta", error: error.message });
  }
}

// Admin Delete
export async function deleteComment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedComment = await commentService.deleteCommentService(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comentário não encontrado." });
    }

    res.status(204).send();
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar comentário", error: error.message });
  }
}

// Admin: Listar todos os comentários
export async function getAllComments(req: Request, res: Response) {
  try {
    const comments = await commentService.getAllCommentsService();
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({
      message: "Erro ao buscar todos os comentários",
      error: error.message,
    });
  }
}
