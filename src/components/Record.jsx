import React from "react";

const Record = ({ record, onEdit, onDelete }) => {
  const formattedDate = new Date(record.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const displayedAmount = record.amount > 0 ? record.amount : -record.amount;
  const amountType = record.amount > 0 ? "Income" : "Expense";

  return (
    <tr className="record">
      <td>{record.category}</td>
      <td>{record.description}</td>
      <td>{formattedDate}</td>
      <td className={record.amount > 0 ? "income" : "expense"}>
        {displayedAmount} $
      </td>
      <td>{amountType}</td>
      <td>
        <button onClick={() => onEdit(record.id)}>Edit</button>
        <button onClick={() => onDelete(record.id)}>Delete</button>
      </td>
    </tr>
  );
};
export default Record;
