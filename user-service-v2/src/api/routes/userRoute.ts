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
  try {
    const isDuplicate = await userController.checkIfUserExists(
      payload.username,
    );
    if (isDuplicate) {
      return res.status(409).send("username is already taken here");
    }
    await userController.create(payload);
    return res.status(201).send("user created");
  } catch (error) {
    return res.status(409).send("username is already taken");
  }
});

export default userRouter;
