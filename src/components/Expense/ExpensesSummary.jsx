import React from 'react'

const ExpensesSummary = ({expensesTotal, totalMembers, totalBalance}) => {
    return (
        <>
            <div>

                <div className="summary bg-white px-3 py-2 rounded mt-3">
                    <div className="summaryTitle my-2 d-flex align-items-center justify-content-sm-between justify-content-center">
                        <h4 className="fw-medium" style={{ fontSize: "1.1rem" }}>
                            Summary
                        </h4>
                    </div>

                    <div className="ammountDetails col-12 d-flex flex-wrap align-items-center justify-content-between">
                        {[
                            { title: "Total Expenses", value: expensesTotal },
                            { title: "Your Balance", value: totalBalance, color: totalBalance < 0 ? "red" : "#09be09" },
                            { title: "Members", value: totalMembers},
                        ].map((item, index) => (
                            <div
                                className="totalExpenses col-12 d-flex align-items-center justify-content-center mb-1 col-sm-12 col-md-6 col-lg-4"
                                key={index}
                            >
                                <div
                                    className="col-11 px-3 py-2 rounded"
                                    style={{ backgroundColor: "#f0f8ff" }}
                                >
                                    <h6 className="m-0 fw-medium text-secondary">
                                        {item.title}
                                    </h6>
                                    <p
                                        className="m-0 fw-bold"
                                        style={{ color: item.color || "inherit" }}
                                    >
                                        ${item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    )
}

export default ExpensesSummary