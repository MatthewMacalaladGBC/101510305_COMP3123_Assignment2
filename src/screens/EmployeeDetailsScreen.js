import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

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
        return <p>Loading employee...</p>;
    }

    return(
        <div>
            <h2>Employee Details</h2>

            {employee.profile_image && (
                <img 
                    src={employee.profile_image}
                    alt={employee.profile_image}// "Profile"
                    width="200"
                    style={{ borderRadius: "10px", marginBottom: "20px" }}
                />
            )}

            <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Salary:</strong> ${employee.salary}</p>
            <p><strong>Date of Joining:</strong> {employee.date_of_joining?.substring(0, 10)}</p>
            <p><strong>Department:</strong> {employee.department}</p>

            <button onClick={() => navigate(`/employees/${eid}/edit`)}>
                Edit Employee
            </button>
            <button onClick={handleDelete}>
                Delete Employee
            </button>
            <button onClick={() => navigate("/employees")}>
                Back to List
            </button>
        </div>
    )
}