import { Router } from "express";
import loginRouter from "./loginRoute";
import signupRouter from "./signupRoute";
import userRouter from "./userRoute";

const mainRouter = Router();
mainRouter.use("/users", userRouter);
mainRouter.use("/signup", signupRouter);
mainRouter.use("/login", loginRouter);

export default mainRouter;
