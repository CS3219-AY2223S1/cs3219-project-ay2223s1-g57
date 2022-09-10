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

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const username = req.body.username;

  const doesUserExists = await userService.checkIfUserExists(username);

  if (doesUserExists) {
    try {
      await userService.deleteByUsername(username);
      res.status(202).send("user deleted");
    } catch (error) {
      res.status(400).send("error in deleting user");
    }
  } else {
    res.status(400).send("user does not exist");
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
    res.status(409).send("username is already taken");
    return;
  }
  next();
};
