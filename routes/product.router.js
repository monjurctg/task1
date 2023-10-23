const express = require("express");
const productController = require("../controlers/product.controler");

const router = express.Router();

router.post("/buy-product/:id",productController.buyProduct)
router.get("/accept/:id",productController.productAccept)





module.exports = router;
