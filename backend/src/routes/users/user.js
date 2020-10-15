const express = require("express");
const UserModel = require("./userModel");
const bcrypt = require("bcryptjs");
const protect = require("../../middleware/authMiddleware");
const generateToken = require("../../../utils/generateToken");
const userRouter = express.Router();

//auth a user
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// get user profile(logged in user)

userRouter.get("/profile", protect, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (user) {
      res.status(200).send(user);
    } else {
      const error = new Error(`user with id ${req.user.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// register user
userRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        res.status(400).json({ msg: "user already exists" });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {}
});

module.exports = userRouter;
