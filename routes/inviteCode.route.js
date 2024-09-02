import { joinByInviteCode } from "../controllers/inviteCode.controller.js";
import { validateToken } from "../utils/libby.js";
import express from "express";
import { Router } from "express";
const router = Router();

router.post("/join", validateToken, joinByInviteCode);

export default router;
