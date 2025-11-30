import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { 
    Container, Typography, Button, Box,
    Table, TableBody, TableCell, TableHead, TableRow
 } from "@mui/material"


export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        navigate("/login");
    }

    const fetchEmployees = async () => {

        try {
            const res = await axiosClient.get("/emp/employees")

            setEmployees(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch employees.");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);
    
    return(
        <Box>
            <Container>
                <Typography variant="h3"
                    sx={{
                        fontWeight: "500",
                        m: "30px auto",
                        color: "primary.dark"
                    }}
                >
                    Employee List
                </Typography>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: "2px auto 20px auto"
                }}>
                    <Button variant="contained" onClick={() => navigate("/employees/new")}
                        sx={{bgcolor: "success.main"}}
                    >
                        Add New Employee
                    </Button>

                    <Button variant="contained" onClick={() => navigate("/employees/search")}
                        sx={{}}    
                    >
                        Search for Employees
                    </Button>

                    <Button variant="contained" onClick={handleLogout}
                        sx={{bgcolor: "error.main"}}
                    >
                        Logout
                    </Button>
                </Box>

                <Table>
                    <TableHead>
                        <TableRow sx={{
                            "& th": {
                                fontSize: "15pt"
                            }
                        }}>
                            <TableCell>Profile</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.map((emp) => {
                            return(
                                <TableRow key={emp.employee_id}>
                                    <TableCell>
                                        {emp.profile_image ? (
                                            <Box component="img"
                                                src={`${emp.profile_image}`}
                                                alt="Profile"
                                                sx={{
                                                    width:75,
                                                    height:75,
                                                    objectFit: "cover",
                                                    borderRadius: 3,
                                                    border: "1px solid"
                                                }}
                                            />
                                        ) : (
                                            <span>N / A</span>
                                        )}
                                    </TableCell>

                                    <TableCell>{emp.first_name + " " + emp.last_name}</TableCell>
                                    <TableCell>{emp.position}</TableCell>
                                    <TableCell>{emp.department}</TableCell>

                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                navigate(`/employees/${emp.employee_id}`)
                                            }
                                            sx = {{color: "primary.dark", fontWeight: "bold"}}
                                        >
                                            View
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                navigate(`/employees/${emp.employee_id}/edit`)
                                            }
                                            sx = {{color: "warning.light", fontWeight: "bold"}}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Container>
        </Box>
    )
}