import { Question } from "../models";
import { IQuestionInput, IQuestionOutput } from "../models/Question";
import { GetAllQuestionsFilters } from "./types";

export const create = async (
    payload: IQuestionInput
): Promise<IQuestionOutput> => {
    const question = await Question.create(payload);
    return question;
};

export const update = async (
    id: string,
    payload: Partial<IQuestionInput>
): Promise<IQuestionOutput> => {
    const question = await Question.findByPk(id);

    if (!question) {
        throw new Error("Question not found!");
    }

    const updatedQuestion = await question.update(payload);
    return updatedQuestion;
};

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedQuestionCount = await Question.destroy({
        where: { id: id },
    });

    return !!deletedQuestionCount;
};

export const getById = async (id: string): Promise<IQuestionOutput> => {
    const question = await Question.findByPk(id);

    if (!question) {
        throw new Error("Question not found!");
    }

    return question;
};

// TODO update to filter via filters
export const getAll = async (
    filters?: GetAllQuestionsFilters
): Promise<IQuestionOutput[]> => {
    return Question.findAll();
};
