const { User } = require("../models/userModel");

const getLeaderboard = async (req, res) => {
    try {
      // Mengambil semua user dan mengurutkannya berdasarkan skor tertinggi
      let result;
      result = await User.find().sort({ score: -1 }).select("username score");
  
      res.status(200).json({ success: true, message: "Success", data: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: `Failed to get user: ${err.message}`,
      });
    }
  };

module.exports = { getLeaderboard };