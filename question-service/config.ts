import "dotenv/config";
import { Secret } from "jsonwebtoken";

export const access_token_secret = process.env.ACCESS_TOKEN_SECRET as Secret;
