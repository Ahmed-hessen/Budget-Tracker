import React from "react";

const ExpenseForm = ({
  amount,
  amountType,
  category,
  date,
  description,
  onAmountChange,
  onAmountTypeChange,
  onCategoryChange,
  onDateChange,
  onDescriptionChange,
  onSubmit,
  onCancelEdit,
  editingRecordId,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Amount Type:
        <select
          value={amountType}
          onChange={(e) => onAmountTypeChange(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label>
          Amount:
          <input
            type="number"
            value={amount === "expense" ? Math.abs(amount) : amount}
            onChange={(e) =>
              onAmountChange(
                amountType === "expense"
                  ? Math.abs(e.target.value)
                  : e.target.value
              )
            }
          />
        </label>
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </label>
      <button type="submit">
        {editingRecordId !== null ? "Edit Record" : "Add Record"}
      </button>
      {editingRecordId !== null && (
        <button type="button" onClick={onCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
