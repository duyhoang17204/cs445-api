import express from "express";
import ProductController from "./products.controller";
const router = express.Router();

router.post("/create", ProductController.create);

export default router;
