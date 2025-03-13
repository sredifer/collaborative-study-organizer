import React, { useContext, useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";
import SessionsLogButton from "./SessionsLogButton";
import SessionsLog from "./SessionsLog";

export default function Timer({ setShowSettings }) {
    const { workMinutes, breakMinutes, totalPomodoros } = useContext(SettingsContext);

    const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("work");
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [showSessionsLog, setShowSessionsLog] = useState(false);
    const [congratulationsMessage, setCongratulationsMessage] = useState("");  // State for the congratulations message

    useEffect(() => {
        setSecondsLeft((mode === "work" ? workMinutes : breakMinutes) * 60);
    }, [workMinutes, breakMinutes, mode]);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);

                    if (mode === "work") {
                        setMode("break");
                        return breakMinutes * 60;
                    } else {
                        if ((pomodoroCount < totalPomodoros))
                            setPomodoroCount(pomodoroCount + 1);
                        if (pomodoroCount === (totalPomodoros - 1)) {
                            setIsRunning(false);
                            logSession();
                            setCongratulationsMessage("Congratulations! You completed this pomodoro session.");
                            return 0;
                        }
                        else {
                            setMode("work");
                            return workMinutes * 60;
                        }
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, mode, pomodoroCount, totalPomodoros]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const totalTime = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
    const progressValue = 1 - secondsLeft / totalTime;

    const logSession = async () => {
        // Log the session data to the backend when the last Pomodoro is completed
        const sessionData = {
            pomodorosCompleted: totalPomodoros,
            workTimeLength: workMinutes,
            breakTimeLength: breakMinutes,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch("http://localhost:3001/api/sessions/log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"), // Assuming the token is stored in localStorage
                },
                body: JSON.stringify(sessionData),
            });

            if (response.ok) {
                console.log("Session logged successfully!");
            } else {
                console.error("Failed to log session");
            }
        } catch (error) {
            console.error("Error logging session", error);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            {showSessionsLog ? (
                <SessionsLog setShowSessionsLog={setShowSessionsLog} />
            ) : (
                <>
                    {congratulationsMessage ? (
                <p style={{ fontSize: "18px" }}>
                Pomodoros Completed: {totalPomodoros} / {totalPomodoros}
            </p>
            ) : ( <p style={{ fontSize: "18px" }}>
                        Pomodoros Completed: {pomodoroCount} / {totalPomodoros}
                    </p>
            )}
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>
                        {mode === "work" ? "Studying..." : "Break Time!"}
                    </p>
                    <h2 style={{ fontSize: "48px" }}>{formatTime(secondsLeft)}</h2>
                    <progress 
                        value={progressValue}
                        max={1}
                        style={{
                            width: "70%",
                            height: "30px",
                        }}
                    />
                    {congratulationsMessage ? (
                <p style={{ fontSize: "18px", color: "green" }}>{congratulationsMessage}</p>
            ) : (
                <p style={{ fontSize: "18px", color: "gray" }}>
                    {pomodoroCount === (totalPomodoros - 1)
                        ? "Almost done!"
                        : mode === "work"
                        ? `Next: Break for ${breakMinutes} minutes`
                        : `Next: Study for ${workMinutes} minutes`}
                </p>
            )}

                    <div style={{ marginTop: "10px" }}>
                        <PlayButton onClick={() => setIsRunning(true)} />
                        <PauseButton onClick={() => setIsRunning(false)} />
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <SettingsButton setShowSettings={setShowSettings} />
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        <SessionsLogButton setShowSessionsLog={setShowSessionsLog} />
                    </div>
                </>
            )}
        </div>
    );
}