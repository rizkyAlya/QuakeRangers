const express = require("express");
const { addChapters, getAllChapters, checkAnswer } = require("../controllers/quizController");

const router = express.Router();

router.post("/addChapter", addChapters);
router.get("/getChapters", getAllChapters);
router.post("/submitAnswer/:chapterId", checkAnswer);

module.exports = router;
