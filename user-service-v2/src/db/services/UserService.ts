import { UserInput, UserOutput } from "../models/User";
import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";

export class UserService implements IUserService {
  private userRepository: IUserRepository = new UserRepository();

  create(payload: UserInput): Promise<UserOutput> {
    return this.userRepository.create(payload);
  }

  update(username: string, payload: Partial<UserInput>): Promise<UserOutput> {
    return this.userRepository.update(username, payload);
  }

  getById(id: number): Promise<UserOutput> {
    return this.userRepository.getById(id);
  }

  getByUsername(username: string): Promise<UserOutput> {
    return this.userRepository.getByUsername(username);
  }

  deleteByUsername(username: string): Promise<boolean> {
    return this.userRepository.deleteByUsername(username);
  }

  checkIfUserExists(username: string): Promise<boolean> {
    return this.userRepository.checkIfUserExists(username);
  }

  isValidLogin(username: string, password: string): Promise<boolean> {
    return this.userRepository.isValidLogin(username, password);
  }
}
