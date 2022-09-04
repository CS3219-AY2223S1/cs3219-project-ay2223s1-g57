import { Optional } from "sequelize/types";

export type CreateUserDTO = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type UpdateUserDTO = Optional<CreateUserDTO, "username">;

export type FilterUserDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
