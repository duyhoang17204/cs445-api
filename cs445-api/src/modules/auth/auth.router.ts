import express from "express";
import Controller from "./auth.controller";

const router = express.Router();

router.post("/register", Controller.register);

export default router;
