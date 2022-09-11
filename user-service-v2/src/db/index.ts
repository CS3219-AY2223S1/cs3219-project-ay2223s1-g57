import User from "./models/User";
import Token from "./models/JWT";
import { DEV_ENV } from "../config";

const isDev = DEV_ENV === "development";

const dbInit = () => {
  // sync accepts alter or force options
  // force option forces the recreation of a table
  // alter option creates the table if it does not exist or updates
  // the table to match the attributes defined in the model
  User.sync({ alter: isDev });
  Token.sync({ alter: isDev });
};

export default dbInit;
