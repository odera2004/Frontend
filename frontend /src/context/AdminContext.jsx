import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from './UserContext';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [workOrders, setWorkOrders] = useState([]);
    const [billings, setBillings] = useState([]);
    const { authToken, current_user } = useContext(UserContext);

    // Fetch work orders from the API
    const fetchWorkOrders = async () => {
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
    };

    // Fetch billing data from the API
    const fetchBillings = async () => {
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
    };

    // Add a new work order via the API
    const addWorkOrder = async (newWorkOrder) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/work_order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
                body: JSON.stringify(newWorkOrder)
            });
            if (!response.ok) throw new Error('Failed to add work order');
            toast.success("Work order added successfully!");
            fetchWorkOrders();  // Refresh the work orders after adding a new one
        } catch (error) {
            console.error('Error adding work order:', error);
            toast.error('Failed to add work order');
        }
    };

    // Fetch work orders and billings when the current user is available
    useEffect(() => {
        if (current_user) {
            fetchWorkOrders();
            fetchBillings();
        }
    }, [current_user]);

    return (
        <AdminContext.Provider value={{
            workOrders, 
            billings,
            fetchWorkOrders, 
            fetchBillings, 
            addWorkOrder
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
