import { Router } from "express";

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

userRouter.post(":/slug", () => {
  // create user
});

export default userRouter;
