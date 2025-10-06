import express from "express";
import reviewsController from "./reviews.controller";

const router = express.Router();

router.post("/", reviewsController.create);
router.get("/:product_id", reviewsController.getByProduct);
router.put("/:id", reviewsController.update);
router.delete("/:id", reviewsController.deleted);

export default router;
