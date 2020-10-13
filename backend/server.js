const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const products = require("./src/data/products");

dotenv.config();
server.use(cors());
server.use(express.json());

server.get("/api/products", (req, res) => {
  res.json(products);
});

server.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

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
