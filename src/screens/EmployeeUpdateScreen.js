import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, FormLabel } from "@mui/material"

export default function EmployeeUpdate() {
    const { eid } = useParams();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        department: "",
        profile_image: null
    });

    const [existingImage, setExistingImage] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axiosClient.get(`/emp/employees/${eid}`);
                const emp = res.data;

                setForm({
                    first_name: emp.first_name,
                    last_name: emp.last_name,
                    email: emp.email,
                    position: emp.position,
                    salary: emp.salary,
                    department: emp.department,
                    profile_image: null
                });

                setExistingImage(emp.profile_image);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load employee.");
            }
        };

        fetchEmployee();
    }, [eid]);
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        setForm({ ...form, profile_image: e.target.files[0]});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            
            formData.append("first_name", form.first_name);
            formData.append("last_name", form.last_name);
            formData.append("email", form.email);
            formData.append("position", form.position);
            formData.append("salary", form.salary);
            formData.append("department", form.department);

            if (form.profile_image) {
                formData.append("profile_image", form.profile_image);
            }

            await axiosClient.put(`/emp/employees/${eid}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            navigate(`/employees/${eid}`)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update employee. Try again.");
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
                    Update Employee
                </Typography>

                {existingImage && (
                    <Box>
                        <Typography>Current Profile Image:</Typography>
                        <br />
                        <Box component="img" 
                            src={existingImage}
                            alt="Profile"
                            sx={{
                                width: 150,
                                objectFit: "cover",
                                borderRadius: 3,
                                border: "2px solid",
                                mb: "20px"
                            }}
                        />
                    </Box>
                )}

                <form onSubmit={handleSubmit}>
                    {Object.keys(form).map((key) => {
                        if (key === "profile_image") return null;

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
                                    placeholder=""
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
                        <FormLabel sx={{fontWeight: "bold"}}>Update Image: </FormLabel>
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

                    {error && <Typography style={{color: "red"}}>{error}</Typography>}

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
                        Update Employee
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