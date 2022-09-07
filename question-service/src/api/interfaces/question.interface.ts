import { ISimilarQuestions } from "../../db/models/Question";

export interface IQuestion {
    id: number;
    title: string;
    url: string;
    difficulty: string;
    prompt: string;
    examples: string[];
    constraints: string[];
    related_topics: string[];
    similar_questions: ISimilarQuestions[];

    // timestamps! (Will be updated by sequelize)
    createdAt?: Date;
    updatedAt?: Date;
}
