const express = require("express");
const { addChapters, editChapter, getAllChapters, getChapterById, checkAnswer } = require("../controllers/quizController");

const router = express.Router();

router.post("/add", addChapters);
router.put("/edit/:chapterId", editChapter);
router.get("/", getAllChapters);
router.get("/:chapterId", getChapterById);
router.post("/submit/:chapterId", checkAnswer);

module.exports = router;
