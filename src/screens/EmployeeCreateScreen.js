import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, FormLabel } from "@mui/material"

export default function EmployeeCreate() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        date_of_joining: "",
        department: ""
    });

    const [image, setImage] = useState(null);

    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            if (image) {
                formData.append("profile_image", image);
            }

            await axiosClient.post("/emp/employees", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            navigate("/employees")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create employee. Try again.");
        }
    };

    return(
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Container maxWidth="lg" sx={{
                textAlign: "center",
                border: 2,
                pb: "50px",
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
                    Create Employee
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {Object.keys(form).map((key) => {
                        const label = key
                            .split("_")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");
                        
                        return(
                            <Box key={key}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "150px 1fr",
                                    alignItems: "center",
                                    columnGap: 2,
                                    width: "50%",
                                    m: "auto auto 10px auto"
                                }}
                            >
                                <FormLabel sx={{fontWeight: "bold"}}>{label}: </FormLabel>
                                <TextField 
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    required
                                />
                            </Box>
                        );
                    })}

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "150px 1fr",
                            alignItems: "center",
                            columnGap: 2,
                            width: "50%",
                            m: "auto auto 20px auto"
                        }}
                    >
                        <FormLabel sx={{fontWeight: "bold"}}>Profile Image: </FormLabel>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{mt: 1}}
                        >
                            Upload File
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />
                        </Button>
                    </Box>

                    <Button variant="outlined" type="submit"
                        sx={{
                            fontWeight: "bold",
                            borderWidth: "2px",
                            borderColor: "primary.dark",
                            "&:hover": {
                                backgroundColor: "primary.light",
                                color: "white",
                                boxShadow: 4
                            }
                        }}
                    >
                        Create Employee
                    </Button>
                    <Button onClick={() => navigate("/employees")} variant="outlined"
                        sx={{
                            ml: "20px",
                            color: "error.dark",
                            fontWeight: "bold",
                            borderWidth: "2px",
                            borderColor: "error.dark",
                            "&:hover": {
                                backgroundColor: "error.light",
                                color: "white",
                                boxShadow: 4
                            }
                        }} 
                    >
                        Cancel
                    </Button>
                </form>
            </Container>
        </Box>

    )
}