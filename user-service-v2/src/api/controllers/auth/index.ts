import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { access_token_secret } from "../../../config";
import { saltRounds } from "../../../constants";
import { UserServiceInterface } from "../../../db/services/interfaces/UserServiceInterface";
import { UserService } from "../../../db/services/UserService";
import { CreateUserDTO } from "../../dto/user.dto";

const userService: UserServiceInterface = new UserService();

export const hashPasswordMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  next();
};

export const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  // auth header looks like: Bearer TOKEN

  // token is undefined or the actual token
  const token = authHeader && authHeader?.split(" ")[1];

  if (token == null) {
    res.status(401).send("unauthorized");
    return;
  }

  jwt.verify(token, access_token_secret, (err, user) => {
    if (err) {
      res.status(403).send("token is no longer valid. please login again");
      return;
    }
    req.body.username = user;
    next();
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const payload: CreateUserDTO = req.body;
  try {
    const { username, password } = payload;
    const currentUser = await userService.getByUsername(username);
    const isMatch = bcrypt.compareSync(password, currentUser.password);

    if (isMatch) {
      const accessToken = jwt.sign({ name: username }, access_token_secret);
      res.json({ accessToken: accessToken });
      res.status(200).send("user created");
    } else {
      res.status(401).send("invalid username or password");
    }
  } catch (error) {
    res.status(400).send("invalid username or password");
  }
};
