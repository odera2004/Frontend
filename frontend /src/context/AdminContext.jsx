import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from './UserContext';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [workOrders, setWorkOrders] = useState([]);
    const [billings, setBillings] = useState([]);
    const [technicianId, setTechnicianId] = useState(null);
    const { authToken, current_user } = useContext(UserContext);

    // Fetch Work Orders
    const fetchWorkOrders = useCallback(async () => {
        if (!current_user) return;
        try {
            const response = await fetch('http://127.0.0.1:5000/work_orders', {
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${authToken}` }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setWorkOrders(data);
        } catch (error) {
            console.error('Error fetching work orders:', error);
            toast.error('Failed to fetch work orders');
        }
    }, [authToken, current_user]);

    // Fetch Billings
    const fetchBillings = useCallback(async () => {
        if (!current_user) return;
        try {
            const response = await fetch('http://127.0.0.1:5000/billings', {
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${authToken}` }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setBillings(data);
        } catch (error) {
            console.error('Error fetching billings:', error);
            toast.error('Failed to fetch billings');
        }
    }, [authToken, current_user]);

    // Fetch technician ID for the current user
    const fetchTechnicianId = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/technician?user_id=${userId}`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setTechnicianId(data.id);
        } catch (error) {
            console.error('Error fetching technician ID:', error);
            toast.error('Failed to fetch technician ID');
        }
    };

    // Add a new work order
    const addWorkOrder = async (newWorkOrder) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/work_order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${authToken}` },
                body: JSON.stringify(newWorkOrder)
            });

            if (!response.ok) throw new Error('Failed to add work order');
            toast.success('Work order added successfully!');
            fetchWorkOrders(); 
        } catch (error) {
            console.error('Error adding work order:', error);
            toast.error('Failed to add work order');
        }
    };

    // Update billing data
    const updateBilling = async (billingId, updatedBilling) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/billings/${billingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${authToken}` },
                body: JSON.stringify(updatedBilling)
            });

            if (!response.ok) throw new Error('Failed to update billing');
            toast.success('Billing updated successfully!');
            fetchBillings(); 
        } catch (error) {
            console.error('Error updating billing:', error);
            toast.error('Failed to update billing');
        }
    };

    // Delete a billing
    const deleteBilling = async (billingId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/billings/${billingId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${authToken}` }
            });

            if (!response.ok) throw new Error('Failed to delete billing');
            toast.success('Billing deleted successfully!');
            fetchBillings(); 
        } catch (error) {
            console.error('Error deleting billing:', error);
            toast.error('Failed to delete billing');
        }
    };

    // Fetch data when the current user is available
    useEffect(() => {
        if (current_user) {
            fetchWorkOrders();
            fetchBillings();

            // Fetch technician_id if the current user is a technician
            if (current_user.role === "technician") {
                fetchTechnicianId(current_user.id);
            }
        }
    }, [current_user, fetchWorkOrders, fetchBillings]);

    return (
        <AdminContext.Provider value={{
            workOrders, 
            billings,
            technicianId,
            fetchWorkOrders, 
            fetchBillings, 
            addWorkOrder, 
            updateBilling,
            deleteBilling 
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;