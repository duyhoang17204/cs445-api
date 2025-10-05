import { Router } from "express";
import UserController from "./users.controller";

const router = Router();

router.get("/", UserController.getAll);
router.delete("/:id", UserController.deleted);

export default router;
