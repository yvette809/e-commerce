const jwt = require("jsonwebtoken");
const UserModel = require("../routes/users/userModel");

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //here we want just the token and not the bearer so we split in to an array of to items whre the bearer will be at the zero index and token first
      const token = req.headers.authorization.split(' ')[1]
      // decoded contains the user's id. We verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Token is not valid" });
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports= protect
