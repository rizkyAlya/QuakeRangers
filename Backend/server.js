const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const leaderboarRoutes = require("./routes/leaderboard");
const courseRoutes = require("./routes/course");
const quizRoutes = require("./routes/quiz");

const app = express();
const PORT = process.env.PORT;

// Hubungkan database
db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/leaderboard", leaderboarRoutes);
app.use("/course", courseRoutes);
app.use("/quiz", quizRoutes);

app.use('/uploads', (req, res, next) => {
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
// Static files
app.use('/uploads', express.static(path.join(__dirname, 'config', 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
