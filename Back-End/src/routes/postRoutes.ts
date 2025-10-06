import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as postController from "../controllers/postController";
import * as commentController from "../controllers/commentController";

const router = Router();

// --- Rotas Públicas ---
router.get("/", asyncHandler(postController.getAllPosts));
router.get("/search", asyncHandler(postController.searchPosts));
router.get("/:id", asyncHandler(postController.getPostById));

router.get(
  "/:postId/comments",
  asyncHandler(commentController.getCommentsByPost)
);

router.post(
  "/:postId/comments",
  authenticate,
  asyncHandler(commentController.createComment)
);

// --- Rotas Protegidas (Professores e Admins) ---
router.post(
  "/",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.createPost)
);

router.put(
  "/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.updatePost)
);

router.delete(
  "/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.deletePost)
);

router.get(
  "/admin",
  authenticate,
  authorize("administrador"),
  asyncHandler(postController.getAdminPosts)
);

export default router;
