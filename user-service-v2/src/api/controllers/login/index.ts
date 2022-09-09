import { Request, Response, NextFunction } from "express";

import { UserServiceInterface } from "../../../db/services/interfaces/UserServiceInterface";
import { UserService } from "../../../db/services/UserService";
import { CreateUserDTO } from "../../dto/user.dto";

const userService: UserServiceInterface = new UserService();

export const login = async (req: Request, res: Response): Promise<void> => {
  const payload: CreateUserDTO = req.body;
  try {
    const { username, password } = payload;
    const isValidLogin = await userService.isValidLogin(username, password);
    if (isValidLogin) {
      res.status(200).send("user created");
    } else {
      res.status(401).send("invalid username or password");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const userDuplicateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const username: string = req.body.username;
  const isDuplicate = await userService.checkIfUserExists(username);
  if (isDuplicate) {
    res.status(409).send("username is already taken here");
    return;
  }
  next();
};
