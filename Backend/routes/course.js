const express = require("express");
const { addCourse, editCourse, getAllCourses, getCourseById, searchCourse } = require("../controllers/courseController");

const router = express.Router();

router.post("/add", addCourse);
router.put("/edit/:id", editCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/search", searchCourse);

module.exports = router;