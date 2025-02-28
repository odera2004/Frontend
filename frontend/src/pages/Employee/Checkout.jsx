import React, { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";

export default function Checkout() {
  const { checkoutVehicle } = useEmployees();
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setMessage(null);
    setError(null);

    if (!vehiclePlate.trim()) {
      setError("Please enter a vehicle number plate.");
      return;
    }

    try {
      const response = await checkoutVehicle(vehiclePlate);
      setMessage(response.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="content" style={{ padding: "20px", width: "100%" }}>
      <h1 className="mb-4" style={{ color: "#343a40" }}>Security Checkout</h1>

      {/* Input Section */}
      <div className="mb-4">
        <label htmlFor="vehicleNumberPlate" className="form-label" style={{ fontWeight: "bold" }}>
          Vehicle Number Plate:
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="vehicleNumberPlate"
            placeholder="Enter vehicle number plate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
          <button
            className="btn btn-secondary"
            type="button"
            style={{ backgroundColor: "#343a40", borderColor: "#6c757d" }}
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
