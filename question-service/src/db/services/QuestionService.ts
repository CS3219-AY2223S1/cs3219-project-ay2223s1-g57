import * as questionRepository from "../repository/question";
import { IQuestionOutput } from "../models/Question";
import { Difficulty } from "../../enums/QuestionEnums";

export const getByDifficultyAndRoomId = (
    difficulty: Difficulty,
    roomId: string
): Promise<IQuestionOutput> => {
    return questionRepository.getByDifficultyAndRoomId(difficulty, roomId);
};
