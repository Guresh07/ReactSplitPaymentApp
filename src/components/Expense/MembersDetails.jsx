import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


const MembersDetails = ({ membersData, currentUser, expensesTotal, onAddNewPerson }) => {

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");


  const handleAddNewperson = (e) => {
    e.preventDefault()
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      alert("Please enter both name and email");
      return;
    }

    // Create new member object
    const newMember = {
      memberId: uuidv4(),
      name: newMemberName,
      email: newMemberEmail,
      balanceAmount: 0,
    };

    onAddNewPerson(newMember)

    setNewMemberName("");
    setNewMemberEmail("");
  }



  return (
    <div className="membersData px-sm-3">
      {membersData.map((member, idx) => (
        <>
          <div className="member d-flex flex-wrap gap-2 align-items-center justify-content-sm-between justify-content-center">
            <div className="d-flex align-items-center justify-content-start me-auto mx-sm-0">
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
            <div className="amountGot">
              {member.balanceAmount == 0 && member.name != currentUser
                ? <p className="m-0 fw-semibold  px-2 py-1 rounded-pill" style={{ backgroundColor: "rgb(201 255 211)", fontSize: "0.8rem", color: "darkgreen" }}><span>{expensesTotal > 0 ? "settled up" : "no payments yet"}</span></p>
                : <p
                  className="m-0 fw-medium"
                  style={{
                    fontSize: "0.9rem",
                    color: member.balanceAmount < 0 ? "red" : "green",
                  }}
                >
                  {member.name == currentUser ? "" :
                    member.balanceAmount < 0
                      ? `you owe -₹${Math.abs(member.balanceAmount)}`
                      : `owes you ₹${member.balanceAmount}`}
                </p>
              }
            </div>
          </div>
          <hr />
        </>
      ))}

      <div className="modal fade" id="addMemberModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleAddNewperson}>
              <div className="modal-header">
                <h5 className="modal-title">Add New Person</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  // onClick={addNewMember}
                  data-bs-dismiss="modal"
                >
                  Add Person
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MembersDetails;
