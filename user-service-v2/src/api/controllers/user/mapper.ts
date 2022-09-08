import { User } from "../../object-interfaces/user.interface";
import { UserOutput } from "../../../db/models/User";

export const toUser = (userOutput: UserOutput): User => {
  return {
    id: userOutput.id,
    username: userOutput.username,
    password: userOutput.password,
  };
};
