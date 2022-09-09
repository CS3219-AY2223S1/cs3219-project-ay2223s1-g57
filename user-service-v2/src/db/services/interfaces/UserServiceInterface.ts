import { UserInput, UserOutput } from "../../models/User";
import { GetAllUsersFilters } from "../../repositories/filters";

/**
 * A user service that connects the repository to the controller
 * Handles the dependencies
 */

export interface UserServiceInterface {
  isValidLogin(username: string, password: String): Promise<boolean>;
  checkIfUserExists(username: string): Promise<boolean>;
  create(payload: UserInput): Promise<UserOutput>;
  update(id: number, payload: Partial<UserInput>): Promise<UserOutput>;
  getById(id: number): Promise<UserOutput>;
  getByUsername(id: string): Promise<UserOutput>;
  deleteById(id: number): Promise<boolean>;
  getAll(filters?: GetAllUsersFilters): Promise<UserOutput[]>;
}
