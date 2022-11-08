import { Request, Response, NextFunction } from "express";
import { IToken } from "../interfaces";
import jwt from "jsonwebtoken";
import { access_token_secret } from "../../../config";

export const authenticateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers["authorization"];
    // auth header looks like: Bearer TOKEN

    // token is undefined or the actual token
    const token = authHeader && authHeader?.split(" ")[1];
    if (token == null) {
        res.status(401).send("unauthorized");
        return;
    }

    // const currentUser = jwt.decode(token) as { name: string };
    jwt.verify(token, access_token_secret, (err, user) => {
        if (err) {
            res.status(403).send(
                "token is no longer valid. please login again"
            );
            // add this to the blacklist tokens
            return;
        }
        const decoded = user as IToken;
        console.log("middleware user ", decoded.name);
        req.body.user = decoded.name as string;
        next();
    });
};
