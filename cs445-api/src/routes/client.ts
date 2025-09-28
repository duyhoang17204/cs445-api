import express from "express";
import Auth from "../modules/auth/auth.router";
import Products from "../modules/products/products.router";
import Category from "../modules/categories/categories.router";

const router = express.Router();

router.use("/", Auth);
router.use("/products", Products);
router.use("/categories", Category);

export default router;
