import { UserInput, UserOutput } from "../../models/User";

/**
 * A user service that connects the repository to the controller
 * Handles the dependencies
 */

export interface IUserService {
  isValidLogin(username: string, password: String): Promise<boolean>;
  checkIfUserExists(username: string): Promise<boolean>;
  create(payload: UserInput): Promise<UserOutput>;
  update(id: number, payload: Partial<UserInput>): Promise<UserOutput>;
  getById(id: number): Promise<UserOutput>;
  getByUsername(id: string): Promise<UserOutput>;
  deleteByUsername(username: string): Promise<boolean>;
}
