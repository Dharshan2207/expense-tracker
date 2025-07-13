import { useEffect, useState } from 'react';
import './Analytics.css';

function AnalyticsPage() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [highest, setHighest] = useState(null);
  const [recent, setRecent] = useState(null);
  const [avgPerDay, setAvgPerDay] = useState(0);

  useEffect(() => {
    fetch('/api/expenses')
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        calculateStats(data);
      });
  }, []);

  const calculateStats = (data) => {
    let totalAmount = 0;
    let highestExpense = null;
    let latestExpense = null;
    const dateSet = new Set();

    data.forEach((ex) => {
      totalAmount += ex.amount;
      if (!highestExpense || ex.amount > highestExpense.amount) {
        highestExpense = ex;
      }
      if (!latestExpense || new Date(ex.date) > new Date(latestExpense.date)) {
        latestExpense = ex;
      }
      dateSet.add(ex.date);
    });

    setTotal(totalAmount);
    setHighest(highestExpense);
    setRecent(latestExpense);
    setAvgPerDay(dateSet.size > 0 ? (totalAmount / dateSet.size).toFixed(2) : 0);
  };

  return (
    <div className="analytics-container">
      <h2>📊 Expense Analytics</h2>

      <div className="analytics-summary">
        <div className="analytics-card highlight-card">
          <h4>Total Expenses</h4>
          <p className="amount">₹{total}</p>
        </div>

        {highest && (
          <div className="analytics-card">
            <h4>Highest Spending</h4>
            <p>{highest.category} — ₹{highest.amount}</p>
          </div>
        )}

        {recent && (
          <div className="analytics-card">
            <h4>Most Recent</h4>
            <p>{recent.description} — ₹{recent.amount}</p>
            <div className="extra-info">🗓️ {recent.date}</div>
          </div>
        )}

        <div className="analytics-card">
          <h4>Avg Spend/Day</h4>
          <p>₹{avgPerDay}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
