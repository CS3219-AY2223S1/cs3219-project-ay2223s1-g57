import { Router } from "express";
import * as userController from "../controllers/user/index";
const signupRouter = Router();

signupRouter.post(
  "/",
  userController.userDuplicateMiddleware,
  userController.createUser,
);

export default signupRouter;
