const { User } = require("../models/userModel");

const getLeaderboard = async (req, res) => {
  try {
    const result = await User.find()
      .sort({ score: -1, updateAt: 1 }) 
      .select("username score updateAt"); 

    res.status(200).json({ success: true, message: "Success", data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Gagal menampilkan leaderboard", error });
  }
};

const searchUser = async (req, res) => {
  try {
      const { keyword } = req.body;
  
      const user = await User.find({
          username: { $regex: keyword, $options: 'i' }
      }).select("username score");
  
      res.status(200).json({ success: true, message: "Success", data: user });    
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Terjadi kesalahan saat mencari pengguna", error });
  }
};

module.exports = { 
  getLeaderboard,
  searchUser
};