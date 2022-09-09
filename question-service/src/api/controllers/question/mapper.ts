import { IQuestionOutput } from "../../../db/models/Question";
import { IQuestion } from "../../interfaces";

// maps data from db layer to api layer
export const toQuestion = ({
    id,
    title,
    url,
    difficulty,
    prompt,
    examples,
    constraints,
    related_topics,
    similar_questions,
    createdAt,
    updatedAt,
}: IQuestionOutput): IQuestion => {
    return {
        id,
        title,
        url,
        difficulty,
        prompt,
        examples,
        constraints,
        related_topics,
        similar_questions,
        createdAt,
        updatedAt,
    };
};
