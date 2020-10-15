const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const products = require("./src/data/products");
const productRouter = require("./src/routes/products/product");
const userRouter = require("./src/routes/users/user");

const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./src/middleware/errorMiddleware");

dotenv.config();
server.use(cors());
server.use(express.json());

server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler)

//routes
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);

// connect database
const port = process.env.PORT || 4070;
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`server running on port ${port}`);
    })
  )
  .catch((error) => console.log(error));

// server.listen(port, ()=>{
//     console.log(`server is running on port ${port}`)
// })
