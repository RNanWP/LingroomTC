import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as commentController from "../controllers/commentController";

const router = Router();

// Professor e ADM respondem a um comentário específico
router.post(
  "/:commentId/reply",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(commentController.createReply)
);

export default router;
