import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ExpensesList from './ExpensesList';
import AnalyticsPage from './AnalyticsPage'; // 🆕 Import the analytics page
import './App.css';
import './ExpenseTable.css';

function Home() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = async () => {
    if (!title.trim() || !amount.trim() || !category.trim()) {
      alert("Please fill all fields! 🚫");
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Amount must be a positive number! 💸");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const expense = {
      description: title,
      amount: parseFloat(amount),
      category,
      date: today,
      username: "dharshan"
    };

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });

      if (res.ok) {
        alert('Expense added ✅');
        setTitle('');
        setAmount('');
        setCategory('');
      } else {
        alert('Failed to add ❌');
      }
    } catch (error) {
      alert('Error connecting to backend 🚫');
    }
  };

  return (
    <div className="center-box">
      <h1>Expense Tracker 🪙</h1>
      <div className="sub-text">Add your expense below 👇</div>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleAdd}>Add Expense</button>

      <div style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/expenses" style={{ textDecoration: "none", color: "#226622", fontWeight: "bold" }}>
          👁️ View All Expenses
        </Link>
        <Link to="/analytics" style={{ textDecoration: "none", color: "#3498db", fontWeight: "bold" }}>
          📊 View Analytics
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<ExpensesList />} />
        <Route path="/analytics" element={<AnalyticsPage />} /> {/* 🆕 Route added */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
