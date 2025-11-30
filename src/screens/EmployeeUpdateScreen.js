import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

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
        <div>
            <h2>Update Employee</h2>

            {existingImage && (
                <div>
                    <p>Current Profile Image:</p>
                    <img
                        src={existingImage}
                        alt="Profile"
                        width="150"
                        style={{ borderRadius: "8px" }}
                    />
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {Object.keys(form).map((key) => {
                    if (key === "profile_image") return null;

                    const label = key
                        .split("_")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");
                    
                    return(
                       <div key={key}>
                        <label>{label}: </label>
                        <input 
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            placeholder=""
                            required
                        />
                        </div> 
                    );
                })}

                <div>
                    <label>Update Profile Image:</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit">Update Employee</button>
            </form>
        </div>
    )
}