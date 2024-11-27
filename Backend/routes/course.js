const express = require("express");
const { addCourse, editCourse, getAllCourses, getCourseById, deleteCourseById, searchCourse } = require("../controllers/courseController");
const upload = require("../config/upload");
const router = express.Router();

router.post("/add", upload.single("image"), addCourse);
router.put("/edit/:id", upload.single("image"), editCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourseById);
router.post("/search", searchCourse);

module.exports = router;