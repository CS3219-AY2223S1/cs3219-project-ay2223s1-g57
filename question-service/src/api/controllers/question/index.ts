import * as service from "../../../db/services/QuestionService";
import { Difficulty } from "../../../enums/QuestionEnums";
import { IQuestion } from "../../interfaces";
import * as mapper from "./mapper";

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
