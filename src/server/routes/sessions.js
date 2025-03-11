const express = require("express");
const Session = require("../models/Session"); 
const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

// Log a new session
router.post("/log", authMiddleware, async (req, res) => {
    try {
        const { completedPomodoros } = req.body;
        const newSession = new Session({
            userId: req.user, // Use the user ID from the middleware
            completedPomodoros,
        });

        await newSession.save();
        res.status(201).json({ msg: "Session logged successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Get the logged sessions for the current user
router.get("/history", authMiddleware, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user }).sort({ date: -1 }); // Get sessions in reverse order (latest first)
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;