import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Stack } from "@mui/material"

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
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
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
                    Login Page
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={5} alignItems="center" mt={5}>
                        <TextField
                            name="login"
                            placeholder="Email or Username"
                            value={form.login}
                            onChange={handleChange}
                        />
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <Button variant="contained" type="submit" sx={{p:"10px 40px 10px 40px"}}>
                            Login
                        </Button>
                    </Stack>
                    
                </form>

                {error && <Typography sx={{ color: "red" }}>{error}</Typography>}

                <Typography variant="body1" sx={{m: "30px auto", fontStyle: "italic"}}>
                    Don't have an account?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </Typography>
            </Container>
        </Box>
        
    );
}