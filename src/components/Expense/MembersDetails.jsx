import React from 'react';

const MembersDetails = ({ membersData, currentUser, expensesTotal }) => {
  return (
    <div className="membersData px-sm-3">
      {membersData.map((member, idx) => (
        <React.Fragment key={member.memberId || idx}>
          <div className="member d-flex flex-wrap align-items-center justify-content-sm-between justify-content-center">
            <div className="d-flex align-items-center justify-content-start mx-2 mx-sm-0">
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
              ? <p className="m-0 fw-semibold  px-2 py-1 rounded-pill" style={{ backgroundColor: "rgb(201 255 211)", fontSize: "0.8rem", color: "darkgreen" }}><span>{expensesTotal > 0 ? "settled up" : "no payments yet" }</span></p> 
              :<p
                className="m-0 fw-medium"
                style={{
                  fontSize: "0.9rem",
                  color: member.balanceAmount < 0 ? "red" : "green",
                }}
              >
                {member.name == currentUser ? "" :
                member.balanceAmount < 0
                  ? `you owe $${member.balanceAmount}`
                  : `owes you $${member.balanceAmount}`}
              </p>
              }
            </div>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MembersDetails;
