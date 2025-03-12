import { useState, useEffect } from "react";
/*import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";*/
import confetti from "canvas-confetti";
import "./FriendCollab.css";

const animalIcons = ["🐶", "🐱", "🦊", "🐻", "🐼", "🐸", "🐵", "🐯", "🐷", "🐥"];

export default function FriendCollaboration() {
  const [friends, setFriends] = useState(["Alice", "Bob", "Charlie"]);
  const [friendIcons, setFriendIcons] = useState({
    Alice: "🐶",
    Bob: "🐱",
    Charlie: "🦊",
  });
  const [newFriend, setNewFriend] = useState("");
  const [sessions, setSessions] = useState([]);
  const [sessionComments, setSessionComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("Guest");
  const [ambientStatus, setAmbientStatus] = useState("Syncing environment...");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const syncEnvironment = setTimeout(() => {
      setAmbientStatus("Synced Study Environment!");
    }, 2000);
    return () => clearTimeout(syncEnvironment);
  }, []);

  const addFriend = () => {
    if (newFriend.trim() && !friends.includes(newFriend)) {
      const randomIcon = animalIcons[Math.floor(Math.random() * animalIcons.length)];
      setFriends([...friends, newFriend]);
      setFriendIcons({ ...friendIcons, [newFriend]: randomIcon });
      setNewFriend("");
      confetti();
    }
  };

  const inviteToSession = (friend) => {
    setSessions([...sessions, { friend, topic: "Collaborative Session" }]);
    confetti();
  };

  const removeFromSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const addCommentToSession = () => {
    if (newComment.trim()) {
      setSessionComments([...sessionComments, { user: username, text: newComment }]);
      setNewComment("");
    }
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { user: username, text: newNote }]);
      setNewNote("");
    }
  };

  return (
    <center>
    <div className="friend-collab-container">
      <h3 className="friend-collab-header">{ambientStatus}</h3>
      <div className="friend-collab-card">
          <h2 className="friend-collab-card-title">Friend Network</h2>
          <div className="friend-collab-flex-container">
            <input
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              placeholder="Add a friend"
              className="friend-collab-input"
            />
            <button className="friend-collab-button friend-collab-add-button" onClick={addFriend}>
              Add
            </button>
          </div>
          <ul className="friend-collab-list">
            {friends.map((friend, index) => (
              <li key={index} className="friend-collab-list-item friend-collab-flex-container">
                <div className="friend-collab-icons">
                  <span>{friendIcons[friend]} {friend}</span>
                </div>
                <button className="friend-collab-button friend-collab-invite-button" onClick={() => inviteToSession(friend)}>
                  Invite
                </button>
              </li>
            ))}
          </ul>
        </div>
      

      <div className="friend-collab-study-sessions">
          <h2>Study Sessions & Live Chat</h2>
          <ul>
            {sessions.map((session, index) => (
              <li key={index}>
                {friendIcons[session.friend]} {session.friend} - {session.topic}
                <button className="friend-collab-remove-button" onClick={() => removeFromSession(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3 className="friend-collab-chat-title">Live Chat with Invited Friends</h3>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="friend-collab-chat-input"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="friend-collab-chat-input"
          />
          <button className="friend-collab-post-button" onClick={addCommentToSession}>
            Post Comment
          </button>
          <ul>
            {sessionComments.map((comment, index) => (
              <li key={index}><strong>{comment.user}:</strong> {comment.text}</li>
            ))}
          </ul>
        </div>
      
      <div className="friend-collab-shared-notes">
          <h2>Shared Notes</h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a note..."
            /*className="friend-collab-chat-input"*/
          />
          <button className="friend-collab-add-note-button" onClick={addNote}>
            Add Note
          </button>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <strong>{note.user}:</strong>
                <pre>{note.text}</pre>
              </li>
            ))}
          </ul>
        </div>
    </div>
    </center>
  );
}