import express from "express";
import Auth from "../modules/auth/auth.router";
import Products from "../modules/products/products.router";
import Category from "../modules/categories/categories.router";
import Users from "../modules/users/users.router";
import BuyProducts from "../modules/buy-products/buyProduct.router";

const router = express.Router();

router.use("/", Auth);
router.use("/products", Products);
router.use("/categories", Category);
router.use("/users", Users);
router.use("/buy-products", BuyProducts);

export default router;
