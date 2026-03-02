const express = require("express");
const router = express.Router();
const {passwordUpdate} = require("../controller/passwordUpdate")

router.post("/update",passwordUpdate)


module.exports = router;