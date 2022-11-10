import { Router } from "express";
import * as authController from "../controllers/auth/index";

const loginRouter = Router();

loginRouter.post("/", authController.login);

export default loginRouter;
