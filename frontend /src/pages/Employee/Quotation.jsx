import React, { useState, useContext, useEffect } from "react";
import { usePayment } from "../../context/PaymentContext";
import { AdminContext } from "../../context/AdminContext";

export default function Quotation() {
  const { addBilling, isLoading } = usePayment();
  const [parts, setParts] = useState([{ name: "", quantity: "" }]);
  const [workOrderId, setWorkOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentDeadline, setPaymentDeadline] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState(""); 
  const { billings, fetchBillings } = useContext(AdminContext);

  useEffect(() => {
    fetchBillings();
  }, []);

  const addPart = () => {
    setParts([...parts, { name: "", quantity: "" }]);
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
    const partsUsed = parts
      .filter((part) => part.name.trim() && part.quantity > 0)
      .map((part) => ({
        part_name: part.name,
        quantity: part.quantity,
      }));

    // Call the addBilling function from PaymentContext
    await addBilling(billingData, partsUsed);
  };

  // Filter billings based on search term
  const filteredBillings = billings.filter((bill) =>
    bill.id.toString().includes(searchTerm) ||
    bill.work_order_id.toString().includes(searchTerm)
  );

  return (
    <div className="content" style={{ padding: "20px", width: "100%" }}>
      <h1>Generate Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="workOrderId" className="form-label">
            Work Order ID
          </label>
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
                  onChange={(e) =>
                    handlePartChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={part.quantity}
                  onChange={(e) =>
                    handlePartChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-dark mt-2" onClick={addPart}>
            Add Part
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount
          </label>
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
          <label htmlFor="paymentDeadline" className="form-label">
            Payment Deadline
          </label>
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
          <label htmlFor="paymentDate" className="form-label">
            Payment Date
          </label>
          <input
            type="date"
            className="form-control"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentStatus" className="form-label">
            Payment Status
          </label>
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
      <div className="container-fluid mt-4">
        <h2 className="mb-4"> All Billings</h2>

        {/* Search Panel */}
        <div className="d-flex justify-content-between">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search Invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>

        {/* Bill Management Table */}
        <div className="card mt-4 shadow-sm">
          <div className="card-header bg-light border-0">
            <h4 className="mb-0">Bill Management</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Invoice #</th>
                    <th>Work Order Number</th>
                    <th>Due Date</th>
                    <th>Payment Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBillings.length > 0 ? (
                    filteredBillings.map((bill) => (
                      <tr key={bill.id}>
                        <td>#Inv-{bill.id}</td>
                        <td>#WO-{bill.work_order_id}</td>
                        <td>{bill.due_date}</td>
                        <td>{bill.payment_date || "N/A"}</td>
                        <td>Ksh {bill.total_amount?.toLocaleString() || "0"}</td>
                        <td>
                          <span
                            className={`badge ${
                              bill.payment_status?.toLowerCase() === "paid"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {bill.payment_status?.toUpperCase() || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No billing records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
