import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';  // Import UserContext to access the current user

export const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [pendingBillings, setPendingBillings] = useState([]);
  const [previousBillings, setPreviousBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { current_user } = useContext(UserContext);  // Get the current user

  // Function to fetch billings for the current user
  const fetchBillings = async () => {
    if (!current_user) return;

    try {
      // Fetch all billings for the current user
      const response = await fetch(`http://127.0.0.1:5000/billings?user_id=${current_user.id}`, {
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
    if (current_user) {  // Only fetch billings if the current user is available
      fetchBillings();
    }
  }, [current_user]);  // Re-fetch when the current user changes

  return (
    <BillingContext.Provider value={{
      pendingBillings,
      previousBillings,
      loading,
      fetchBillings,  // Expose fetchBillings for manual refreshes
    }}>
      {children}
    </BillingContext.Provider>
  );
};