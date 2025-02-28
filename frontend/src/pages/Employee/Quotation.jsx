import React, { useState, useContext } from "react";
import { usePayment } from "../../context/PaymentContext";

export default function Quotation() {
  const { addBilling, isLoading } = usePayment();
  const [parts, setParts] = useState([{ name: '', quantity: '' }]);
  const [workOrderId, setWorkOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentDeadline, setPaymentDeadline] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const addPart = () => {
    setParts([...parts, { name: '', quantity: '' }]);
  };

  const handlePartChange = (index, field, value) => {
    const newParts = [...parts];
    newParts[index][field] = value;
    setParts(newParts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare billing data
    const billingData = {
      total_amount: totalAmount,
      due_date: paymentDeadline,
      payment_date: paymentDate || null,
      payment_status: paymentStatus,
      work_order_id: workOrderId,
    };

    // Prepare parts used data
    const partsUsed = parts.map((part) => ({
      part_name: part.name, // ✅ Correct key
      quantity: part.quantity,
    }));
    

    // Call the addBilling function from PaymentContext
    await addBilling(billingData, partsUsed);
  };

  return (
    <div className="content" style={{ padding: "20px", width: "100%" }}>
      <h1>Generate Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="workOrderId" className="form-label">Work Order ID</label>
          <input
            type="text"
            className="form-control"
            id="workOrderId"
            placeholder="Hint: Just the number"
            value={workOrderId}
            onChange={(e) => setWorkOrderId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Parts Used</label>
          {parts.map((part, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Part Name"
                  value={part.name}
                  onChange={(e) => handlePartChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={part.quantity}
                  onChange={(e) => handlePartChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-dark mt-2" onClick={addPart}>
            Add Part
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">Total Amount</label>
          <input
            type="number"
            className="form-control"
            id="totalAmount"
            placeholder="Enter total amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentDeadline" className="form-label">Payment Deadline</label>
          <input
            type="date"
            className="form-control"
            id="paymentDeadline"
            value={paymentDeadline}
            onChange={(e) => setPaymentDeadline(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentDate" className="form-label">Payment Date</label>
          <input
            type="date"
            className="form-control"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentStatus" className="form-label">Payment Status</label>
          <select
            className="form-control"
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <button type="submit" className="btn btn-dark" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Recent Billings Table */}
      <h2 className="mt-5">Recent Billings</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th scope="col">Work Order ID</th>
              <th scope="col">Parts Used</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Payment Deadline</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Payment Status</th>
            </tr>
          </thead>
          <tbody id="billingTableBody">
            {/* Rows will be dynamically populated here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}