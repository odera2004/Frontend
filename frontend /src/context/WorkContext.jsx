import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WorkOrderContext = createContext();

export const WorkOrderProvider = ({ children }) => {
    const [workOrders, setWorkOrders] = useState([]);
    const BASE_URL = "http://localhost:5000";

    // Fetch all work orders
    useEffect(() => {
        axios.get(`${BASE_URL}/work_orders`)
            .then(response => setWorkOrders(response.data))
            .catch(error => console.error("Error fetching work orders:", error));
    }, []);

    // Create a new work order
    const createWorkOrder = async (workOrderData) => {
        try {
            const response = await axios.post(`${BASE_URL}/work_order`, workOrderData);
            setWorkOrders(prev => [...prev, response.data]);
        } catch (error) {
            console.error("Error creating work order:", error);
        }
    };

    // Update a work order
    const updateWorkOrder = async (id, updatedData) => {
        try {
            const response = await axios.put(`${BASE_URL}/work_order/${id}`, updatedData);
            setWorkOrders(prev => prev.map(order => (order.id === id ? response.data : order)));
        } catch (error) {
            console.error("Error updating work order:", error);
        }
    };

    // Delete a work order
    const deleteWorkOrder = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/work_order/${id}`);
            setWorkOrders(prev => prev.filter(order => order.id !== id));
        } catch (error) {
            console.error("Error deleting work order:", error);
        }
    };

    return (
        <WorkOrderContext.Provider value={{ workOrders, createWorkOrder, updateWorkOrder, deleteWorkOrder }}>
            {children}
        </WorkOrderContext.Provider>
    );
};

export const useWorkOrders = () => useContext(WorkOrderContext);
