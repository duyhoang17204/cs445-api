import { Router } from "express";
import UserController from "./users.controller";

const router = Router();

router.get("/", UserController.getAll);
router.delete("/:id", UserController.deleted);
router.put("/:id", UserController.update);
router.post("/create", UserController.create);

export default router;
