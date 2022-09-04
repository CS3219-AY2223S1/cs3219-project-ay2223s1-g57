import { Router, Request, Response } from "express";
import { CreateUserDTO } from "../dto/user.dto";
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

userRouter.post("/", async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;
  const result = await userController.create(payload);
  return res.status(200).send(result);
});

export default userRouter;
