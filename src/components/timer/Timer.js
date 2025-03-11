import React, { useContext, useState, useEffect } from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

export default function Timer({ setShowSettings }) {
    const { workMinutes, breakMinutes, totalPomodoros } = useContext(SettingsContext);

    const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("work");
    const [pomodoroCount, setPomodoroCount] = useState(1);

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
                        if (pomodoroCount >= totalPomodoros) {
                            setIsRunning(false);
                            return 0;
                        }
                        setMode("break");
                        setPomodoroCount(pomodoroCount + 1);
                        return breakMinutes * 60;
                    } else {
                        setMode("work");
                        return workMinutes * 60;
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

    return (
        <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px"}}>
                Pomodoro {pomodoroCount} / {totalPomodoros}
            </p>
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

            <p style={{ fontSize: "18px", color: "gray" }}>
            {pomodoroCount === totalPomodoros 
        ? "Almost done!" 
        : mode === "work" 
            ? `Next: Break for ${breakMinutes} minutes` 
            : `Next: Study for ${workMinutes} minutes`
    }
            </p>

            <div style={{ marginTop: "10px" }}>
                <PlayButton onClick={() => setIsRunning(true)} />
                <PauseButton onClick={() => setIsRunning(false)} />
            </div>

            <div style={{ marginTop: "10px" }}>
                <SettingsButton setShowSettings={setShowSettings} />
            </div>
        </div>
    );
}