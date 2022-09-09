import { Router } from "express";
import * as userController from "../controllers/user/index";
const userRouter = Router();

userRouter.get(":/slug", () => {
  // get user
});

userRouter.put(":/slug", () => {
  // udpate user
});

userRouter.delete(":/slug", () => {
  // delete user
});

userRouter.post(
  "/",
  userController.userDuplicateMiddleware,
  userController.createUser,
);

export default userRouter;
