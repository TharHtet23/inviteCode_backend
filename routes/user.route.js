import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { validateToken } from "../utils/libby.js";

const router = Router();

router.get("/", validateToken, getAllUsers);
router.get("/info", validateToken, getUser);

export default router;