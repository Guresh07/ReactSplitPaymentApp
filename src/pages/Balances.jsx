import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import BalanceSummary from "../components/Balance/BalanceSummary";
import MembersBalanceDetails from "../components/Balance/MembersBalanceDetails";
import AddPaymentRecordModal from "../components/Balance/AddPaymentRecordModal";
import axios from "axios";
import BalanceList from "../components/Balance/BalanceList";
import { getData } from "../utils/storage";
import { payment } from "../utils/calculator";

const Balances = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [Balances, setBalances] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPayee, setSelectedPayee] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");



  const fetchGroup = async () => {
    try {
      const response = await axios.get(`https://6866093989803950dbb10192.mockapi.io/api/groups/${groupId}`);
      setGroup(response.data);
      setMembers(response.data.groupMembers);
      console.log(response.data)
      setBalances(response.data.payments.reverse())
      setLoading(false);
    } catch (err) {
      console.error("Error fetching group:", err);
      setLoading(false);
    }
  };

  const currentUser = getData("currentUser");

  const addPayment = async (newPaymentData) => {
    try {


      // Calculate updated member balances
      const updatedMembers = payment(
        [...group.groupMembers],
        newPaymentData.amount,
        newPaymentData.to,
      );

      // Replace members in group with updated balances
      group.groupMembers = updatedMembers;

      setBalances([...Balances, newPaymentData]);
      // Add new payment to the group's payments array
      group.payments.push(newPaymentData);

      await axios.put(`https://6866093989803950dbb10192.mockapi.io/api/groups/${groupId}`, group)

      // Refresh state
      fetchGroup()

      console.log("Payment recorded successfully")
    } catch (err) {
      console.error("Error recording payment:", err)
    }
  }

  const handlePayClick = (payeeName, amount) => {
    setSelectedPayee(payeeName);
    setSelectedAmount(Math.abs(amount));  // pass absolute amount
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId]);


  return (
    <div className="container position-relative">
      <Header />

      <div
        className="px-4 py-3 rounded"
        style={{ backgroundColor: "#f0f8ff", marginBottom: "100px" }}
      >
        {/* Balance Overview Title */}
        <div className="balanceOverviewTitle">
          <h4 className="fw-bold fs-5 px-0">Balance Overview</h4>
        </div>

        <BalanceSummary members={members} currentUser={currentUser.user.username} />

        <AddPaymentRecordModal onAddPayment={addPayment} members={members} currentUser={currentUser.user.username} selectedPayee={selectedPayee} selectedAmount={selectedAmount}/>

        <MembersBalanceDetails members={members} currentUser={currentUser.user.username} onPayClick={handlePayClick}/>

        <BalanceList payments={Balances} />
      </div>

      <Footer />
    </div>
  );
};

export default Balances;
