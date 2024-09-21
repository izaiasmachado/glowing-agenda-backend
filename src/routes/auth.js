const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post(
  "/register",
  AuthMiddleware.validateUserCreation,
  AuthController.register
);
router.post("/login", AuthMiddleware.validateUserLogin, AuthController.login);

module.exports = router;
