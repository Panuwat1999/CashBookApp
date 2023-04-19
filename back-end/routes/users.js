var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await Users.find();
    return res.status(200).send({
      data: users,
      message: "success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "fail!!",
      success: false,
    });
  }
});

//POST create user
router.post("/", async function (req, res, next) {
  try {
    let { username, password, fullname } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let newUser = new Users({
      username,
      password: hashPassword,
      fullname,
    });
    const user = await newUser.save();
    return res.send(200).send({
      data: { _id: user._id, username, fullname },
      message: "create user success!!",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "create fail!!",
      success: false,
    });
  }
});

//POST login
router.post("/login", async function (req, res, nexr) {
  try {
    let { username, password } = req.body;
    let user = await Users.findOne({
      username: username,
    });
    if (!user) {
      return res.status(500).send({
        message: "login fail!!",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "login fail!!",
        success: false,
      });
    }
    const { _id, fullname } = user;
    const token = jwt.sign({ _id, fullname }, process.env.JWT_KEY);
    return res.status(201).send({
      data: { _id, fullname, token },
      message: "login success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "login fail!!",
      success: false,
    });
  }
});

module.exports = router;
