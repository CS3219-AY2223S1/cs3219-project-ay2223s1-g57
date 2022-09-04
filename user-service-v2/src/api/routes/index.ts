import { Router } from "express";
import userRouter from "./userRoute";

const mainRouter = Router();

mainRouter.use("/users", userRouter);

export default mainRouter;
