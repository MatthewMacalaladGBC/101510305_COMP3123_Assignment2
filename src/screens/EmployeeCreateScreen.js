import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Create Employee</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {Object.keys(form).map((key) => {
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
                            required
                        />
                        </div> 
                    );
                })}

                <div>
                    <label>Profile Image:</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit">Create Employee</button>
            </form>
        </div>
    )
}