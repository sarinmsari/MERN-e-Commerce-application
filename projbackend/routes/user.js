const express = require("express");
const router = express.Router();

const { getUser, getUserById, updateUser, userPurchaseList } = require("../controllers/user");
const {
  isAuthenticated,
  isAdmin,
  isSignedIn,
} = require("../controllers/authentication");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;
