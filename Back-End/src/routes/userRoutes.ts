import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as userController from "../controllers/userController";

const router = Router();

router.post("/register", asyncHandler(userController.register));
router.post("/login", asyncHandler(userController.login));

export default router;
