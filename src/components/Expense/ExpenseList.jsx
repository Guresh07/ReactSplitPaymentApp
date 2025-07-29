import React from 'react'

const ExpenseList = ({ expenses }) => {
  console.log(expenses)
  return (
    <>
      <div>
        <div className="expensesList px-sm-4">
          {expenses.map((expense) => (
            <React.Fragment key={expense.expenseId}>
              <div className="listItem d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column justify-content-center">
                  <p
                    className="m-0 fw-medium"
                  // style={{ fontSize: "0.9rem" }}
                  >
                    {expense.name || expense.description}
                  </p>
                  <p
                    className="me-1 my-0 text-secondary"
                  // style={{ fontSize: "0.8rem" }}
                  >
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })} <span className='text-danger'>paid by {expense.paidBy}</span>  . {expense.splitType} split
                  </p>
                </div>
                <div>
                  <p className="m-0 fw-bold">
                    ₹{expense.amount}
                  </p>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default ExpenseList