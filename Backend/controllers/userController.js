const { User } = require("../models/userModel");

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
  
        const user = await User.findById(id).select("username name profile score updatedAt");
  
        if(!user) {
            return res.status(404).json({success: false, message: "User tidak ditemukan"});
        }
    
        const rank = await User.countDocuments({ score: { $gt: user.score } }) + 1;

        const sameScoreRank = await User.countDocuments({
            score: user.score,
            updatedAt: { $lt: user.updatedAt } 
        });

        const finalRank = rank + sameScoreRank;

        res.status(200).json({ success: true, message: "Success", data: { user, rank: finalRank } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error pada server", error });
    }
};

const editProfile = async (req, res) => {
    const { id } = req.params;
    const { name, profile, birthday } = req.body; 

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, profile, birthday },
            { new: true, runValidators: true } 
        ).select("name profile birthday");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Profil berhasil diperbarui", data: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: `Gagal memperbarui profil: ${err.message}` });
    }
};

module.exports = {
    getProfile,
    editProfile
}