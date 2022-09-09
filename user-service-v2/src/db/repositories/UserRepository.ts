import { Op } from "sequelize";
import User, { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "./filters";
import { UserRepositoryInterface } from "./interfaces/UserRepositoryInterface";
export class UserRepository implements UserRepositoryInterface {
  public create = async (payload: UserInput): Promise<UserOutput> => {
    const user = await User.create(payload);
    return user;
  };

  public update = async (
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

  public getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id);
    if (!user) {
      // @todo, throw custom error
      throw new Error("user not found");
    }
    return user;
  };

  public deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
      where: { id },
    });
    return !!deletedUserCount;
  };

  public getAll = async (
    filters?: GetAllUsersFilters,
  ): Promise<UserOutput[]> => {
    return User.findAll({
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      },
      // Adding the paranoid: true option to the findAll model method
      // includes the soft-deleted records with deletedAt set in the result.
      // Otherwise, the results exclude soft deleted records by default.
      ...((filters?.isDeleted || filters?.includeDeleted) && {
        paranoid: true,
      }),
    });
  };
  public checkIfUserExists = async (userName: string): Promise<boolean> => {
    const user = await User.findOne({
      where: {
        username: userName,
      },
    });

    return user !== null;
  };

  public isValidLogin = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    return user !== null;
  };
}
