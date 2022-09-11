import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../../config";

// User attributes
interface TokenAttributes {
  // user information
  token: string;
}

// Object type passed to Sequelize's model.create
export interface TokenInput extends Optional<TokenAttributes, "token"> {}

// Object return from model.create, model.update and model.findOne
export interface TokenOutput extends Required<TokenAttributes> {}

class Token
  extends Model<TokenAttributes, TokenInput>
  implements TokenAttributes
{
  public token!: string;
}

Token.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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

export default Token;
