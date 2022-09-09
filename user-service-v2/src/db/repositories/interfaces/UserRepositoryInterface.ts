import { UserInput, UserOutput } from "../../models/User";
import { GetAllUsersFilters } from "../filters";

/**
 * A user repository that handles access to the data store of Urls.
 */

export interface UserRepositoryInterface {
  checkIfUserExists(username: string): Promise<boolean>;
  create(payload: UserInput): Promise<UserOutput>;
  update(id: number, payload: Partial<UserInput>): Promise<UserOutput>;
  getById(id: number): Promise<UserOutput>;
  deleteById(id: number): Promise<boolean>;
  getAll(filters?: GetAllUsersFilters): Promise<UserOutput[]>;
}
