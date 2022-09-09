import { Optional } from "sequelize";
import { ISimilarQuestions } from "../../db/models/Question";

export type CreateQuestionDTO = {
    title: string;
    url: string;
    difficulty: string;
    prompt: string;
    examples: string[];
    constraints: string[];
    related_topics: string[];
    similar_questions: ISimilarQuestions[];
};

export type UpdateQuestionDTO = Optional<
    CreateQuestionDTO,
    | "title"
    | "url"
    | "difficulty"
    | "prompt"
    | "examples"
    | "constraints"
    | "related_topics"
    | "similar_questions"
>;

// TODO update filtersDTO
export type FilterQuestionsDTO = {};
