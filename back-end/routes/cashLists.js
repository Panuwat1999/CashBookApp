var express = require("express");
var router = express.Router();
const cashListsModel = require("../models/cashlist");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/jwt_decode");

/* GET method */
router.get("/", verifyToken, async function (req, res, next) {
  try {
    let cashLists = await cashListsModel.find();
    return res.status(200).send({
      data: cashLists,
      message: "success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "server error",
      success: false,
    });
  }
});

//GET By ID
router.get("/:id", verifyToken, async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "ID invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    let cashLists = await cashListsModel.findById(id);
    return res.status(200).send({
      data: cashLists,
      message: "success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "server error",
      success: false,
    });
  }
});

//Post method
router.post("/", async function (req, res, next) {
  try {
    const { cash_type, cash_name, cash_amount } = req.body;
    let newCashList = new cashListsModel({
      cash_type: cash_type,
      cash_name: cash_name,
      cash_amount: cash_amount,
      cash_date: new Date(),
    });
    let cashlist = await newCashList.save();
    return res.status(201).send({
      data: cashlist,
      message: "create success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "create fail",
      success: false,
    });
  }
});

/* PUT users listing. */
router.put("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    } else {
      await cashListsModel.updateOne({ _id: id }, { $set: req.body });
    }

    let cashlist = await cashListsModel.findById(id);
    return res.status(201).send({
      data: cashlist,
      message: "Update success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Update fail",
      success: false,
    });
  }
});

/* DELETE users listing. */
router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    } else {
      await cashListsModel.deleteOne({ _id: id });
    }

    let cashlists = await cashListsModel.find();
    return res.status(200).send({
      data: cashlists,
      message: "Delete success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Delete fail",
      success: false,
    });
  }
});

module.exports = router;
