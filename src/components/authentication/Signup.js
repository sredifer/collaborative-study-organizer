import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignupSuccess }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            console.log({ username, email, password });
            const response = await fetch("http://localhost:3001/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Error creating account");
            }

            onSignupSuccess(); // Notify parent to show login
            navigate("/login"); // Redirect to login page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        
        <center>
        <div class="main-logo">
            <img src="/images/front-page-logo.png" width="700" height="250"></img>
        </div>
        <div className="login-signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br></br>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <button type="submit"><u>Signup</u></button>
            </form>
            {error && <p>{error}</p>}
            <p>Already have an account? <button onClick={() => navigate("/login")}><u>Login</u></button></p>
        </div>
        </center>
    );
};

export default Signup;