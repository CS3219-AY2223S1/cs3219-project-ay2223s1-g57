import { Router, Request, Response } from "express";
import * as questionController from "../controllers/question";
import {
    CreateQuestionDTO,
    FilterQuestionsDTO,
    UpdateQuestionDTO,
} from "../data_transfer/question.dto";

const questionsRouter = Router();

// Create Question
questionsRouter.post("/", async (req: Request, res: Response) => {
    const payload: CreateQuestionDTO = req.body;
    const result = await questionController.create(payload);
    return res.status(200).json(result);
});

// Update Question by id
questionsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload: UpdateQuestionDTO = req.body;
    const result = await questionController.update(id, payload);
    return res.status(201).json(result);
});

// Delete Question by id
questionsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await questionController.deleteById(id);
    console.log(`result ${result}`);
    return res.status(200).json({
        success: result,
    });
});

// Get Question by difficulty
questionsRouter.get(
    "/difficulty/:difficulty",
    async (req: Request, res: Response) => {
        const difficulty = req.params.difficulty;
        const result = await questionController.getByDifficulty(difficulty);
        return res.status(200).json(result);
    }
);

// Get Question by id
questionsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await questionController.getById(id);
    return res.status(200).json(result);
});

// Get all questions
questionsRouter.get("/", async (req: Request, res: Response) => {
    const filters: FilterQuestionsDTO = req.query;
    const results = await questionController.getAll(filters);
    return res.status(200).json(results);
});

export default questionsRouter;
