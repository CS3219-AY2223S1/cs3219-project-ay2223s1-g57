import { Router, Request, Response } from "express";
import * as questionController from "../controllers/question";
import {
    CreateQuestionDTO,
    FilterQuestionsDTO,
    UpdateQuestionDTO,
} from "../data_transfer/question.dto";

const questionsRouter = Router();

questionsRouter.post("/", async (req: Request, res: Response) => {
    const payload: CreateQuestionDTO = req.body;
    const result = await questionController.create(payload);
    return res.status(200).json(result);
});

questionsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload: UpdateQuestionDTO = req.body;
    const result = await questionController.update(id, payload);
    return res.status(201).json(result);
});

questionsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await questionController.deleteById(id);
    console.log(`result ${result}`);
    return res.status(200).json({
        success: result,
    });
});

questionsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await questionController.getById(id);
    return res.status(200).json(result);
});

questionsRouter.get("/", async (req: Request, res: Response) => {
    const filters: FilterQuestionsDTO = req.query;
    const results = await questionController.getAll(filters);
    return res.status(200).json(results);
});

export default questionsRouter;
