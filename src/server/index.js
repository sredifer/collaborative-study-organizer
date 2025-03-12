require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust the origin as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // If you're using cookies or sessions
  }));

  app.use(express.json());

  const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const sessionRoutes = require("./routes/sessions");
app.use("/api/sessions", sessionRoutes);


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Pomodoro Timer Backend Running!");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));