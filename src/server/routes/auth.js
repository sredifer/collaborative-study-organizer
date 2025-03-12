const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

    router.post(
        "/signup",
        [
            body("username").notEmpty().withMessage("Username is required"),
            body("email").isEmail().withMessage("Email must be valid"),
            body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("Validation Errors:", errors.array());  // Log the validation errors
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { username, email, password } = req.body;
    
            try {
                let user = await User.findOne({ email });
                if (user) return res.status(400).json({ msg: "User already exists" });
    
                const hashedPassword = await bcrypt.hash(password, 10);
                user = new User({ username, email, password: hashedPassword });
    
                await user.save();
                res.status(201).json({ msg: "User registered successfully" });
            } catch (err) {
                res.status(500).json({ msg: "Server error" });
            }
        }
    );   

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "4h" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

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

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;