import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as commentController from "../controllers/commentController";

const router = Router();

// mostra todos os comentários
router.get(
  "/posts/:postId/comments",
  asyncHandler(commentController.getCommentsByPost)
);

// Alunos cria comentário
router.post(
  "/posts/:postId/comments",
  authenticate,
  asyncHandler(commentController.createComment)
);

// Proff e ADM respondem comentário
router.post(
  "/comments/:commentId/reply",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(commentController.createReply)
);

export default router;
