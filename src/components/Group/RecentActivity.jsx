import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { saveData } from '../../utils/storage';

function RecentActivity({ groups }) {
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);

  const navigate = useNavigate();
  const handleCardClick = (groupId) => {
    navigate(`/expenses/${groupId}`);
    saveData("selectedGroupId", groupId);
  };

  useEffect(() => {
    const allExpenses = groups.map(group => group.expenses || []).flat();
    const allPayments = groups.map(group => group.payments || []).flat();
    setExpenses(allExpenses);
    setPayments(allPayments);
  }, [groups]);

  const activities = [
    ...groups.map(group => ({
      type: 'group',
      date: new Date(group.date).getTime(), // fallback if missing
      data: group,
    })),
    ...expenses.map(expense => ({
      type: 'expense',
      date: expense.date,
      data: expense,
    })),
    ...payments.map(payment => ({
      type: 'payment',
      date: payment.date,
      data: payment,
    })),
  ];

  // Sort by latest date
  activities.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Take latest 5
  const latestActivities = activities.slice(0, 10);

  console.log(activities)

  // Find group name by groupId helper (for payment activity)
const getGroupName = (paymentId) => {
  const group = groups.find(g => 
    g.payments.find(p => p.paymentId === paymentId)
  );
  return group ? group.groupName : 'Unknown Group || Group was Deleted';
};

  return (
    <div className="recentActivity px-4">
      <div className="recentActivityTitle pb-3 pt-3 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold fs-5">RECENT ACTIVITY</h4>
      </div>
      <div id="recentActivityList">
        {latestActivities.length === 0 ? (
          <p className="text-secondary">No recent activity.</p>
        ) : (
          latestActivities.map((activity, i) => (
            <div
              key={i}
              className="activityDetails shadow-sm d-flex flex-column row-gap-1 px-3 mb-1 py-3 bg-white rounded"
            >
              {activity.type === 'expense' && (
                <>
                  <p className="m-0 fw-medium" style={{ fontSize: '0.9rem' }}>
                    {activity.data.paidBy} paid ₹{activity.data.amount} for "{activity.data.description}"
                  </p>
                  <p className="m-0 fw-semibold text-secondary" style={{ fontSize: '0.8rem' }}>
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </>
              )}

              {activity.type === 'group' && (
                <>
                  <p
                    className="m-0 fw-medium"
                    style={{ fontSize: '0.9rem', cursor: "pointer"  }}
                    onClick={() => handleCardClick(activity.data.groupId)}
                  >
                    Group "{activity.data.groupName}" is created.
                  </p>

                  <p className="m-0 fw-semibold text-secondary" style={{ fontSize: '0.8rem' }}>
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </>
              )}

              {activity.type === 'payment' && (
                
                <>
                
                  <p className="m-0 fw-medium" style={{ fontSize: '0.9rem' }}>
                    You settled up with "{activity.data.to}" in {getGroupName(activity.data.paymentId)}.
                  </p>
                  <p className="m-0 fw-semibold text-secondary" style={{ fontSize: '0.8rem' }}>
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
