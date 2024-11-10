const { Chapter } = require("../models/quizModel");
const { User } = require("../models/userModel");

const addChapters = async (req, res) => {
    const { title, description, correctAnswer, point } = req.body; 
  
    try {
        const newChapter = new Chapter({
            title,
            description,
            correctAnswer,
            point
        });
    
        await newChapter.save();
        res.status(200).json({ success: true, message: "Chapter berhasil ditambahkan", data: newChapter });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Gagal menambahkan chapter", error: error.message });
    }
};

const editChapter = async (req, res) => {
    const { chapterId } = req.params;
    const { title, description, correctAnswer, point } = req.body; 
  
    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(
            chapterId,
            { title, description, correctAnswer, point },
            { new: true, runValidators: true } 
        ).select("title description correctAnswer point");
    
        if (!updatedChapter) {
            return res.status(404).json({ success: false, message: "Course tidak ditemukan" });
        }
    
        res.status(200).json({ success: true, message: "Course berhasil diperbarui", data: updatedChapter });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Gagal memperbarui chapter", error });
    }
};

const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find({}, 'title description point');

        res.status(200).json({ success: true, message: "Berhasil mendapatkan semua chapter", data: chapters });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mendapatkan chapter", error: error.message });
    }
}

const getChapterById = async (req, res) => {
    try {
        const { chapterId } = req.params;
        const chapter = await Chapter.findById(chapterId).select("title description point");
    
        if(!chapter) {
            return res.status(404).json({success: false, message: "Quiz tidak ditemukan"});
        }
    
        res.status(200).json({ success: true, message: "Success", data: chapter });    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error pada server", error });
    }
};

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
    editChapter,
    getAllChapters,
    getChapterById,
    checkAnswer
}