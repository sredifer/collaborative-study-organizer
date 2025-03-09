// Code for backend
// using Multer to send data (files) to Node.js/Express and MongoDB to store files

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// setting up express
const app = express();
app.use(cors());  // cors = cross-origin resource sharing (lets web pages access resources from other domains)

// used for static frontend files (HTML, JS, CSS). needed to actually view html on localhost server
app.use(express.static(path.join(__dirname, '../../public'))); // the files that deal with frontend are in public folder

// setting up connection to MongoDB
async function connectToMongoDB() {
    try {
        mongoose.connect('mongodb://localhost:27017/file-upload-db'); // connects to a database with the name
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

connectToMongoDB();

// using multer (middleware) for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, 'uploads'); // creating actual path of whatever's uploaded
        console.log('File will be saved in:', path.resolve(__dirname, uploadPath)); // then saving that file
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // make sure to keep original file name because want to display them
    }
});
const upload = multer({ storage });

// file model (for MongoDB) to store file metadata. able to view this through MongoDB compass software
const File = mongoose.model('File', new mongoose.Schema({
    filename: String,
    subject: String,
    file_url: String
}));

// upload file endpoint; user sends POST request to server with the file (by uploading) &
// server will then save & process it
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('Received upload request');
    console.log('Request body:', req.body);
    console.log('Received file:', req.file);

    if (!req.file){
        return res.status(400).json({error: "No file uploaded"});
    }
    
    console.log("Subject: ", req.body.subject);
    const { filename } = req.file;
    const subject = Array.isArray(req.body.subject) ? req.body.subject[0] : req.body.subject;


    // subject needs to be in string format before it can be saved
    if (typeof subject !== 'string') {
        return res.status(400).json({ error: 'Subject must be a valid word' });
    }

    // subject box can't be empty when trying to upload
    if (!subject) {
        return res.status(400).json({ error: "Subject is required" });
    }

    const newFile = new File({
        filename,
        subject,
        file_url: `http://localhost:3000/uploads/${filename}`
    });

    try {
        await newFile.save();  // will save the file's metadata to MongoDB
        console.log("File metadata saved:", newFile);
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (err) {
        console.error('Error saving file metadata:', err);
        res.status(500).json({ error: 'Failed to save file metadata', details: err });
    }
});

// retrieve the file's metadata
app.get('/api/files', async (req, res) => {
    try {
        const files = await File.find();  // will get this metadata from the MongoDB database
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch files', details: err });
    }
});

// static files from uploads folder. these will be the files that the user uploads
app.use('/uploads', express.static(path.join(__dirname, '../../src/file-upload/uploads/')));

// start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
