import React, { useState } from "react";
import axios from "axios";

const PetientRegister: React.FC = () => {

    interface DiseasePrediction {
        DiseaseName: string;
        ShortDescription: string;
        CommonCauses: string;
        KeySymptoms: string;
        PossibleTests: string;
    }
    // Define a type for API response wrapper
    interface ApiResponse {
        success: boolean;
        data: DiseasePrediction[];
    }

    // Today in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        symptoms: "",
        findings: "",
        appointment_date: today,
    });

    const [loading, setLoading] = useState(false); // new state

    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Validation
        if (!formData.name.trim()) {
            setMessage("Patient name is required.");
            return;
        }
        if (!formData.age || Number(formData.age) <= 0) {
            setMessage("Please enter a valid age.");
            return;
        }
        if (!formData.gender) {
            setMessage("Please select a gender.");
            return;
        }
        if (!formData.symptoms.trim()) {
            setMessage("Symptoms are required.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/opd", formData, {
                headers: { "Content-Type": "application/json" },
            });
            setMessage("Form submitted successfully!");
            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Failed to submit form.");
        }
    };

    return (
        <div className="container">
            <div className="card shadow p-4">
                <h1 className="text-center text-primary mb-4">OPD Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Patient Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                className="form-control"
                                name="age"
                                placeholder="Enter age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Gender</label>
                            <select
                                className="form-select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Contact Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="contact"
                                placeholder="Enter contact number"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Appointment Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="appointment_date"
                                value={formData.appointment_date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Symptoms</label>
                            <textarea
                                className="form-control"
                                name="symptoms"
                                placeholder="Describe symptoms"
                                value={formData.symptoms}
                                onChange={handleChange}
                                onBlur={async () => {
                                    try {
                                        setLoading(true); // disable submit

                                        const response = await fetch("http://localhost:3000/api/disease/predict", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ symptoms: formData.symptoms }),
                                        });

                                        const result: ApiResponse = await response.json();
                                        const predictions: DiseasePrediction[] = result.data ?? [];

                                        const findingsText = predictions
                                            .map((item: DiseasePrediction) =>
                                                `Disease: ${item.DiseaseName}\nCauses: ${item.CommonCauses ?? "N/A"}\nSymptoms: ${item.KeySymptoms ?? "N/A"}\nTests: ${item.PossibleTests ?? "N/A"}\nDescription: ${item.ShortDescription ?? "N/A"}`
                                            )
                                            .join("\n\n");

                                        setFormData(prev => ({ ...prev, findings: findingsText }));
                                    } catch (error) {
                                        console.error("Error calling API:", error);
                                    } finally {
                                        setLoading(false); // enable submit again
                                    }
                                }}
                                rows={1}
                            ></textarea>
                        </div>

                        <div className="col-12">
                            <label className="form-label">AI-Findings</label>
                            <textarea
                                className="form-control"
                                name="findings"
                                placeholder="Findings will display here"
                                value={formData.findings}
                                onChange={handleChange}
                                rows={6}
                            ></textarea>
                        </div>
                    </div>
                    {message && (
                        <p
                            className={`text-center mt-1 ${message.includes("successfully") ? "text-success" : "text-danger"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                    <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
                         {loading ? "Processing..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PetientRegister;
