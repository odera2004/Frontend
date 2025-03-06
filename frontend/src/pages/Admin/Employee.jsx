import React, { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa"; 
import { toast } from "react-toastify";

export default function Employee() {
    const { employees, loading, error, addEmployee, deleteEmployee } = useEmployees();
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        role: "",
        skillSet: "",
        shiftStart: "",
        shiftEnd: "",
    });

    // State for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        if (name === "role") {
            if (value === "guard") {
                updatedFormData.skillSet = "Security";
            } else {
                updatedFormData.skillSet = "";
            }
            if (value !== "guard") {
                updatedFormData.shiftStart = "";
                updatedFormData.shiftEnd = "";
            }
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEmployee({
                email: formData.email,
                role: formData.role,
                skillSet: formData.skillSet,
                shiftStart: formData.shiftStart,
                shiftEnd: formData.shiftEnd,
            });
            
    
            toast.success("Employee added successfully!"); 
            setShowModal(false);
            setFormData({ email: "", role: "", skillSet: "", shiftStart: "", shiftEnd: "" });
        } catch (error) {
            toast.error(error.message || "Failed to add employee!"); 
            console.error("Error adding employee:", error);
        }
    };
    

    const filteredEmployees = employees.filter((employee) =>
        `${employee.first_name} ${employee.last_name} ${employee.email}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Delete Confirmation
    const handleDeleteConfirm = (employee) => {
        setEmployeeToDelete(employee);
        setShowDeleteModal(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
    };

    const handleDelete = async () => {
        try {
            await deleteEmployee(employeeToDelete);
            toast.success("Employee deleted successfully!"); 
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
        } catch (error) {
            toast.error(error.message || "Failed to delete employee!"); 
        }
    };
    
    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4 text-center">Employee Management</h2>

            {/* Search and Add Employee Panel */}
            <div className="d-flex justify-content-between mb-4">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="btn btn-dark btn" onClick={() => setShowModal(true)}>
                    Add Employee
                </button>
            </div>

            {/* Employee List */}
            <div className="container">
                {loading && <p>Loading employees...</p>}
                {error && <p className="text-danger">Error: {error}</p>}
                {!loading && !error && filteredEmployees.length === 0 && <p>No employees found.</p>}

                {/* Employee Cards in Horizontal Layout */}
                <div className="list-group">
                    {!loading &&
                        !error &&
                        filteredEmployees.map((employee, index) => (
                            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">
                                        {employee.first_name} {employee.last_name}
                                    </h5>
                                    <p className="mb-1"><strong>Email:</strong> {employee.email}</p>
                                    <p className="mb-1"><strong>Role:</strong> {employee.role}</p>
                                    <p className="mb-1"><strong>Specialty:</strong> {employee.role === "guard" ? "Security" : employee.skill_set}</p>
                                </div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteConfirm(employee)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            {/* Add Employee Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>

                        {/* Role Dropdown */}
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="guard">Guard</option>
                                <option value="technician">Technician</option>
                                <option value="user">User</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Specialty Input (Only for Technicians) */}
                        {formData.role === "technician" && (
                            <Form.Group className="mb-3">
                                <Form.Label>Specialty</Form.Label>
                                <Form.Control type="text" name="skillSet" value={formData.skillSet} onChange={handleChange} required />
                            </Form.Group>
                        )}

                        {/* Shift Start and Shift End (Only for Guards) */}
                        {formData.role === "guard" && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>Shift Start</Form.Label>
                                    <Form.Control type="time" name="shiftStart" value={formData.shiftStart} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Shift End</Form.Label>
                                    <Form.Control type="time" name="shiftEnd" value={formData.shiftEnd} onChange={handleChange} required />
                                </Form.Group>
                            </>
                        )}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary">
                                Save Employee
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this employee?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}