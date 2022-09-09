import * as questionRepository from "../repository/question";
import { GetAllQuestionsFilters } from "../repository/types";
import { IQuestionInput, IQuestionOutput } from "../models/Question";
import { Difficulty } from "../../enums/QuestionEnums";

export const create = (payload: IQuestionInput): Promise<IQuestionOutput> => {
    return questionRepository.create(payload);
};

export const update = (
    id: number,
    payload: Partial<IQuestionInput>
): Promise<IQuestionOutput> => {
    return questionRepository.update(id, payload);
};

export const deleteById = (id: number): Promise<boolean> => {
    return questionRepository.deleteById(id);
};

export const getByDifficulty = (
    difficulty: Difficulty
): Promise<IQuestionOutput> => {
    return questionRepository.getByDifficulty(difficulty);
};

export const getById = (id: number): Promise<IQuestionOutput> => {
    return questionRepository.getById(id);
};

export const getAll = (
    filters?: GetAllQuestionsFilters
): Promise<IQuestionOutput[]> => {
    return questionRepository.getAll(filters);
};
