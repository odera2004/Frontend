import React, { createContext, useState } from 'react';

// Create the context
export const WorkOrderContext = createContext();

// Create a provider component
export const WorkOrderProvider = ({ children }) => {
  const [workOrderData, setWorkOrderData] = useState(null);

  // Function to create a new work order
  const createWorkOrder = async (formData) => {
    try {
      const response = await fetch(' http://127.0.0.1:5000/work_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.service,
          vehicle_id: formData.licensePlate, // assuming you want to store license plate as vehicle_id
          status: 'Pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating work order');
      }

      const result = await response.json();
      setWorkOrderData(result);
      return result; // Optionally return the created work order data
    } catch (error) {
      console.error('Error creating work order:', error);
      return { error: error.message }; // Handle error gracefully
    }
  };

  return (
    <WorkOrderContext.Provider value={{ workOrderData, createWorkOrder }}>
      {children}
    </WorkOrderContext.Provider>
  );
};
