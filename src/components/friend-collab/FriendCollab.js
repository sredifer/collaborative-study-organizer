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
    <div className="friend-collab-container">
      <h3 className="friend-collab-header">{ambientStatus}</h3>
      <div className="friend-collab-container-2">
          <h2 className="text-xl font-bold">Friend Network</h2>
          <div className="flex space-x-2">
            <input
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              placeholder="Add a friend"
              className="p-2 border rounded-md"
            />
            <button className="bg-[#B4E4C9] text-gray-800 p-2 rounded-md" onClick={addFriend}>
              Add
            </button>
          </div>
          <ul className="list-disc pl-5 text-md">
            {friends.map((friend, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center space-x-2">
                  <span>{friendIcons[friend]} {friend}</span>
                </div>
                <button className="bg-[#FDFD96] text-gray-800 p-1 rounded-md" onClick={() => inviteToSession(friend)}>
                  Invite
                </button>
              </li>
            ))}
          </ul>
        </div>
      

      <div className="bg-[#FFC0CB] shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">Study Sessions & Live Chat</h2>
          <ul className="list-disc pl-5 text-md">
            {sessions.map((session, index) => (
              <li key={index} className="py-2 border-b flex justify-between">
                {friendIcons[session.friend]} {session.friend} - {session.topic}
                <button className="bg-red-500 text-white p-1 rounded-md" onClick={() => removeFromSession(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-bold mt-4">Live Chat with Invited Friends</h3>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="p-2 border rounded-md mb-2"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-md"
          />
          <button className="bg-[#AEC6CF] text-gray-800 p-2 rounded-md" onClick={addCommentToSession}>
            Post Comment
          </button>
          <ul className="list-disc pl-5 mt-2 text-md">
            {sessionComments.map((comment, index) => (
              <li key={index} className="py-2 border-b"><strong>{comment.user}:</strong> {comment.text}</li>
            ))}
          </ul>
        </div>
      
      <div className="bg-[#E8D9CD] shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">Shared Notes</h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a note..."
            className="w-full p-2 border rounded-md whitespace-pre-line"
          />
          <button className="bg-[#B4E4C9] text-gray-800 p-2 rounded-md" onClick={addNote}>
            Add Note
          </button>
          <ul className="list-disc pl-5 mt-2 text-md">
            {notes.map((note, index) => (
              <li key={index} className="py-2 border-b">
                <strong>{note.user}:</strong>
                <pre className="whitespace-pre-line">{note.text}</pre>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}