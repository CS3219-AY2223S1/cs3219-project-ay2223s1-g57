import { ISimilarQuestions } from "../../db/models/Question";
import { Difficulty } from "../../enums/QuestionEnums";

export interface IQuestion {
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
