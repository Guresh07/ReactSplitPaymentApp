import React from 'react'

const BalanceList = ({ payments, groupName }) => {
  console.log(payments)

  return (
    <>
      <div>
        {/* Transaction History */}
        <div className="transactionHistory bg-white px-3 py-2 mt-3 rounded">
          <div className="transactionHistoryTitle d-flex justify-content-sm-between justify-content-center align-items-center">
            <h4 className="fw-medium my-3" style={{ fontSize: "1.1rem" }}>
              Transaction History
            </h4>
          </div>

          <div className="transactionList px-sm-4">
            {payments && payments.length > 0 ? (
              payments.map((payment, index) => (
                <React.Fragment key={payment.paymentId}>
                  <div className="listItem d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center column-gap-sm-3">
                      <span
                        className="p-3 rounded-circle d-flex justify-content-center align-items-center d-none d-sm-inline py-sm-2"
                        style={{ backgroundColor: "rgb(225 228 255)" }}
                      >
                        <i
                          className="fa-solid fa-file-invoice"
                          style={{ color: "#2a74f4" }}
                        ></i>
                      </span>
                      <div className="d-flex flex-column justify-content-center">
                        <p className="m-0 fw-medium" style={{ fontSize: "0.9rem" }}>
                          {payment.from} paid to {payment.to}
                        </p>
                        <p className="m-0 fw-semibold text-secondary" style={{ fontSize: "0.8rem" }}>
                          {new Date(payment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })} . with {groupName}
                        </p>
                        <p className="m-0 fw-semibold text-secondary" style={{ fontSize: "0.8rem" }}>{payment.note ? `Note:- ${payment.note}` : ""}</p>
                      </div>
                    </div>
                    <div>
                      <p
                        className="m-0 fw-bold"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {"₹"+payment.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))
            ) : (
              <p className="text-center text-secondary my-3">No transactions yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BalanceList
