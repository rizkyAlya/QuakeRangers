const express = require("express");
const { getProfile, editProfile, editPhoto, getUserProgress, editProgress } = require("../controllers/userController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/:id", getProfile);
router.put("/updateProfile/:id", editProfile);
router.put("/updatePhoto/:id", upload.single("photo"), editPhoto);
router.get("/progress/:id", getUserProgress);
router.put("/progress/:id", editProgress);

module.exports = router;
