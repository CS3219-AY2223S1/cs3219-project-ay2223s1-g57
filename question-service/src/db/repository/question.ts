import { Difficulty } from "../../enums/QuestionEnums";
import { Question } from "../models";
import { IQuestionOutput } from "../models/Question";

export const getByDifficultyAndRoomId = async (
    difficulty: Difficulty,
    roomId: string
): Promise<IQuestionOutput> => {
    const questions = await Question.findAll({
        where: {
            difficulty: difficulty,
        },
    });

    // Hash roomId
    let hash = 0;
    for (let i = 0; i < roomId.length; i++) {
        let char = roomId.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }

    const questions_length = questions.length;
    // Ensure idx is positive
    const idx =
        ((hash % questions_length) + questions_length) % questions_length;
    return questions[idx];
};
