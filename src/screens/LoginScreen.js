import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ 
        login: "",
        password: "" 
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosClient.post("/user/login", form);

            localStorage.setItem("user_id", res.data.user_id);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            navigate("/employees");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="login"
                    placeholder="Email or Username"
                    value={form.login}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>
                Don't have an account?{" "}
                <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/signup")}
                >
                    Sign up
                </span>
            </p>
        </div>
    );
}