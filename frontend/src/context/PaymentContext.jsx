import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to add a billing and update parts inventory
  const addBilling = async (billingData, partsUsed) => {
    setIsLoading(true);
    try {
        // Add the billing
        const billingResponse = await fetch("https://garage-7f3u.onrender.com/billing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(billingData),
        });

        if (!billingResponse.ok) {
            throw new Error("Failed to add billing");
        }

        const billingResult = await billingResponse.json();
        toast.success(billingResult.msg);

        // Update parts inventory only if parts are used
        if (partsUsed.length > 0) {
            for (const part of partsUsed) {
                const partResponse = await fetch("https://garage-7f3u.onrender.com/workorder_parts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        work_order_id: billingData.work_order_id,
                        part_name: part.part_name,
                        quantity: part.quantity,
                    }),
                });

                if (!partResponse.ok) {
                    throw new Error("Failed to update parts inventory");
                }

                const partResult = await partResponse.json();
                console.log("Parts API Response:", partResult); 
                console.log("Status Code:", partResponse.status); 
                toast.success(partResult.msg);
            }
        } else {
            console.log("No parts used. Skipping parts inventory update.");
        }
    } catch (error) {
        toast.error(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ addBilling, isLoading }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);