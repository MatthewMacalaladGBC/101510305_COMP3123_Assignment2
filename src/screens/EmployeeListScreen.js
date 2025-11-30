import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    const [error, setError] = useState("");

    const navigate = useNavigate();

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
        <div>
            <h2>Employee List</h2>

            <button onClick={() => navigate("/employees/new")}>
                Add New Employee
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((emp) => {
                        return(
                            <tr key={emp.employee_id}>
                                <td>
                                    {emp.profile_image ? (
                                        <img
                                            src={`${emp.profile_image}`}
                                            alt="Profile"
                                            width="50"
                                            height="50"
                                            style={{ objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    ) : (
                                        <span>No Image Found</span>
                                    )}
                                </td>

                                <td>{emp.first_name + " " + emp.last_name}</td>
                                <td>{emp.position}</td>
                                <td>{emp.department}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            navigate(`/employees/${emp.employee_id}`)
                                        }
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(`/employees/${emp.employee_id}/edit`)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}