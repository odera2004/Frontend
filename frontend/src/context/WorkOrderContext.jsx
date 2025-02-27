import { createContext, useEffect, useState } from "react";

export const WorkOrderContext = createContext();

export const WorkOrderProvider = ({ children }) => {
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = "http://127.0.0.1:5000/work_orders";

    // Fetch all work orders
    const fetchWorkOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to fetch work orders");
            const data = await response.json();
            setWorkOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Create a new work order
    const createWorkOrder = async (workOrderData) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/work_order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workOrderData),
            });
            if (!response.ok) throw new Error("Failed to create work order");
            const newWorkOrder = await response.json();
            setWorkOrders((prev) => [...prev, newWorkOrder]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a work order
    const updateWorkOrder = async (id, workOrderData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workOrderData),
            });
            if (!response.ok) throw new Error("Failed to update work order");
            const updatedOrder = await response.json();
            setWorkOrders((prev) => prev.map((order) => (order.id === id ? updatedOrder : order)));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a work order
    const deleteWorkOrder = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to delete work order");
            setWorkOrders((prev) => prev.filter((order) => order.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add parts to a work order
    const addPartsToWorkOrder = async (workOrderId, partsData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${workOrderId}/parts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(partsData),
            });
            if (!response.ok) throw new Error("Failed to add parts to work order");
            const updatedParts = await response.json();
            setWorkOrders((prev) =>
                prev.map((order) =>
                    order.id === workOrderId ? { ...order, parts: [...order.parts, updatedParts] } : order
                )
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkOrders();
    }, []);

    return (
        <WorkOrderContext.Provider
            value={{ workOrders, loading, error, createWorkOrder, updateWorkOrder, deleteWorkOrder, addPartsToWorkOrder }}
        >
            {children}
        </WorkOrderContext.Provider>
    );
};
