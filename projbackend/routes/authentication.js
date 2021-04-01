var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signout,
  signin,
  signup,
  isSignedIn,
} = require("../controllers/authentication");

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "enter a valid password").isLength({
      min: 5,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
