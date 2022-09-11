import { Request, Response, NextFunction } from "express";

import { IUserService } from "../../../db/services/interfaces/IUserService";
import { UserService } from "../../../db/services/UserService";
import { CreateUserDTO } from "../../dto/user.dto";
import * as mapper from "./mapper";

const userService: IUserService = new UserService();

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
  // user is decrypted from middleware
  console.log("deleteUser");

  const { user } = req.body;

  const doesUserExists = await userService.checkIfUserExists(user);

  if (doesUserExists) {
    try {
      await userService.deleteByUsername(user);
      // todo: blacklist token
      res.status(204).send("user deleted");
    } catch (error) {
      res.status(400).send("error in deleting user");
    }
  } else {
    res.status(400).send("user does not exist");
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // user is decrypted from middleware
  // newpassword is encrypted from middleware
  const { newPassword, user } = req.body;
  const currentUser = await userService.update(user, {
    username: user,
    password: newPassword,
  });

  if (currentUser) {
    res.status(200).send("password changed");
    return;
  }
  res.status(400).send("password did not change");
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
