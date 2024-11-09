const { Chapter } = require("../models/quizModel");
const { User } = require("../models/userModel");

const addChapters = async (req, res) => {
    const { chapterTitle, chapterDesc, correctAnswer, point } = req.body; 
  
    try {
        const newChapter = new Chapter({
            chapterTitle,
            chapterDesc,
            correctAnswer,
            point
        });
    
        await newChapter.save();
        res.status(200).json({ success: true, message: "Chapter berhasil ditambahkan", data: newChapter });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: `Gagal menambahkan chapter: ${err.message}` });
    }
};

const getAllChapters = async (req, res) => {
    try {
        // Mengambil semua chapter dan memilih field yang diperlukan
        const chapters = await Chapter.find({}, 'chapterTitle chapterDesc point');

        res.status(200).json({ success: true, message: "Chapters retrieved successfully", data: chapters });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to retrieve chapters", error: error.message });
    }
}

const checkAnswer = async (req, res) => {
    const { chapterId } = req.params;
    const { userId, userAnswer } = req.body;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({ success: false, message: "User tidak ditemukan" });
        }

        const chapter = await Chapter.findById(chapterId);
        if(!chapter) {
            return res.status(400).json({ success: false, message: "Chapter tidak ditemukan" });
        }

        if (userAnswer == chapter.correctAnswer) {
            user.score += chapter.point;
            await user.save();
            
            return res.status(200).json({ success: true, message: "Jawaban benar" });
        } 
        return res.status(200).json({ success: true, message: "Jawaban salah" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
    }
}

module.exports = {
    addChapters,
    getAllChapters,
    checkAnswer
}