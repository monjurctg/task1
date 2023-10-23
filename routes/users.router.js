const express = require("express");
const usersController = require("../controlers/users.controler");
const router = express.Router();

router.get("/", usersController.getAll);

module.exports = router;
