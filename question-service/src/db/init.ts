import { Question } from "./models";

const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
    Question.sync({ alter: isDev });
};

export default dbInit;
