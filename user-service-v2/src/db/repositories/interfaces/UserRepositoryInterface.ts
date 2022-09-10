import { UserInput, UserOutput } from "../../models/User";

/**
 * A user repository that handles access to the data store of Urls.
 */

export interface UserRepositoryInterface {
  getByUsername(username: string): Promise<UserOutput>;
  isValidLogin(username: string, password: string): Promise<boolean>;
  checkIfUserExists(username: string): Promise<boolean>;
  create(payload: UserInput): Promise<UserOutput>;
  update(id: number, payload: Partial<UserInput>): Promise<UserOutput>;
  getById(id: number): Promise<UserOutput>;
  deleteByUsername(username: string): Promise<boolean>;
}
