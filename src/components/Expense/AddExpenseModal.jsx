import React, { useState } from "react";

function AddExpenseModal({ onAddExpense, membersData }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("🍽️ Food");
  const [splitType, setSplitType] = useState("Equal");

  const handleAddExpense = (e) => {
    e.preventDefault();
    

    const newExpense = {
      description,
      amount: parseFloat(amount),
      paidBy,
      category,
      splitType,
    };

    onAddExpense(newExpense);

    // Reset form
    setDescription("");
    setAmount("");
    setPaidBy();
    setCategory("🍽️ Food");
    setSplitType("Equal");


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
              {/* Description */}
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Expense description" className="form-control mb-2" required />

              {/* Amount */}
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="form-control mb-2" required />

              {/* Paid By */}
              <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="form-select mb-2">
                <option>Select Person</option>
                {membersData.map((member) => (
                  <option key={member.memberId} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>

              {/* Category */}
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select mb-2">
                <option>🍽️ Food</option>
                <option>🎬 Entertainment</option>
                <option>🚗 Travel</option>
                <option>🏠 Rent</option>
              </select>

              {/* Split Type */}
              <select value={splitType} onChange={(e) => setSplitType(e.target.value)} className="form-select">
                <option>Equal</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Expense</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;
