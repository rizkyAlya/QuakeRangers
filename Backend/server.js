const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require("cors");
const db = require("./config/db");
const app = express();
const PORT = process.env.PORT; 

const authRoutes = require("./routes/auth");

// Menghubungkan dengan database
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

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT} `);
});
