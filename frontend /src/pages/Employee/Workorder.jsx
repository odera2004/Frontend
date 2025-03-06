import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function AddWorkOrder() {
    const { addWorkOrder } = useContext(AdminContext);

    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerId, setCustomerId] = useState(null);
    const [technicianId, setTechnicianId] = useState("");
    const [guardId, setGuardId] = useState("");
    const [number_plate,setNumberPlate] =useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [technicians, setTechnicians] = useState([]);
    const [guards, setGuards] = useState([]);
    
    // Fetch technicians, guards, and vehicles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTechnicians = await fetch("https://garage-7f3u.onrender.com/technicians");
                const resGuards = await fetch("https://garage-7f3u.onrender.com/guards");

                setTechnicians(await resTechnicians.json());
                setGuards(await resGuards.json());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const validateCustomerEmail = async (email) => {
        setErrorMessage("");
        setCustomerId(null);
    
        if (!email.trim()) {  
            setErrorMessage("Please enter a valid email.");
            return;
        }
    
        try {
            const response = await fetch(`https://garage-7f3u.onrender.com/users/email/${encodeURIComponent(email)}`);
    
            if (!response.ok) {
                setErrorMessage("User does not exist. Please create an account first.");
                return;
            }
    
            const data = await response.json();
            setCustomerId(data.id);
        } catch (error) {
            console.error("Error validating customer email:", error);
            setErrorMessage("An error occurred while validating the email.");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate customer ID
        if (!customerId) {
            setErrorMessage("Please enter a valid email and verify before submitting.");
            return;
        }
    
        // Create the new work order object
        const newWorkOrder = {
            description,
            status,
            user_id: customerId,
            technician_id: technicianId,
            guard_id: guardId,
            number_plate,
        };
    
        try {
            await addWorkOrder(newWorkOrder);
    
            // Reset the form fields after successful submission
            setDescription("");
            setStatus("Pending");
            setCustomerEmail("");
            setCustomerId(null);
            setTechnicianId("");
            setGuardId("");
            setNumberPlate("");
            setErrorMessage(""); 
        } catch (error) {
            console.error("Error adding work order:", error);
            setErrorMessage("Failed to add work order. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add New Work Order</h2>
            <form onSubmit={handleSubmit}>
                {/* Customer Email Input */}
                <div className="mb-3">
                    <label htmlFor="customerEmail" className="form-label">Customer Email</label>
                    <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            id="customerEmail"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="Enter customer's email"
                        />
                        <button type="button" className="btn btn-primary" onClick={() => validateCustomerEmail(customerEmail)}> 
                            Verify Email
                        </button>
                    </div>
                    {errorMessage && <small className="text-danger">{errorMessage}</small>}
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description of issue in full detail"
                    />
                </div>

                {/* Technician Dropdown */}
                <div className="mb-3">
                    <label htmlFor="technicianId" className="form-label">Technician Name</label>
                    <select
                        className="form-control"
                        id="technicianId"
                        value={technicianId}
                        onChange={(e) => setTechnicianId(e.target.value)}
                    >
                        <option value="">Select Technician</option>
                        {technicians.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                                {tech.first_name} {tech.last_name} - {tech.skill_set}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Guard Dropdown */}
                <div className="mb-3">
                    <label htmlFor="guardId" className="form-label">Guard Name</label>
                    <select
                        className="form-control"
                        id="guardId"
                        value={guardId}
                        onChange={(e) => setGuardId(e.target.value)}
                    >
                        <option value="">Select Guard</option>
                        {guards.map((guard) => (
                            <option key={guard.id} value={guard.id}>
                                {guard.first_name} {guard.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Vehicle Dropdown */}
                <div className="mb-3">
                    <label htmlFor="NumberPlate" className="form-label">Vehicle Number Plate </label>
                    <input
                        type="text"
                        className="form-control"
                        id="NumberPlate"
                        value={number_plate}
                        onChange={(e) => setNumberPlate(e.target.value)}
                        placeholder="Enter Plate in format ABC-123A"
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark btn-lg">
                        Add Work Order
                    </button>
                </div>
            </form>
        </div>
    );
}