import { Router, Request, Response } from "express";
import * as questionController from "../controllers/question";
import {
    CreateQuestionDTO,
    FilterQuestionsDTO,
    UpdateQuestionDTO,
} from "../data_transfer/question.dto";
import Util from "../util/Util";

const questionsRouter = Router();

// Create Question
questionsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const payload: CreateQuestionDTO = req.body;
        const result = await questionController.create(payload);
        return Util.sendSuccess(res, 201, "Added Question", result);
    } catch (error: unknown) {
        return Util.sendFailure(res, 400, error);
    }
});

// Update Question by id
questionsRouter.patch("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const payload: UpdateQuestionDTO = req.body;
        const result = await questionController.update(id, payload);
        return Util.sendSuccess(res, 200, "Updated Question", result);
    } catch (error: unknown) {
        return Util.sendFailure(res, 400, error);
    }
});

// Delete Question by id
questionsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await questionController.deleteById(id);
        return Util.sendSuccess(res, 200, "Deleted Question", result);
    } catch (error: unknown) {
        return Util.sendFailure(res, 400, error);
    }
});

// Get Question by difficulty
questionsRouter.get(
    "/difficulty/:difficulty",
    async (req: Request, res: Response) => {
        try {
            const difficulty = req.params.difficulty;
            const result = await questionController.getByDifficulty(difficulty);
            return Util.sendSuccess(res, 200, "Retrieved Question", result);
        } catch (error: unknown) {
            return Util.sendFailure(res, 400, error);
        }
    }
);

// Get Question by id
questionsRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await questionController.getById(id);
        return Util.sendSuccess(res, 200, "Retrieved Question", result);
    } catch (error: unknown) {
        return Util.sendFailure(res, 400, error);
    }
});

// Get all questions
questionsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const filters: FilterQuestionsDTO = req.query;
        const results = await questionController.getAll(filters);
        return Util.sendSuccess(res, 200, "Retrieved all Question", results);
    } catch (error: unknown) {
        return Util.sendFailure(res, 400, error);
    }
});

export default questionsRouter;
