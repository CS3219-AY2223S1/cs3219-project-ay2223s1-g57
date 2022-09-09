import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const payload: CreateUserDTO = req.body;
  try {
    const { username, password } = payload;
    const currentUser = await userService.getByUsername(username);
    console.log(`inputPassword: ${password}`);
    console.log(`dbPassword: ${currentUser.password}`);
    const isMatch = bcrypt.compareSync(password, currentUser.password);

    if (isMatch) {
      res.status(200).send("user created");
    } else {
      res.status(401).send("invalid username or password");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
