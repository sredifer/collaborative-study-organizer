const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    pomodorosCompleted: { type: Number, required: true },
    workTimeLength: { type: Number, required: true },   // in minutes
    breakTimeLength: { type: Number, required: true },   // in minutes
    timestamp: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;