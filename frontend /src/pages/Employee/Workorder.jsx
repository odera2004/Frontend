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
    const [vehicleId, setVehicleId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [technicians, setTechnicians] = useState([]);
    const [guards, setGuards] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    // Fetch technicians, guards, and vehicles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTechnicians = await fetch("http://127.0.0.1:5000/technicians");
                const resGuards = await fetch("http://127.0.0.1:5000/guards");
                const resVehicles = await fetch("http://127.0.0.1:5000/vehicles");

                setTechnicians(await resTechnicians.json());
                setGuards(await resGuards.json());
                setVehicles(await resVehicles.json());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const validateCustomerEmail = async (email) => {
        setErrorMessage("");
        setCustomerId(null);
    
        if (!email.trim()) {  // Trim whitespace before checking
            setErrorMessage("Please enter a valid email.");
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/email/${encodeURIComponent(email)}`);
    
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
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customerId) {
            setErrorMessage("Please enter a valid email and verify before submitting.");
            return;
        }

        const newWorkOrder = {
            description,
            status,
            user_id: customerId,
            technician_id: technicianId,
            guard_id: guardId,
            vehicle_id: vehicleId || null, // Optional field
        };

        addWorkOrder(newWorkOrder);
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

                {/* Vehicle Dropdown (Optional) */}
                <div className="mb-3">
                    <label htmlFor="vehicleId" className="form-label">Vehicle Number Plate (Optional)</label>
                    <select
                        className="form-control"
                        id="vehicleId"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                    >
                        <option value="">No Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.number_plate} - {vehicle.car_model}
                            </option>
                        ))}
                    </select>
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