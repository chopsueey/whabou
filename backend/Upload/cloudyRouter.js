import express from "express";

import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;