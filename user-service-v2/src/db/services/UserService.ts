import { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "../repositories/filters";
import { UserServiceInterface } from "./interfaces/UserServiceInterface";
import { UserRepositoryInterface } from "../repositories/interfaces/UserRepositoryInterface";

export class UserService implements UserServiceInterface {
  private userRepository: UserRepositoryInterface;

  constructor(_userRepository: UserRepositoryInterface) {
    this.userRepository = _userRepository;
  }

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
    return this.getAll(filters);
  }
}
