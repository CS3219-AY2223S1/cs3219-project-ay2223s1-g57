import { Op } from "sequelize";
import User, { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "./types";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);
  return user;
};

export const update = async (
  id: number,
  payload: Partial<UserInput>,
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    // @todo, throw custom error
    throw new Error("user not found");
  }

  const updatedUser = await (user as User).update(payload);
  return updatedUser;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    // @todo, throw custom error
    throw new Error("user not found");
  }
  return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const getAll = async (
  filters?: GetAllUsersFilters,
): Promise<UserOutput[]> => {
  return User.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    // Adding the paranoid: true option to the findAll model method
    // includes the soft-deleted records with deletedAt set in the result.
    // Otherwise, the results exclude soft deleted records by default.
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};
