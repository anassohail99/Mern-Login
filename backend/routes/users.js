const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// router.get("/", function (req, res) {
//   res.send("users");
// });

router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async function (req, res) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req); // array of errors
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      res.send("Data is correct");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
  }
);

module.exports = router;
