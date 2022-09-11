import { TokenInput, TokenOutput } from "../../models/JWT";

/**
 * A user repository that handles access to the data store of Users.
 */

export interface ITokenRepository {
  isTokenBlacklisted(token: string): Promise<boolean>;
  getUsername(token: string): Promise<string>;
  create(payload: TokenInput): Promise<TokenOutput>;
}
