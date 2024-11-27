const { Course } = require("../models/courseModel");

const addCourse = async (req, res) => {
    const { title, description, video, content } = req.body; 
    const image = req.file;
  
    try {
        const photoPath = image ? `/uploads/${image.filename}` : null;

        const newCourse = new Course({
            title,
            description,
            image: photoPath,
            video,
            content
        });
    
        await newCourse.save();
        res.status(200).json({ success: true, message: "Course berhasil ditambahkan", data: newCourse });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Gagal menambahkan course", error: error.message });
    }
};

const editCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, video, content } = req.body; 
    const image = req.file;
  
    try {
        const photoPath = image ? `/uploads/${image.filename}` : null;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { 
                title, 
                description, 
                image: photoPath, 
                video, 
                content 
            },
            { new: true, runValidators: true } 
        ).select("title description image video content");
    
        if (!updatedCourse) {
            return res.status(404).json({ success: false, message: "Course tidak ditemukan" });
        }
    
        res.status(200).json({ success: true, message: "Course berhasil diperbarui", data: updatedCourse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Gagal memperbarui course", error });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const course = await Course.find({}, 'image title description');

        res.status(200).json({ success: true, message: "Berhasil mendapatkan semua course", data: course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mendapatkan course", error: error.message });
    }
}

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).select("title createdAt content video");
    
        if(!course) {
            return res.status(404).json({success: false, message: "Course tidak ditemukan"});
        }
    
        res.status(200).json({ success: true, message: "Success", data: course });    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error pada server", error });
    }
};

const deleteCourseById = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedCourse = await Course.findByIdAndDelete(id);
    
        if (!deletedCourse) {
            return res.status(404).json({ success: false, message: "Course tidak ditemukan", error});
        }
    
        res.status(200).json({ success: true, message: "Course berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error pada server", error });
    }
}


const searchCourse = async (req, res) => {
    try {
        const { keyword } = req.body;
    
        const courses = await Course.find({
            title: { $regex: keyword, $options: 'i' }
        }).select("title description");
    
        res.status(200).json({ success: true, message: "Success", data: courses });    
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan saat mencari course", error });
    }
};

module.exports = {
    addCourse,
    editCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById,
    searchCourse
}