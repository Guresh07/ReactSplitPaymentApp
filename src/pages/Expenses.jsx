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
import { getGroups, updategroup } from "../components/Apis/Api";


const Expenses = () => {

  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState();
  const [expenses, setExpenses] = useState([]);
  const [expensesTotalAmount, setTotalAmount] = useState(0)
  const [TotalBalance, setTotalBalance] = useState(0)
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedGroupName, setEditedGroupName] = useState("");


  const fetchGroup = async () => {
    try {
      const response = await axios.get(`${getGroups}/${groupId}`);
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

  const updateGroup = async (updatedGroup) => {
    await axios.put(`${updategroup}/${groupId}`, updatedGroup);
    await fetchGroup();
  };

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
        currentUser.userData.userName,
        newExpense.splitType,   // <- pass splitType
        newExpense.splits       // <- pass custom splits if any
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

      setTotalAmount(totalAmount);
      setMembers(updatedMembers);
      console.log(updatedMembers);

      await updateGroup(group);

      console.log("Expense and balances updated successfully");

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const addNewMember = async (newMember) => {

    // Add to members state
    const updatedMembers = [...members, newMember];
    group.groupMembers = updatedMembers;

    await updateGroup(group);
    setMembers(updatedMembers);
  };

  const updateGroupName = async (newName) => {
    try {
      const updatedGroup = { ...group, groupName: newName };
      await updateGroup(updatedGroup);
    } catch (err) {
      console.error("Error updating group name:", err);
    }
  };

  const handleGroupNameSave = async () => {
    if (editedGroupName.trim() === "" || editedGroupName === group.groupName) {
      setIsEditingName(false);
      return;
    }

    try {
      const updatedGroup = { ...group, groupName: editedGroupName.trim() };
      await updateGroup(updatedGroup);
      setIsEditingName(false);
    } catch (err) {
      console.error("Error updating group name:", err);
    }
  };

  // Fetch group data on mount and when groupId changes
  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  // Recalculate total balance when members list updates
  useEffect(() => {
    if (members && currentUser) {
      const yourTotalBalance = totalBalance(members, currentUser.userData.userName);
      setTotalBalance(yourTotalBalance);
      console.log("Updated members", members);
    }
  }, [members, currentUser]);

  if (loading) return <div className="text-center mt-5 vh-100 d-flex align-items-center justify-content-center"><div className="spinner-border text-primary" role="status"></div></div>;
  if (!group) return <p className="text-center mt-5">Group not found</p>;

  return (
    <div className="container position-relative">
      <Header />
      <section
        className="px-4 py-3 rounded"
        style={{ backgroundColor: "#f0f8ff", marginBottom: "100px" }}
      >

        {/* Go Back */}
        <div className="goBack">

          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="btn fw-bold text-decoration-none border-0 fs-5 px-0"
            >
              <i className="bi bi-arrow-left me-2"></i>
            </Link>

            {isEditingName ? (
              <input
                type="text"
                value={editedGroupName}
                onChange={(e) => setEditedGroupName(e.target.value)}
                onBlur={() => handleGroupNameSave()}
                onKeyDown={(e) => e.key === "Enter" && handleGroupNameSave()}
                className="form-control form-control-sm d-inline-block"
                style={{ width: "auto", maxWidth: "200px" }}
                autoFocus
              />
            ) : (
              <>
                <span id="groupTitle" className="fw-bold fs-5">{group.groupName}</span>
                <i
                  className="fa-solid fa-pen-to-square ms-2"
                  data-bs-toggle="tooltip" 
                  data-bs-title="Edit Group Name"
                  role="button"
                  onClick={() => {
                    setIsEditingName(true);
                    setEditedGroupName(group.groupName);
                  }}
                  style={{ fontSize: "1rem", cursor: "pointer", color:"#1b59c5" }}
                ></i>
              </>
            )}
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
            <button
              type="button"
              className="btn btn-sm btn-outline-primary fw-medium ms-2"
              style={{ fontSize: "0.8rem" }}
              data-bs-toggle="modal"
              data-bs-target="#addMemberModal"
            >
              + Add New Person
            </button>
          </div>
          <MembersDetails membersData={members} currentUser={currentUser.userData.userName} expensesTotal={expensesTotalAmount} onAddNewPerson={addNewMember} />
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

      </section>
      <Footer />
    </div>
  );
};

export default Expenses;




