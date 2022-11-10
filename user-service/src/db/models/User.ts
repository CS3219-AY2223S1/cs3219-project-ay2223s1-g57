import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../../config";

// User attributes
interface UserAttributes {
  // user information
  username: string;
  password: string;
}

// Object type passed to Sequelize's model.create
export interface UserInput extends Optional<UserAttributes, "username"> {}

// Object return from model.create, model.update and model.findOne
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  // user information
  public username!: string;
  public password!: string;

  // timestamps are automatically added
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: sequelizeConnection,
    // when paranoid is set to true,
    // we do a soft delete on the User when we try to destroy it
    // deleteAt attribute is updated instead
    paranoid: true,
  },
);

export default User;
