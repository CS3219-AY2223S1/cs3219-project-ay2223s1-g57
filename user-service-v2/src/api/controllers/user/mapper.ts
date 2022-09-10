import { User } from "../../object-interfaces/user.interface";
import { UserOutput } from "../../../db/models/User";

export const toUser = (userOutput: UserOutput): User => {
  return {
    username: userOutput.username,
    password: userOutput.password,
  };
};
