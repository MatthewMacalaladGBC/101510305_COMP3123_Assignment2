import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Stack, FormLabel } from "@mui/material"

export default function EmployeeDetails() {
    const { eid } = useParams();

    const [employee, setEmployee] = useState(null);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axiosClient.get(`/emp/employees/${eid}`);
                setEmployee(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load employee.");
            }
        };

        fetchEmployee();
    }, [eid]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await axiosClient.delete(`/emp/employees?eid=${eid}`)
            navigate("/employees")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete employee.");
        }
    };

    if (!employee) {
        return <Typography>Loading employee...</Typography>;
    }

    return(
        <Box sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Container maxWidth="sm" sx={{
                textAlign: "center",
                border: 2,
                paddingBottom: "20px",
                boxShadow: 4,
                borderRadius: 10,
                borderColor: "primary.dark"
            }}>
                <Typography variant="h3"
                    sx={{
                        fontWeight: "500",
                        m: "30px auto",
                        color: "primary.dark"
                    }}
                >
                    Employee Details
                </Typography>

                {employee.profile_image && (
                    <Box component="img" 
                        src={employee.profile_image}
                        alt="Profile"
                        sx={{
                            width: 150,
                            objectFit: "cover",
                            borderRadius: 3,
                            border: "2px solid",
                            mb: "20px"
                        }}
                    />
                )}

                <Box sx={{
                    display: "grid",
                    rowGap: 2,
                    mb: "20px"
                }}>
                    <Typography><strong>Name:</strong> {employee.first_name} {employee.last_name}</Typography>
                    <Typography><strong>Email:</strong> {employee.email}</Typography>
                    <Typography><strong>Position:</strong> {employee.position}</Typography>
                    <Typography><strong>Salary:</strong> ${employee.salary}</Typography>
                    <Typography><strong>Date of Joining:</strong> {employee.date_of_joining?.substring(0, 10)}</Typography>
                    <Typography><strong>Department:</strong> {employee.department}</Typography>
                </Box>
                
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Button onClick={() => navigate(`/employees/${eid}/edit`)} sx={{color:"warning.main"}}>
                        Update Employee
                    </Button>
                    <Button onClick={handleDelete} sx={{color:"error.main"}}>
                        Delete Employee
                    </Button>
                    <Button onClick={() => navigate("/employees")}>
                        Back to List
                    </Button>
                </Box>
                
            </Container>
        </Box>
    )
}