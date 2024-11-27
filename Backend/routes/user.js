const express = require("express");
const { getProfile, editProfile } = require("../controllers/userController");
const upload = require("../config/upload");

const router = express.Router();

router.get("/:id", getProfile);
router.put("/updateProfile/:id", upload.single("photo"), editProfile);

module.exports = router;
