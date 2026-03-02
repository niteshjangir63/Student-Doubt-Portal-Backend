const express = require("express");
const router = express.Router();
const {createDoubt,getDoubt,doubtById,answerDoubt,editDoubt,deleteDoubt} = require("../controller/doubt");
const authMiddleware = require("../middleware/AuthMiddleware")

router.post("/", authMiddleware(["student"]), createDoubt);
router.get("/", authMiddleware(["student", "teacher"]), getDoubt);
router.get("/:id", authMiddleware(["teacher","student"]), doubtById);
router.put("/:id", authMiddleware(["teacher"]), answerDoubt);
router.put("/edit/:id", authMiddleware(["student"]), editDoubt);
router.delete("/delete/:id", authMiddleware(["student"]), deleteDoubt);
module.exports = router;