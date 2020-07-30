const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const UserSchema = require("../Schemas/User");

// router.get("/", function (req, res) {
//   res.send("users");
// });

//#region register router

router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async function (req, res) {
    try {
      let { email, password } = req.body;
      let user = await UserSchema.findOne({ email: email });

      const errors = validationResult(req); // array of errors
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }

      if (user) {
        return res
          .status(401)
          .json({ message: "Email is already registered." });
      }

      let salt = await bcryptjs.genSalt(10);
      encryptePassword = await bcryptjs.hash(password, salt);

      user = new UserSchema({
        email,
        password: encryptePassword,
      });

      let payload = {
        user: {
          // this id comes from userCreateIndex
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret", { expiresIn: 60 * 60 * 12 }),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      await user.save();
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
  }
);

//#endregion

// //#region login Router

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await UserSchema.findOne({ email });

      const errors = validationResult(req); // array of errors
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }

      if (!user) {
        return res.status(401).json({ msg: "User not found with this email" });
      }

      let isPassword = await bcryptjs.compare(password, user.password);

      if (isPassword) {
        let payload = {
          user: {
            // this id comes from userCreateIndex
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret", { expiresIn: 60 * 60 * 12 }),
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        return res.status(401).json({ msg: "Incorrect Password" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
  }
);

//#endregion

module.exports = router;
// https://youtu.be/sPHpEvyA3fc?list=PL9t4T-rEV6saMSC3ZOVrB1fCtDhEGcREG&t=888
