import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';  

export const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [pendingBillings, setPendingBillings] = useState([]);
  const [previousBillings, setPreviousBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { current_user } = useContext(UserContext);  

  // Function to fetch billings for the current user
  const fetchBillings = async () => {
    if (!current_user) return;

    try {
      // Fetch all billings for the current user
      const response = await fetch(`https://garage-7f3u.onrender.com/billings?user_id=${current_user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching billings');
      }

      const data = await response.json();

      // Separate billings into pending and previous
      const pending = data.filter(billing => billing.payment_status === 'Pending');
      const previous = data.filter(billing => billing.payment_status === 'Paid');

      setPendingBillings(pending);
      setPreviousBillings(previous);
    } catch (error) {
      console.error('Error fetching billings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (current_user) {  
      fetchBillings();
    }
  }, [current_user]);  

  return (
    <BillingContext.Provider value={{
      pendingBillings,
      previousBillings,
      loading,
      fetchBillings,  
    }}>
      {children}
    </BillingContext.Provider>
  );
};