import { Request, Response, NextFunction } from "express";

import { UserServiceInterface } from "../../../db/services/interfaces/UserServiceInterface";
import { UserService } from "../../../db/services/UserService";
import { CreateUserDTO } from "../../dto/user.dto";
import * as mapper from "./mapper";

const userService: UserServiceInterface = new UserService();

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const payload: CreateUserDTO = req.body;
  try {
    mapper.toUser(await userService.create(payload));
    res.status(201).send("user created");
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
