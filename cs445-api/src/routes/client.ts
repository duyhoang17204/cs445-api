import express from "express";
import Auth from "../modules/auth/auth.router";

const router = express.Router();

router.use("/", Auth);

export default router;
