const express = require("express");
const OrderModel = require("./orderModel");
const bcrypt = require("bcryptjs");
const { auth } = require("../../middleware/authMiddleware");
const generateToken = require("../../../utils/generateToken");
const orderRouter = express.Router();

// create new order

orderRouter.post("/", auth, async(req, res, next) => {
  const {
    orderItems,
    ShippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400).send("no order Items");
  } else {
    const order = new OrderModel({
      orderItems,
      user:req.user._id,
      ShippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  }
});


module.exports= orderRouter
