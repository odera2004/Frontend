import React, { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

export default function AddWorkOrder() {
    const { addWorkOrder } = useContext(AdminContext);

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [technicianId, setTechnicianId] = useState('');
    const [guardId, setGuardId] = useState('');
    const [vehicleId, setVehicleId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new work order object
        const newWorkOrder = {
            description,
            status,
            technician_id: technicianId,
            guard_id: guardId,
            vehicle_id: vehicleId
        };

        // Use the context's addWorkOrder method to send the data to the server
        addWorkOrder(newWorkOrder);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add New Work Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter work order description"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="technicianId" className="form-label">Technician ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="technicianId"
                        value={technicianId}
                        onChange={(e) => setTechnicianId(e.target.value)}
                        placeholder="Enter technician ID"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="guardId" className="form-label">Guard ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="guardId"
                        value={guardId}
                        onChange={(e) => setGuardId(e.target.value)}
                        placeholder="Enter guard ID"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="vehicleId" className="form-label">Vehicle ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="vehicleId"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        placeholder="Enter vehicle ID"
                    />
                </div>

                <div className="d-grid gap-2">
                    <button 
                        type="submit" 
                        className="btn btn-dark btn-lg"
                    >
                        Add Work Order
                    </button>
                </div>
            </form>
        </div>
    );
}
