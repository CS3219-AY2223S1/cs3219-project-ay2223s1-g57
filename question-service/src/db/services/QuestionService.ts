import * as questionRepository from "../repository/question";
import { GetAllQuestionsFilters } from "../repository/types";
import { IQuestionInput, IQuestionOutput } from "../models/Question";

export const create = (payload: IQuestionInput): Promise<IQuestionOutput> => {
    return questionRepository.create(payload);
};

export const update = (
    id: string,
    payload: Partial<IQuestionInput>
): Promise<IQuestionOutput> => {
    return questionRepository.update(id, payload);
};

export const deleteById = (id: string): Promise<boolean> => {
    return questionRepository.deleteById(id);
};

export const getByDifficulty = (
    difficulty: string
): Promise<IQuestionOutput> => {
    return questionRepository.getByDifficulty(difficulty);
};

export const getById = (id: string): Promise<IQuestionOutput> => {
    return questionRepository.getById(id);
};

export const getAll = (
    filters?: GetAllQuestionsFilters
): Promise<IQuestionOutput[]> => {
    return questionRepository.getAll(filters);
};
