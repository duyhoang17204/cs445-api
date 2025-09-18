import express, { NextFunction, Request, Response } from "express";
import client from "./client";

const router = express.Router();

router.use("/", client);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    message: err.message,
  });
});

export default router;
