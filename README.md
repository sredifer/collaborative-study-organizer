# Collaborative Study Organizer

## **Description**
The **Collaborative Study Organizer** is a web-based platform designed to help students manage their study schedules, organize resources, and collaborate effectively with peers. The platform integrates productivity-enhancing tools, such as a Pomodoro Timer, task management, and a shared resource library, into a centralized hub. Our goal is to provide students with a comprehensive system that fosters effective learning, time management, and teamwork.
## **Features**
1. **Real-Time Calendar** - Displays scheduled study sessions dynamically.
2. **Pomodoro Timer Integration** - Built-in timer with configurable durations to enhance productivity.
3. **Notes and Resource Management** - Upload and categorize study materials (PDFs, links, videos) by subject or topic.
4. **Task Checklist** - Track study-related tasks and mark them as complete.
5. **Study Session Scheduling** - Create and share study sessions with friends, including Pomodoro-based sessions.
6. **Library/Resource Search** - Search for curated study materials on various academic topics.
7. **Authentication & Security** - Secure login for managing personal study schedules and private study groups.
8. **Collaboration Tools** - Add friends, leave comments on shared notes, and work together on study plans.
9. **Rewards & Gamification** - Earn points for completing study sessions and checklist tasks.

## **Instructions to Run the App**
To run right now:
First do **node server.js**
Then if on vscode open a new terminal (don't close out of previous command/terminal)
Then do **npm start**


After cloning the repository, cd into src, then cd into server. You will be creating a .env file
that manages your connection to the server for authentication purposes. 

It will have the format:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=3000

You will need access to a Mongo Database, which you can do locally or through MongoDB Atlas. 
To get a JWT_SECRET code, run the command node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
in your terminal, which will help with authentication. You can then run node index.js.

## **Contributors**
Samantha Redifer | Lily Brawner | Julia Endriga | Lyra Latifi | Samantha Zepeda  

## Tools used: MERN Stack (MongoDB, Express, React, Node.js)

<img src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png" alt="Alt Text" width="200" height="120"> <img src="https://static-00.iconduck.com/assets.00/react-original-wordmark-icon-840x1024-vhmauxp6.png" alt="Alt Text" width="150" height="180">
