import { Router } from "express";
import * as authController from "../controllers/auth/index";

const logoutRouter = Router();

logoutRouter.post(
  "/",
  authController.authenticateMiddleware,
  authController.logout,
);

export default logoutRouter;
