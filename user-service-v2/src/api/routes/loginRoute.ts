import { Router } from "express";
import * as loginController from "../controllers/login/index";
const loginRouter = Router();

loginRouter.post("/", loginController.login);

export default loginRouter;
