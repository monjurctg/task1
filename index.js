const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")

const usersRouter = require("./routes/users.router");
const productsRouter = require("./routes/product.router");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())



app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running ....");
});
