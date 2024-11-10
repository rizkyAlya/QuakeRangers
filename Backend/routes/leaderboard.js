const express = require("express");
const { getLeaderboard, searchUser } = require("../controllers/leadController");

const router = express.Router();

router.get("/", getLeaderboard);
router.post("/search", searchUser);

module.exports = router;
