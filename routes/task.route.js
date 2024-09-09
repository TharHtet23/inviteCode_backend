import express from "express";
import { getTasks, createTask, getTaskbyId, editTask, deleteTask, completeTask } from "../controllers/task.controller.js";
import { validateToken } from "../utils/libby.js";

const router = express.Router();

router.get("/", validateToken, getTasks);
router.post("/create", validateToken, createTask);
router.get("/:taskId", validateToken, getTaskbyId);
router.put("/:taskId", validateToken, editTask);
router.delete("/:taskId", validateToken, deleteTask);
router.post("/complete/:taskId", validateToken, completeTask);

export default router;