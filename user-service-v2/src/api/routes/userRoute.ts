import { Router } from "express";
import * as authController from "../controllers/auth/index";
import * as userController from "../controllers/user/index";

const userRouter = Router();

userRouter.get(":/slug", () => {
  // get user
});

userRouter.put(":/slug", () => {
  // udpate user
});

userRouter.delete(
  "/",
  authController.authenticateMiddleware,
  userController.deleteUser,
);

export default userRouter;
