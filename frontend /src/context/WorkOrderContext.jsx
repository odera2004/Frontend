import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';  // Import UserContext to access the current user

export const WorkOrderContext = createContext();

export const WorkOrderProvider = ({ children }) => {
  const [activeWorkOrders, setActiveWorkOrders] = useState([]);
  const [previousWorkOrders, setPreviousWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { current_user } = useContext(UserContext);  // Get the current user

  // Function to fetch active work orders for the current user
  const fetchActiveWorkOrders = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/work_orders?status=active&user_id=${current_user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching active work orders');
      }

      const data = await response.json();
      setActiveWorkOrders(data);
    } catch (error) {
      console.error('Error fetching active work orders:', error);
    }
  };

  // Function to fetch previous work orders for the current user
  const fetchPreviousWorkOrders = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/work_orders?status=previous&user_id=${current_user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching previous work orders');
      }

      const data = await response.json();
      setPreviousWorkOrders(data);
    } catch (error) {
      console.error('Error fetching previous work orders:', error);
    }
  };

  useEffect(() => {
    if (current_user) {  // Only fetch work orders if the current user is available
      const fetchOrders = async () => {
        await Promise.all([fetchActiveWorkOrders(), fetchPreviousWorkOrders()]);
        setLoading(false);
      };

      fetchOrders();
    }
  }, [current_user]);  // Re-fetch when the current user changes

  return (
    <WorkOrderContext.Provider value={{
      activeWorkOrders,
      previousWorkOrders,
      loading,
    }}>
      {children}
    </WorkOrderContext.Provider>
  );
};