const express = require("express");
const OrderModel = require("./orderModel");
const bcrypt = require("bcryptjs");
const { auth } = require("../../middleware/authMiddleware");
const generateToken = require("../../../utils/generateToken");
const orderRouter = express.Router();

// create new order

orderRouter.post("/", auth, async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new OrderModel({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//get order by id
orderRouter.get("/:id", auth, async (req, res, next) => {
  try {
    const order = await (await OrderModel.findById(req.params.id)).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      const error = new Error(`order with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
