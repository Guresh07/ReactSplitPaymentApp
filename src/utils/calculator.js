export const updateSplitAmounts = (members, paidAmount, paidByName, currentUserName) => {
  const totalMembers = members.length;
  const splitAmount = Math.floor(paidAmount / totalMembers)
  const totalBaseSplit = splitAmount * totalMembers;
  const remainder = Math.round(paidAmount - totalBaseSplit)


  members.forEach((member) => {

    if (paidByName === currentUserName) {

      member.balanceAmount = member.balanceAmount + splitAmount;

    }


    if (member.name === paidByName && member.name != currentUserName) {

      member.balanceAmount = member.balanceAmount - splitAmount;
    }

  });

  const payer = members.find(m => m.name === paidByName);
  if (payer) {
    payer.balanceAmount += remainder;
  }

  return members;
};

export const totalBalance = (members, currentUserName) => {

  let total = 0;

  members.forEach(member => {
    if (member.name !== currentUserName) {
      total += member.balanceAmount
    }
  })
  return total

}


export const payment = (members, amount, paidTo) => {

  members.forEach(member => {
    if (member.name === paidTo) {
      member.balanceAmount += amount
    }
  })
  return members

}

export const totalAmountOwesMe = (members, currentUserName) => {

  let totalAmount = 0;
  members.forEach(member => {
    if (member.name != currentUserName) {
      if (member.balanceAmount > 0)
        totalAmount += member.balanceAmount
    }
  })
  return totalAmount
}


export const totalAmountMeOwes = (members, currentUserName) => {

  let totalAmount = 0;
  members.forEach(member => {
    if (member.name != currentUserName) {
      if (member.balanceAmount < 0)
        totalAmount += member.balanceAmount
    }
  })
  return totalAmount

}