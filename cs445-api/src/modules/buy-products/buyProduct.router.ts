import express from "express";
import BuyProductController from "./buyProduct.controller";
const router = express.Router();

router.post("/create", BuyProductController.create);
router.get("/", BuyProductController.getAll);

export default router;
