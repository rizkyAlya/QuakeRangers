const { User } = require("../models/userModel");

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
  
        const user = await User.findById(id).select("gender age score username email name profile");
  
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
    const { name, gender, age } = req.body; 

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                gender,
                age,
            },
            { new: true, runValidators: true }
        ).select(" name profile age gender ");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Profil berhasil diperbarui", data: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: `Gagal memperbarui profil: ${err.message}` });
    }
};

const editPhoto = async (req, res) => {
    const { id } = req.params;
    const profile = req.file;

    try {
        const photoPath = profile ? `/uploads/${profile.filename}` : null;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                profile: photoPath,
            },
            { new: true, runValidators: true }
        ).select(" profile ");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Foto profil berhasil diperbarui", data: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: `Gagal memperbarui foto profil: ${err.message}` });
    }
};

const getUserProgress = async (req, res) => {
    try {
        const { id } = req.params;
  
        const user = await User.findById(id).select(" score lives progress ");
  
        if(!user) {
            return res.status(404).json({success: false, message: "User tidak ditemukan"});
        }

        res.status(200).json({ success: true, message: "Success", data: { user } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error pada server", error });
    }
};

const editProgress = async (req, res) => {
    const { id } = req.params;
    const { lives, score, progress } = req.body; 

    // Ambil data pengguna sebelumnya
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }

    // Membuat object update hanya untuk properti yang dikirim
    const updateData = {};

    if (lives !== undefined) {
        updateData.lives = lives;
    }

    if (score !== undefined) {
        updateData.score = score;
    }

    if (progress !== undefined) {
        updateData.progress = progress;
    }

    try {
        // Update hanya properti yang ada di updateData
        const updatedProgress = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select("progress lives score");

        if (!updatedProgress) {
            return res.status(404).json({ success: false, message: "User tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Progress berhasil diperbarui", data: updatedProgress });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: `Gagal memperbarui progress: ${err.message}` });
    }
};


module.exports = {
    getProfile,
    editProfile,
    editPhoto,
    getUserProgress,
    editProgress
}