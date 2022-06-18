require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection succesfull!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  console.log("here");
});

app.use(cors());
app.use(express.json());
app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/products", productRoute);
app.use("/backend/carts", cartRoute);
app.use("/backend/orders", orderRoute);
app.use("/backend/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
