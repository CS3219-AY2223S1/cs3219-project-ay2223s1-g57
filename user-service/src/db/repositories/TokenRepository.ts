import Token, { TokenInput, TokenOutput } from "../models/JWT";
import { ITokenRepository } from "./interfaces/ITokenRepository";

export class TokenRepository implements ITokenRepository {
  create = async (payload: TokenInput): Promise<TokenOutput> => {
    const token = await Token.create(payload);
    return token;
  };

  isTokenBlacklisted = async (token: string): Promise<boolean> => {
    const tokenObj = await Token.findOne({
      where: {
        token: token,
      },
    });
    return tokenObj !== null;
  };
}
