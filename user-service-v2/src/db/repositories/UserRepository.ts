import User, { UserInput, UserOutput } from "../models/User";
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
      throw new Error("user not found");
    }
    return user;
  };

  public getByUsername = async (username: string): Promise<UserOutput> => {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  };

  public deleteByUsername = async (username: string): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
      where: { username },
    });
    return !!deletedUserCount;
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
