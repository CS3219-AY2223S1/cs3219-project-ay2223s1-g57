import { DataTypes, Model, Optional } from "sequelize";
import { Difficulty } from "../../enums/QuestionEnums";
import sequelizeConnection from "../config";

export interface ISimilarQuestions {
    title: string;
    url: string;
    difficulty: Difficulty;
}

interface IQuestionAttributes {
    id: number;
    title: string;
    url: string;
    difficulty: Difficulty;
    prompt: string;
    examples: string[];
    constraints: string[];
    related_topics: string[];
    similar_questions: ISimilarQuestions[];

    // timestamps! (Will be updated by sequelize)
    createdAt?: Date;
    updatedAt?: Date;
}

// inputs to model.create()
export interface IQuestionInput
    extends Optional<IQuestionAttributes, "id" | "createdAt" | "updatedAt"> {}

// outputs from model.create(), model.update(), model.findOne() etc.
export interface IQuestionOutput extends Required<IQuestionAttributes> {}

class Question
    extends Model<IQuestionAttributes, IQuestionInput>
    implements IQuestionAttributes
{
    public id!: number;
    public title!: string;
    public url!: string;
    public difficulty!: Difficulty;
    public prompt!: string;
    public examples!: string[];
    public constraints!: string[];
    public related_topics!: string[];
    public similar_questions!: ISimilarQuestions[];

    // timestamps! (Will be updated by sequelize)
    public createdAt!: Date;
    public updatedAt!: Date;
}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.ENUM(
                Difficulty.EASY,
                Difficulty.MEDIUM,
                Difficulty.HARD
            ),
            allowNull: false,
        },
        prompt: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
        },
        examples: {
            type: DataTypes.ARRAY(DataTypes.TEXT("long")),
            allowNull: false,
        },
        constraints: {
            type: DataTypes.ARRAY(DataTypes.TEXT("long")),
            allowNull: false,
        },
        related_topics: {
            type: DataTypes.ARRAY(DataTypes.TEXT("long")),
            allowNull: false,
        },
        similar_questions: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        timestamps: true,
        indexes: [
            {
                // Create index based on difficulty
                fields: ["difficulty"],
            },
        ],
    }
);

export default Question;
