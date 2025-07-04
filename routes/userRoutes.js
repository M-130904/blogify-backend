const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // ✅ Import controller
const verifyToken = require("../middlewares/authMiddleware");     // ✅ Auth middleware

// ✅ Public Routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// ✅ Protected Routes
router.get("/profile", verifyToken, userController.getProfile);
router.post("/logout", verifyToken, userController.logoutUser);  // ✅ Moved here properly

module.exports = router;

