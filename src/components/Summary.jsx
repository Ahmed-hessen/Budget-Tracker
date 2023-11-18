import React from "react";

const Summary = ({ calculateTotal, calculateBalance }) => {
  return (
    <div id="summary">
      <p>
        Total Income : <strong> {calculateTotal("income")} $ </strong>
      </p>
      <p>
        Total Expenses : <strong> {calculateTotal("expense")} $ </strong>
      </p>
      <p>
        Balance : <strong> {calculateBalance()} $</strong>
      </p>
    </div>
  );
};

export default Summary;
