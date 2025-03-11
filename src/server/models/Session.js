const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user
    completedPomodoros: { type: Number, required: true, default: 0 },
    date: { type: Date, default: Date.now }, // Record the date of the session
});

module.exports = mongoose.model("Session", SessionSchema);