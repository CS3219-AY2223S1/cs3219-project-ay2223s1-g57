import * as service from "../../../db/services/QuestionService";
import {
    CreateQuestionDTO,
    FilterQuestionsDTO,
    UpdateQuestionDTO,
} from "../../data_transfer/question.dto";
import { IQuestion } from "../../interfaces";
import * as mapper from "./mapper";

export const create = async (
    payload: CreateQuestionDTO
): Promise<IQuestion> => {
    const QuestionOutput = await service.create({ ...payload });
    return mapper.toQuestion(QuestionOutput);
};

export const update = async (
    id: string,
    payload: UpdateQuestionDTO
): Promise<IQuestion> => {
    const QuestionOutput = await service.update(id, { ...payload });
    return mapper.toQuestion(QuestionOutput);
};

export const deleteById = async (id: string): Promise<boolean> => {
    return await service.deleteById(id);
};

export const getById = async (id: string): Promise<IQuestion> => {
    const QuestionOutput = await service.getById(id);
    return mapper.toQuestion(QuestionOutput);
};

export const getAll = async (
    filters: FilterQuestionsDTO
): Promise<IQuestion[]> => {
    return (await service.getAll(filters)).map(mapper.toQuestion);
};
