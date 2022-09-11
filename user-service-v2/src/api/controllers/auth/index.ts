import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { access_token_secret } from "../../../config";
import { saltRounds } from "../../../constants";
import { IUserService } from "../../../db/services/interfaces/IUserService";
import { ITokenService } from "../../../db/services/interfaces/ITokenService";
import { UserService } from "../../../db/services/UserService";
import { TokenService } from "../../../db/services/TokenService";

import { CreateUserDTO } from "../../dto/user.dto";

const userService: IUserService = new UserService();
const tokenService: ITokenService = new TokenService();

// interface UserPayload {
//   name: string;
// }
// interface JwtExpPayload {
//   expiresIn: string;
//   exp: number;
// }

export interface TokenInterface {
  name: string;
  iat: number;
  exp: number;
}
export const hashPasswordMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  next();
};

export const comparePasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { oldPassword, user } = req.body;
  const currentUser = await userService.getByUsername(user);
  const isMatch = bcrypt.compareSync(oldPassword, currentUser.password);

  if (!isMatch) {
    res.status(400).send("invalid old password");
    return;
  }
  req.body.newPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
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

  const isTokenBlacklisted = await tokenService.isTokenBlacklisted(token);
  if (isTokenBlacklisted) {
    res.status(401).send("user has already logged out");
    return;
  }

  // const currentUser = jwt.decode(token) as { name: string };
  jwt.verify(token, access_token_secret, (err, user) => {
    if (err) {
      res.status(403).send("token is no longer valid. please login again");
      return;
    }
    const decoded = user as TokenInterface;
    console.log("middleware user ", decoded.name);
    req.body.user = decoded.name as string;
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
      const accessToken = jwt.sign({ name: username }, access_token_secret, {
        expiresIn: "15m",
      });
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(401).send("invalid username or password");
    }
  } catch (error) {
    res.status(400).send("invalid username or password");
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers["authorization"];
  // since authenticateMiddleware executes before this function, there will always be a token
  const token = authHeader && authHeader?.split(" ")[1];

  try {
    tokenService.create({ token: token });
    res.status(200).send("log out successful");
  } catch (error) {
    res.status(400).send("invalid username or password");
  }
};
