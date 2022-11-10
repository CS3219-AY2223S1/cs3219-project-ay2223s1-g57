import { Router } from "express";
import * as userController from "../controllers/user/index";
import * as authController from "../controllers/auth/index";

const signupRouter = Router();

signupRouter.post(
  "/",
  userController.userDuplicateMiddleware,
  authController.hashPasswordMiddleware,
  userController.createUser,
);

export default signupRouter;
