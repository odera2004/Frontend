import { createContext, useState, useEffect, useContext } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const [guardsRes, techniciansRes] = await Promise.all([
                    fetch("http://127.0.0.1:5000/guards").then((res) => res.json()),
                    fetch("http://127.0.0.1:5000/technicians").then((res) => res.json()),
                ]);
                const mergedEmployees = [
                    ...guardsRes.map((guard) => ({ ...guard, role: "guard" })),
                    ...techniciansRes.map((tech) => ({ ...tech, role: "technician" })),
                ];
                setEmployees(mergedEmployees);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const addEmployee = async (formData) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/promote_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email, 
                    role: formData.role,
                    skill_set: formData.skillSet,
                    shift_start: formData.shiftStart,
                    shift_end: formData.shiftEnd,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add employee");
            }
            const newEmployee = await response.json();
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        } catch (err) {
            setError(err.message);
        }
    };

    const checkoutVehicle = async (vehiclePlate) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ vehicle_plate: vehiclePlate }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Checkout failed");
            }
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    // Function to delete an employee
    const deleteEmployee = async (employee) => {
        try {
            let endpoint = "";
            if (employee.role === "guard") {
                endpoint = `http://127.0.0.1:5000/guards/${employee.id}`;
            } else if (employee.role === "technician") {
                endpoint = `http://127.0.0.1:5000/technicians/${employee.id}`;
            } else {
                throw new Error("Cannot delete this employee");
            }
            const response = await fetch(endpoint, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete employee");
            }
            // Update the employees state after successful deletion
            setEmployees((prevEmployees) =>
                prevEmployees.filter((emp) => emp.id !== employee.id || emp.role !== employee.role)
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <EmployeeContext.Provider value={{ employees, loading, error, addEmployee, checkoutVehicle, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeeContext);
