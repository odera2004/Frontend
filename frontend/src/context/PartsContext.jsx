import React, { createContext, useState, useEffect } from "react";

export const PartsContext = createContext();

export const PartsProvider = ({ children }) => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/parts");
      const data = await response.json();
      setParts(data);
    } catch (err) {
      setError("Failed to fetch parts");
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new part
  const addPart = async (newPart) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPart),
      });

      if (response.ok) {
        const addedPart = await response.json();
        setParts([...parts, addedPart]); // Update parts state
      } else {
        throw new Error("Failed to add part");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <PartsContext.Provider value={{ parts, loading, error, addPart }}>
      {children}
    </PartsContext.Provider>
  );
};
