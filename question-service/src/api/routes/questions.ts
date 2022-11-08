import { Router, Request, Response } from "express";
import { Difficulty } from "../../enums/QuestionEnums";
import * as questionController from "../controllers/question";
import { authenticateMiddleware } from "../middleware/auth";
import Util from "../util/Util";

const questionsRouter = Router();

// Get Question by difficulty and roomId
questionsRouter.get(
    "/difficulty/:difficulty/:roomId",
    authenticateMiddleware,
    async (req: Request, res: Response) => {
        try {
            const difficulty: Difficulty = (<any>Difficulty)[
                req.params.difficulty.toUpperCase()
            ];

            const roomId: string = req.params.roomId;
            const result = await questionController.getByDifficultyAndRoomId(
                difficulty,
                roomId
            );

            return Util.sendSuccess(res, 200, "Retrieved Question", result);
        } catch (error: unknown) {
            return Util.sendFailure(res, 400, error);
        }
    }
);

export default questionsRouter;
