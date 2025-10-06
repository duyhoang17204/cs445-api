import express from "express";
import ProductController from "./products.controller";
const router = express.Router();

router.post("/create", ProductController.create);
router.get("/", ProductController.getAll);
router.put("/:id", ProductController.update);

export default router;
