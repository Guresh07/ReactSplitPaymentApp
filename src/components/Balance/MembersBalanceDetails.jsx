import React from 'react'

const MembersBalanceDetails = ({ members = [], currentUser, onPayClick }) => {
  return (
    <>
      <div>
        {/* Simplified Settlement */}
        <div className="SimplifiedSettlementSection bg-white px-3 py-2 mt-3 rounded">
          <div className="SimplifiedSettlementTitleSection d-flex flex-wrap align-items-center justify-content-center justify-content-sm-between">
            <div className="SimplifiedSettlementTitle my-1 my-sm-3">
              <h4 className="fw-medium" style={{ fontSize: "1.1rem" }}>
                Simplified Settlement
              </h4>
            </div>

            <div className="recordPaymentBtn mb-3 mb-sm-0">
              <button
                className="btn btn-primary fw-medium mx-4 mx-sm-0"
                style={{ fontSize: "0.8rem" }}
                data-bs-toggle="modal"
                data-bs-target="#recordPaymentModal"
              >
                <i className="fa-solid fa-money-bill-wave"></i> Record Payment
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="membersList px-sm-3">
            {members.map((member) => (
              <React.Fragment key={member.memberId}>
                <div className="member d-flex flex-wrap align-items-center justify-content-sm-between justify-content-center">
                  <div className="memberName d-flex align-items-center justify-content-start mx-2 mx-sm-0">
                    <p
                      className="fw-medium px-3 py-2 me-2 rounded-circle m-0"
                      style={{ backgroundColor: "#e5e5ff" }}
                    >
                      <span style={{ color: "darkblue" }}>
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </p>
                    <p className="memberName m-0 fw-medium">{member.name == currentUser ? "You" : member.name}</p>
                  </div>

                  <div className="amountGot d-flex align-items-center justify-content-end flex-wrap column-gap-2">
                    {member.balanceAmount == 0 && member.name != currentUser
                      ? <p className="m-0 fw-semibold  px-2 py-1 rounded-pill" style={{ backgroundColor: "rgb(201 255 211)", fontSize: "clamp(0.6rem, 1vw + 0.5rem, 0.8rem)", color: "darkgreen" }}><span>settled up</span></p>
                      : <p
                        className={`m-0 fw-medium ${member.balanceAmount < 0 ? 'text-danger' : 'text-success'
                          }`}
                        style={{ fontSize: "clamp(0.8rem, 1vw + 0.5rem, 0.9rem)" }}
                      >
                        {member.name == currentUser ? "" :
                          member.balanceAmount < 0
                            ? `You owe -₹${Math.abs(member.balanceAmount)}`
                            : `Owes you ₹${Math.abs(member.balanceAmount)}`}
                      </p>
                    }

                    {member.name == currentUser ? "" :
                      member.balanceAmount < 0 ? (
                        <span
                          className="btn btn-primary fw-medium m-0 px-3"
                          style={{ fontSize: "clamp(0.6rem, 1vw + 0.5rem, 0.8rem)" }}
                          data-bs-toggle="modal"
                          data-bs-target="#recordPaymentModal"
                          onClick={() => onPayClick(member.name, member.balanceAmount)}
                        >
                          Pay
                        </span>
                      ) : member.balanceAmount == 0 ? "" : (
                        <i className="fa-solid fa-bell text-primary"></i>
                      )}
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MembersBalanceDetails
