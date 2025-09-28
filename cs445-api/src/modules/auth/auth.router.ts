import express from "express";
import Controller from "./auth.controller";

const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.loginByUser);
router.post("/verify-login", Controller.verifyLogin);

export default router;
