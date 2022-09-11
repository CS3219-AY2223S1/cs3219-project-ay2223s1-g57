import { TokenInput, TokenOutput } from "../models/JWT";
import { ITokenService } from "./interfaces/ITokenService";
import { ITokenRepository } from "../repositories/interfaces/ITokenRepository";
import { TokenRepository } from "../repositories/TokenRepository";

export class TokenService implements ITokenService {
  private tokenRepository: ITokenRepository = new TokenRepository();

  isTokenBlacklisted = async (token: string): Promise<boolean> => {
    return this.tokenRepository.isTokenBlacklisted(token);
  };

  getUsername = async (token: string): Promise<string> => {
    return this.tokenRepository.getUsername(token);
  };

  create = async (payload: TokenInput): Promise<TokenOutput> => {
    return this.tokenRepository.create(payload);
  };
}
