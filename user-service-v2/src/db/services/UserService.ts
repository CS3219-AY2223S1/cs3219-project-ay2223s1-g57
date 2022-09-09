import { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "../repositories/filters";
import { UserServiceInterface } from "./interfaces/UserServiceInterface";
import { UserRepositoryInterface } from "../repositories/interfaces/UserRepositoryInterface";
import { UserRepository } from "../repositories/UserRepository";

export class UserService implements UserServiceInterface {
  private userRepository: UserRepositoryInterface = new UserRepository();

  create(payload: UserInput): Promise<UserOutput> {
    return this.userRepository.create(payload);
  }

  update(id: number, payload: Partial<UserInput>): Promise<UserOutput> {
    return this.userRepository.update(id, payload);
  }

  getById(id: number): Promise<UserOutput> {
    return this.userRepository.getById(id);
  }

  deleteById(id: number): Promise<boolean> {
    return this.userRepository.deleteById(id);
  }

  getAll(filters?: GetAllUsersFilters | undefined): Promise<UserOutput[]> {
    return this.userRepository.getAll(filters);
  }

  checkIfUserExists(username: string): Promise<boolean> {
    return this.userRepository.checkIfUserExists(username);
  }
}
