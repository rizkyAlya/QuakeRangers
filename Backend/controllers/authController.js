const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

// Register User
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Memeriksa apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat user baru
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error pada server", error });
  }
};

// Login User
const userLogin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Memeriksa apakah akun user terdaftar dengan email atau username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    // Verifikasi password user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    // Membuat token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: "Error pada server", error });
  }
};

module.exports = { 
  userRegister, 
  userLogin, 
};
