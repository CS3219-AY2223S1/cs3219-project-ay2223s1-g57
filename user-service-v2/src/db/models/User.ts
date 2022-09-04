import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../../config";

// User attributes
interface UserAttributes {
  id: number;

  // user information
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Object type passed to Sequelize's model.create
export interface UserInput extends Optional<UserAttributes, "id"> {}

// Object return from model.create, model.update and model.findOne
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  // user information
  public id!: number;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;

  // timestamps are automatically added
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    // when paranoid is set to true,
    // we do a soft delete on the User when we try to destroy it
    // deleteAt attribute is updated instead
    paranoid: true,
  },
);

export default User;
