import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axiosClient.post("/user/signup", form);

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        name="username"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Email:</label>
                    <input
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter a password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                

                <button type="submit">Sign Up</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>
                Already have an account?{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </span>
            </p>
        </div>
    );
}