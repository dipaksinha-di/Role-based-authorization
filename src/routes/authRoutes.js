const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

//REGISTER
router.post("/register", register); //here ther "/register" is endpoint and the "register" after comma (,) is the controller function, we can also write the function directly here instead of importing from controller file.

//LOGIN
router.post("/login", login);

module.exports = router;
