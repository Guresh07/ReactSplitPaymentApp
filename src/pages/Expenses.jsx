import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import MembersDetails from "../components/Expense/MembersDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import ExpensesSummary from "../components/Expense/ExpensesSummary";
import ExpenseList from "../components/Expense/ExpenseList";
import AddExpenseModal from "../components/Expense/AddExpenseModal";
import { totalBalance, updateSplitAmounts } from "../utils/calculator";
import { getData } from "../utils/storage";

const Expenses = () => {


  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState();
  const [expenses, setExpenses] = useState([]);
  const [expensesTotalAmount, setTotalAmount] = useState(0)
  const [TotalBalance, setTotalBalance] = useState(0)




  const fetchGroup = async () => {
    try {
      const response = await axios.get(`https://6866093989803950dbb10192.mockapi.io/api/groups/${groupId}`);
      setGroup(response.data);
      setMembers(response.data.groupMembers);
      console.log(response.data);
 
      setExpenses(response.data.expenses.reverse())
      setTotalAmount(response.data.totalAmount)
      setLoading(false);
    } catch (err) {
      console.error("Error fetching group:", err);
      setLoading(false);
    }
  };



  const currentUser = getData("currentUser");


  const addExpense = async (newExpenseData) => {
    try {
      const newExpense = {
        expenseId: uuidv4(),
        ...newExpenseData,
        date: Date.now()
      };

      // Calculate updated member balances
      const updatedMembers = updateSplitAmounts(
        [...group.groupMembers],
        newExpense.amount,
        newExpense.paidBy,
        currentUser.user.username
      );

      // Replace members in group with updated balances
      group.groupMembers = updatedMembers;

      // Add new expense to group expenses
      group.expenses.push(newExpense);

      // Recalculate total amount
      const totalAmount = group.expenses.reduce(
        (sum, expense) => sum + +(expense.amount), 0
      );
      group.totalAmount = totalAmount;
      group.youOwed = TotalBalance;
      console.log(TotalBalance)





      // Update state
      // setExpenses([...expenses, newExpense]);
      setTotalAmount(totalAmount);
      setMembers(updatedMembers);
      console.log(updatedMembers);



      // Save changes to backend
      await axios.put(`https://6866093989803950dbb10192.mockapi.io/api/groups/${groupId}`, group);
      await fetchGroup();

      console.log("Expense and balances updated successfully");

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  //   let yourTotalBalance = totalBalance(members, currentUser.user.username);
  // setTotalBalance(yourTotalBalance);
  // console.log(members)




// Fetch group data on mount and when groupId changes
useEffect(() => {
  fetchGroup();
}, [groupId]);

// Recalculate total balance when members list updates
useEffect(() => {
  if (members && currentUser) {
    const yourTotalBalance = totalBalance(members, currentUser.user.username);
    setTotalBalance(yourTotalBalance);
    console.log("Updated members", members);
  }
}, [members, currentUser]);


  if (loading) return <div className="text-center mt-5 vh-100 d-flex align-items-center justify-content-center"><div className="spinner-border text-primary" role="status"></div></div>;
  if (!group) return <p className="text-center mt-5">Group not found</p>;
  return (
    <div className="container position-relative">
      <Header />

      <div
        className="px-4 py-3 rounded"
        style={{ backgroundColor: "#f0f8ff", marginBottom: "100px" }}
      >
        {/* Go Back */}
        <div className="goBack">
          <div>
            <Link
              to="/"
              className="btn fw-bold text-decoration-none border-0 fs-5 px-0"
            >
              <i className="bi bi-arrow-left me-2"></i>
              <span id="groupTitle">{group.groupName}</span>
            </Link>
          </div>
        </div>

        {/* Summary */}
        <ExpensesSummary expensesTotal={expensesTotalAmount} totalMembers={members.length} totalBalance={TotalBalance} />

        {/* Members List */}
        <div className="membersSection bg-white px-3 py-2 mt-3 rounded">
          <div className="membersTitle my-3 d-flex align-items-center justify-content-center justify-content-sm-between">
            <h4 className="fw-medium" style={{ fontSize: "1.1rem" }}>
              Members
            </h4>
          </div>

          <MembersDetails membersData={members} currentUser={currentUser.user.username} expensesTotal={expensesTotalAmount}/>
        </div>

        {/* Expenses List */}
        <div className="expenses bg-white px-3 py-2 mt-3 rounded">
          <div className="expensesTitle d-flex flex-wrap justify-content-sm-between align-items-center justify-content-center">
            <h4 className="fw-medium my-3" style={{ fontSize: "1.1rem" }}>
              Expenses
            </h4>

            <AddExpenseModal onAddExpense={addExpense} groupId={groupId} membersData={members} />
            <button
              type="button"
              className="btn btn-primary fw-medium ms-2 mb-sm-0"
              style={{ fontSize: "0.8rem" }}
              data-bs-toggle="modal"
              data-bs-target="#addExpenseModal"
            >
              + Add Expense
            </button>
          </div>
          {/* Expenses List */}
          <ExpenseList expenses={expenses} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Expenses;




