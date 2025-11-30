import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, FormLabel, } from "@mui/material"

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
        <Box sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
            }}
        >
            <Container maxWidth="sm" sx={{
                textAlign: "center",
                border: 2,
                p: "20px",
                boxShadow: 4,
                borderRadius: 10
            }}>
                <Typography variant="h3"
                    sx={{
                            fontWeight: "500",
                            m: "30px auto",
                            color: "primary.dark"
                    }}
                >
                    Sign Up
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{m: "20px auto"}}>
                        <FormLabel sx={{fontWeight: "bold"}}>Username:</FormLabel>
                        <br />
                        <TextField
                            name="username"
                            placeholder="Enter username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    
                    <Box sx={{m: "20px auto"}}>
                        <FormLabel sx={{fontWeight: "bold"}}>Email:</FormLabel>
                        <br />
                        <TextField
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    
                    <Box sx={{m: "20px auto"}}>
                        <FormLabel sx={{fontWeight: "bold"}}>Password:</FormLabel>
                        <br />
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Enter a password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </Box>

                    <Button variant="contained" type="submit">Sign Up</Button>
                </form>

                {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

                <Typography variant="body1" sx={{m: "30px auto", fontStyle: "italic"}}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </Typography>
            </Container>
        </Box>
    );
}