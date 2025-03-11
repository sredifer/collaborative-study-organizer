import React, { useState, useEffect } from "react";

export default function SessionsLog({ setShowSessionsLog }) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/sessions/history", {  // Change this to match the backend route
                    method: "GET",
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"), // Assuming you store the auth token in localStorage
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch sessions");
                }

                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    return (
        <div>
            <button 
                onClick={() => setShowSessionsLog(false)}
                style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                }}
            >
                ✖
            </button>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h3>Sessions Log</h3>
                <div>
                    {sessions.length > 0 ? (
                        <ul>
                            {sessions.map((session) => (
                                <li key={session._id}>
                                    Pomodoros Completed: {session.completedPomodoros}
                                    <br />
                                    Work Time Length: {session.workTimeLength} minutes
                                    <br />
                                    Break Time Length: {session.breakTimeLength} minutes
                                    <br />
                                    Logged at: {new Date(session.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No sessions logged yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}