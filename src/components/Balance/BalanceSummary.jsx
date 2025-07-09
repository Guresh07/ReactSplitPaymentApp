import React from 'react'
import { totalAmountMeOwes, totalAmountOwesMe } from '../../utils/calculator'

const BalanceSummary = ({ members = [], currentUser }) => {
  const totalOwesMe = totalAmountOwesMe(members, currentUser);
  const totalMeOwes = totalAmountMeOwes(members, currentUser);
  return (
    <>
      <div>
        {/* Total Balances */}
        <div className="TotalBalances bg-white px-3 py-2 rounded mt-3">
          <div className="TotalBalancesTitle my-2 d-flex align-items-center justify-content-sm-between justify-content-center">
            <h4 className="fw-medium" style={{ fontSize: "1.1rem" }}>
              Total Balances
            </h4>
          </div>

          <div className="balanceDetails col-12 d-flex flex-wrap align-items-center justify-content-between">
            {[
              {
                title: "Total you are owed",
                value: "$"+totalOwesMe || "$395",
                bg: "#eefde8",
                color: "green",
              },
              {
                title: "Total you owe",
                value: "$"+totalMeOwes,
                bg: "#fce9ed",
                color: "red",
              },
              {
                title: "Net balance",
                value: "$"+(totalOwesMe + totalMeOwes)||"$200",
                bg: "#eefde8",
                color: "green",
              },
            ].map((item, index) => (
              <div
                className="totalBalance col-12 d-flex align-items-center justify-content-center mb-1 col-sm-12 col-md-6 col-lg-4"
                key={index}
              >
                <div
                  className="col-11 px-3 py-2 rounded d-flex flex-column row-gap-1"
                  style={{ backgroundColor: item.bg }}
                >
                  <h6 className="m-0 fw-medium text-secondary">
                    {item.title}
                  </h6>
                  <p className="totalAmount m-0">
                    <span className="fw-bold" style={{ color: item.color }}>
                      {item.value}
                    </span>
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

export default BalanceSummary