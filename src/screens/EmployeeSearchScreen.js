import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { 
    Container, Typography, Button, Box, TextField,
    Table, TableBody, TableCell, TableHead, TableRow
 } from "@mui/material"

export default function EmployeeSearch() {
    const [query, setQuery] = useState("");
    
    const [results, setResults] = useState([]);

    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError("Please enter a department or position to search for.")
            return;
        }

        try {
            const res = await axiosClient.get(`/emp/employees/search?query=${query}`);

            setResults(res.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Search failed. Try again.");
        }
    };

    return (
        <Box>
            <Container>
                <Typography variant="h3"
                    sx={{
                        fontWeight: "500",
                        m: "30px auto",
                        color: "primary.dark"
                    }}
                >
                    Search Employees
                </Typography>

                <form onSubmit={handleSearch}
                    style={{display: "flex", gap: "40px", alignItems: "stretch"}}
                >
                    <TextField
                        type="text"
                        value={query}
                        placeholder="Enter a department or position"
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Button variant="contained" type="submit">Search</Button>
                </form>

                {error && <Typography style={{color: "red"}}>{error}</Typography>}

                {results.length === 0 ? (
                    <Typography sx={{color: "red", fontWeight: "bold", mt: "20px"}}>
                        No results found.
                    </Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Options</TableCell>
                            </TableRow>
                        </TableHead>

                        <tbody>
                            {results.map((emp) => {
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
                                                <span>No Image Found</span>
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
                        </tbody>
                    </Table>
                )}

                <br />

                <Button variant="contained" onClick={() => navigate("/employees")}>
                    Back to Employee List
                </Button>
            </Container>
        </Box>
    )
}