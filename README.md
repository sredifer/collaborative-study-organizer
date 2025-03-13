# Collaborative Study Organizer
<p align="center">
    <img src="public/images/front-page-logo.png">
</p>

## **Description**
The **Collaborative Study Organizer** is a web-based platform designed to help students manage their study schedules, organize resources, and collaborate effectively with peers. The platform integrates productivity-enhancing tools, such as a Pomodoro Timer, task management, and a shared resource library, into a centralized hub. Our goal is to provide students with a comprehensive system that fosters effective learning, time management, and teamwork.

## **Features**
- **Real-Time Calendar** - Displays scheduled study sessions dynamically.
- **Pomodoro Timer Integration** - Built-in timer with configurable durations to enhance productivity.
- **Notes and Resource Management** - Upload and categorize study materials (PDFs) by subject or topic.
- **Task Checklist** - Track study-related tasks and mark them as complete.
- **Library/Resource Search** - Search for curated study materials on various academic topics.
- **Authentication & Security** - Secure login for managing personal study schedules and Pomodoro sessions.
- **Collaboration Tools** - Add friends, leave comments on shared notes, and work together on study plans.

## **Technology: Javascript, MERN Stack (MongoDB, Express.js, React.js, Node.js)**

<img src="https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png" width="200" height="200">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png" width="486" height="187">

## **Instructions to Run the App**
Clone the repo like so:
```bash
git clone https://github.com/sredifer/collaborative-study-organizer.git
cd collaborative-study-organizer
```
Then do
```bash
npm install
```
to install the necessary dependencies. After cloning the repository, do
```bash
cd src/server
```
Here, you will be creating a .env file that manages your connection to the server for authentication purposes. It will have the following format:
```bash
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=3000
``` 
You will need access to a Mongo Database, which you can do locally or through MongoDB Atlas. 
To get a JWT_SECRET code, run the command
```bash 
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
in your terminal, which will help with authentication. You can then run 
```bash
node index.js.
```
to start up the backend for authentication. To set up the backend for file uploading, run
```bash
node server.js
```
Finally, run
```bash
npm start
```
to view the frontend of the program.

## **Authors**
**The Collaborative Study Organizer** was made as a project for CS 35L taught by Professor Paul Eggert at UCLA in Winter 2025.
</br>
Made by Samantha Redifer, Lily Brawner, Julia Endriga, Lyra Latifi, and Samantha Zepeda  

