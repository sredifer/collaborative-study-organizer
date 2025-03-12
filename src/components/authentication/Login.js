import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Invalid credentials");
            }

            localStorage.setItem("token", data.token); // Save token
            onLoginSuccess(); // Notify parent to show profile
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <center>
        <div class="main-logo">
            <img src="/images/front-page-logo.png" width="700" height="250"></img>
        </div>
        <div className ="login-signup">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit"><u>Login</u></button>
            </form>
            {error && <p>{error}</p>}
            <p>Don't have an account? <button onClick={() => navigate("/signup")}><u>Signup</u></button></p>
        </div>
        </center>
    );
};

export default Login;