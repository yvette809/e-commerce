const express = require("express");
const ProductModel = require("./productModel");
const productRouter = express.Router();
const { auth, admin } = require("../../middleware/authMiddleware");
const productModel = require("./productModel");

// //get all products
// productRouter.get("/", async (req, res, next) => {
//   try {
//     const products = await ProductModel.find();
//     if (products) {
//       res.status(200).send(products);
//     } else {
//       res.status(404).json({ message: "products not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

//get all products with pagination
productRouter.get("/", async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await ProductModel.countDocuments({ ...keyword });
  const products = await ProductModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//get products by id
productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res
        .status(404)
        .json({ message: `product with id ${req.params.id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

// delete products
productRouter.delete("/:id", auth, admin, async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send("product removed");
    } else {
      const error = new Error(`product with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// create product

productRouter.post("/", auth, admin, async (req, res) => {
  const product = new ProductModel({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
productRouter.put("/:id", auth,admin, async (req, res, next) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  try {
    const product = await ProductModel.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      const error = new Error(`product with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// create new review
productRouter.post("/:id/reviews", async(req,res,next)=>{
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

module.exports = productRouter;
