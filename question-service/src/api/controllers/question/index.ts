import * as service from "../../../db/services/QuestionService";
import { Difficulty } from "../../../enums/QuestionEnums";
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
  const questionOutput = await service.create({ ...payload });
  return mapper.toQuestion(questionOutput);
};

export const update = async (
  id: number,
  payload: UpdateQuestionDTO
): Promise<IQuestion> => {
  const questionOutput = await service.update(id, { ...payload });
  return mapper.toQuestion(questionOutput);
};

export const deleteById = async (id: number): Promise<boolean> => {
  return await service.deleteById(id);
};

export const getByDifficulty = async (
  difficulty: Difficulty
): Promise<IQuestion> => {
  if (difficulty === undefined) {
    throw Error(
      `Difficulty must be in [${[
        Difficulty.EASY,
        Difficulty.MEDIUM,
        Difficulty.HARD,
      ]}]`
    );
  }

  const questionOutput = await service.getByDifficulty(difficulty);
  return mapper.toQuestion(questionOutput);
};

export const getByDifficultyAndRoomId = async (
  difficulty: Difficulty,
  roomId: string
): Promise<IQuestion> => {
  if (difficulty === undefined) {
    throw Error(
      `Difficulty must be in [${[
        Difficulty.EASY,
        Difficulty.MEDIUM,
        Difficulty.HARD,
      ]}]`
    );
  }

  const questionOutput = await service.getByDifficultyAndRoomId(
    difficulty,
    roomId
  );
  return mapper.toQuestion(questionOutput);
};

export const getById = async (id: number): Promise<IQuestion> => {
  const questionOutput = await service.getById(id);
  return mapper.toQuestion(questionOutput);
};

export const getAll = async (
  filters: FilterQuestionsDTO
): Promise<IQuestion[]> => {
  return (await service.getAll(filters)).map(mapper.toQuestion);
};
