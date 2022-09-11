import { TokenInput, TokenOutput } from "../../models/JWT";

/**
 * A token service that connects the repository to the controller
 */

export interface ITokenService {
  isTokenBlacklisted(token: string): Promise<boolean>;
  create(payload: TokenInput): Promise<TokenOutput>;
}
