import express from "express";
import CategoryController from "./categories.controller";
const router = express.Router();

router.post("/create", CategoryController.create);
router.get("/", CategoryController.getAll);

export default router;
