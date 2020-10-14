const express = require("express");
const ProductModel = require("./productModel");
const productRouter = express.Router();
const productModel = require("./productModel");

//get all products
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ message: "products not found" });
    }
  } catch (error) {
    next(error);
  }
});

//get products by id
productRouter.get("/:id", async (req, res, next) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).json({ message: `product with id ${req.params.id} not found` });
      }
    } catch (error) {
      next(error);
    }
  });


module.exports = productRouter;
