import express from "express";
import { getTasks, createTask, getTaskbyId, editTask, deleteTask } from "../controllers/task.controller.js";
import { validateToken } from "../utils/libby.js";

const router = express.Router();

router.get("/", validateToken, getTasks);
router.post("/create", validateToken, createTask);
router.get("/:taskId", validateToken, getTaskbyId);
router.put("/:taskId", validateToken, editTask);
router.delete("/:taskId", validateToken, deleteTask);

export default router;