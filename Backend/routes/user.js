const express = require("express");
const { getProfile, editProfile, getUserProgress, editProgress } = require("../controllers/userController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/:id", getProfile);
router.put("/updateProfile/:id", upload.single("photo"), editProfile);
router.get("/progress/:id", getUserProgress);
router.put("/progress/:id", editProgress);

module.exports = router;
