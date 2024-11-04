const express = require("express");
const { getProfile, editProfile } = require("../controllers/userController");

const router = express.Router();

router.get("/profile/:id", getProfile);
router.put("/updateProfile/:id", editProfile);

module.exports = router;
