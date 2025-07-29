import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";



function AddPaymentRecordModal({ onAddPayment, members, currentUser, selectedPayee, selectedAmount }) {
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  const handleRecordPayment = (e) => {
    e.preventDefault()

    if (!to || !amount) {
      alert("Please fill in required fields")
      return
    }



    const newPayment = {
      paymentId: uuidv4(),  // Or uuidv4() if you're using uuid
      from: currentUser,
      to,
      amount: parseFloat(amount),
      note,
      date: Date.now()
    }

    onAddPayment(newPayment)

    // Reset form
    setTo("")
    setAmount("")
    setNote("")


   
      if (selectedPayee) {
        setTo(selectedPayee);
      }
      if (selectedAmount) {
        setAmount(selectedAmount);
      }


    // // Close modal programmatically
    // document.querySelector("#recordPaymentModal .btn-close").click()
  }

  return (
    <div className="modal fade" id="recordPaymentModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleRecordPayment}>
            <div className="modal-header">
              <h5 className="modal-title">Record Payment</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {/* To */}
              <div className="mb-3">
                <label className="form-label">To</label>
                <select
                  className="form-select"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                >
                  <option value="">Select a person</option>
                  {members && members.length > 0 ? (
                    members
                      .filter((member) => member.name !== currentUser)
                      .map((member) => (
                        <option className='border-5' key={member.memberId} value={member.name}>
                          {member.name}
                        </option>
                      ))
                  ) : (
                    <option disabled>No members available</option>
                  )}


                </select>
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="₹ 0.00"
                  required
                />
              </div>

              {/* Note */}
              <div className="mb-3">
                <label className="form-label">Note (optional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about this payment"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPaymentRecordModal
