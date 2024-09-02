import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { validateToken } from "../utils/libby.js";

const router = Router();

router.get("/", validateToken, getAllUsers);

export default router;