import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/Form";
import Summary from "./components/Summary";
import Record from "./components/Record";

const App = () => {
  const [records, setRecords] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [amountType, setAmountType] = useState("income");

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const savedRecords =
      JSON.parse(localStorage.getItem("expenseRecords")) || [];
    setRecords(savedRecords);
  };

  const handleEditRecord = (id) => {
    const recordToEdit = records.find((record) => record.id === id);
    setAmountType(recordToEdit.amountType);
    setAmount(Math.abs(recordToEdit.amount));
    setCategory(recordToEdit.category);
    setDate(recordToEdit.date);
    setDescription(recordToEdit.description);
    setEditingRecordId(id);
  };

  const handleCancelEdit = () => {
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setEditingRecordId(null);
  };

  const handleDeleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    saveRecordsToLocalStorage(updatedRecords);
  };

  const calculateTotal = (type) => {
    const total = records
      .filter((record) =>
        type === "income" ? record.amount > 0 : record.amount < 0
      )
      .reduce((acc, record) => acc + Math.abs(record.amount), 0);

    return total.toFixed(2);
  };

  const calculateBalance = () => {
    const incomeTotal = parseFloat(calculateTotal("income"));
    const expenseTotal = parseFloat(calculateTotal("expense"));

    return (incomeTotal - expenseTotal).toFixed(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (amount <= 0 || isNaN(amount) || !date) {
      alert("Invalid input. Please check your entries.");
      return;
    }

    if (editingRecordId !== null) {
      const updatedRecords = records.map((record) => {
        if (record.id === editingRecordId) {
          return {
            ...record,
            amount:
              amountType === "income" ? Math.abs(+amount) : -Math.abs(+amount),
            category,
            date,
            description,
          };
        }
        return record;
      });
      setRecords(updatedRecords);
      saveRecordsToLocalStorage(updatedRecords);
      handleCancelEdit();
    } else {
      const newRecord = {
        id: Date.now(),
        amount:
          amountType === "income" ? Math.abs(+amount) : -Math.abs(+amount),
        category,
        date,
        description,
      };

      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      saveRecordsToLocalStorage(updatedRecords);
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
    }
  };

  const saveRecordsToLocalStorage = (records) => {
    localStorage.setItem("expenseRecords", JSON.stringify(records));
  };

  return (
    <div className="container">
      <h1>Personal Budget Tracker</h1>
      <ExpenseForm
        amount={amount}
        amountType={amountType}
        category={category}
        date={date}
        description={description}
        onAmountChange={setAmount}
        onAmountTypeChange={setAmountType}
        onCategoryChange={setCategory}
        onDateChange={setDate}
        onDescriptionChange={setDescription}
        onSubmit={handleFormSubmit}
        onCancelEdit={handleCancelEdit}
        editingRecordId={editingRecordId}
      />

      {records.length !== 0 && (
        <div id="records">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <Record
                  key={record.id}
                  record={record}
                  onEdit={handleEditRecord}
                  onDelete={handleDeleteRecord}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {records.length !== 0 && (
        <Summary
          calculateTotal={calculateTotal}
          calculateBalance={calculateBalance}
        />
      )}
    </div>
  );
};

export default App;
