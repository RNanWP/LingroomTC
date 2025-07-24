import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as postController from "../controllers/postController";

const router = Router();

// Rotas publicas
router.get("/posts", asyncHandler(postController.getAllPosts));
router.get("/posts/search", asyncHandler(postController.searchPosts));
router.get("/posts/:id", asyncHandler(postController.getPostById));

// Rotas protegidas
router.post(
  "/posts",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.createPost)
);

router.put(
  "/posts/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.updatePost)
);

router.delete(
  "/posts/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.deletePost)
);

// Rota ADM
router.get(
  "/admin/posts",
  authenticate,
  authorize("administrador"),
  asyncHandler(postController.getAdminPosts)
);

export default router;
