import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FriendCollaboration() {
  const [friends, setFriends] = useState(["Alice", "Bob", "Charlie"]);
  const [newFriend, setNewFriend] = useState("");
  const [sessions, setSessions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addFriend = () => {
    if (newFriend.trim() && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend]);
      setNewFriend("");
    }
  };

  const inviteToSession = (friend) => {
    setSessions([...sessions, { friend, topic: "Study Session" }]);
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xl font-bold">Friend Network</h2>
          <div className="flex space-x-2">
            <Input
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              placeholder="Add a friend"
            />
            <Button onClick={addFriend}>Add</Button>
          </div>
          <ul className="list-disc pl-5">
            {friends.map((friend, index) => (
              <li key={index} className="flex justify-between items-center">
                {friend} <Button onClick={() => inviteToSession(friend)}>Invite</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xl font-bold">Study Sessions</h2>
          <ul className="list-disc pl-5">
            {sessions.map((session, index) => (
              <li key={index}>{session.friend} - {session.topic}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-xl font-bold">Group Comments</h2>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <Button onClick={addComment}>Post Comment</Button>
          <ul className="list-disc pl-5 mt-2">
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
