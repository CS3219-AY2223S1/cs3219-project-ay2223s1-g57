import { UserServiceInterface } from "../../../db/services/interfaces/UserServiceInterface";
import { UserService } from "../../../db/services/UserService";
import { CreateUserDTO } from "../../dto/user.dto";
import { User } from "../../object-interfaces";
import * as mapper from "./mapper";

const userService: UserServiceInterface = new UserService();

export const create = async (payload: CreateUserDTO): Promise<User> => {
  return mapper.toUser(await userService.create(payload));
};

export const checkIfUserExists = async (username: string): Promise<Boolean> => {
  return userService.checkIfUserExists(username);
};
