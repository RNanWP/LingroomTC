import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as userController from "../controllers/userController";
import * as commentController from "../controllers/commentController";
import * as postController from "../controllers/postController";

const router = Router();

router.use(authenticate, authorize("administrador"));

router.get("/posts/search", asyncHandler(postController.searchPosts));

router.delete("/users/:id", asyncHandler(userController.deleteUser));
router.delete("/comments/:id", asyncHandler(commentController.deleteComment));

router.get("/posts", asyncHandler(postController.getAdminPosts));
router.get("/users", asyncHandler(userController.getAllUsers));
router.get("/comments", asyncHandler(commentController.getAllComments));

export default router;
