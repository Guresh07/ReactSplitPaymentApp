import React, { useState } from "react";

function AddExpenseModal({ onAddExpense, membersData }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("🍽️ Food");
  const [splitType, setSplitType] = useState("Equal");
  const [customSplits, setCustomSplits] = useState({});

  const handleSplitChange = (name, value) => {
    setCustomSplits((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!paidBy || paidBy === "Select Person") {
      alert("Please select who paid the expense.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (splitType === "Custom") {
      const totalSplit = Object.values(customSplits).reduce((sum, val) => sum + val, 0);
      if (totalSplit !== parseFloat(amount)) {
        alert(`Custom splits total ₹${totalSplit} must equal expense amount ₹${amount}`);
        return;
      }
    }

    const newExpense = {
      description,
      amount: parseFloat(amount),
      paidBy,
      category,
      splitType,
      splits: splitType === "Custom" ? customSplits : null,
    };

    onAddExpense(newExpense);

    // Reset form
    setDescription("");
    setAmount("");
    setPaidBy("");
    setCategory("🍽️ Food");
    setSplitType("Equal");
    setCustomSplits({});
  };

  return (
    <div className="modal fade" id="addExpenseModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleAddExpense}>
            <div className="modal-header">
              <h5 className="modal-title">Add New Expense</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Expense description" className="form-control mb-2" required />

              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="₹ 0.00" className="form-control mb-2" required />

              <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="form-select mb-2">
                <option value="">Select Person</option>
                {membersData.map((member) => (
                  <option key={member.memberId} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select mb-2">
                <option>🍽️ Food</option>
                <option>🎬 Entertainment</option>
                <option>🚗 Travel</option>
                <option>🏠 Rent</option>
              </select>

              <select value={splitType} onChange={(e) => setSplitType(e.target.value)} className="form-select mb-3">
                <option>Equal</option>
                <option>Custom</option>
              </select>

              {splitType === "Custom" && (
                <div className="mb-2">
                  <h6>Custom Splits:</h6>
                  {membersData.map((member) => (
                    <div key={member.memberId} className="d-flex align-items-center mb-1">
                      <label className="me-2 col-4">{member.name}</label>
                      <input
                        // type="number"
                        className="form-control"
                        value={customSplits[member.name] ?? 0}
                        onChange={(e) => handleSplitChange(member.name, e.target.value)}
                        placeholder="₹ 0.00"
                        required
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;
