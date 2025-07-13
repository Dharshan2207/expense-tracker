import { useEffect, useState } from 'react';
import './ExpenseTable.css';

function ExpensesList() {
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    fetch('/api/expenses')
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch(() => setExpenses([]));
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await fetch(`/api/expenses/${selectedId}`, { method: 'DELETE' });
    setExpenses(expenses.filter((e) => e.id !== selectedId));
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const handleDeleteAll = async () => {
    await fetch(`/api/expenses`, { method: 'DELETE' });
    setExpenses([]);
    setShowDeleteAllModal(false);
  };

  const openEditModal = (expense) => {
    setSelectedId(expense.id);
    setEditedExpense({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    await fetch(`/api/expenses/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editedExpense, date: new Date().toISOString().split('T')[0], username: 'dharshan' }),
    });
    fetchExpenses();
    setShowEditModal(false);
    setSelectedId(null);
  };

  const getFilteredSortedExpenses = () => {
    let sorted = [...expenses];
    switch (sortOption) {
      case 'newest': sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'oldest': sorted.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'high': sorted.sort((a, b) => b.amount - a.amount); break;
      case 'low': sorted.sort((a, b) => a.amount - b.amount); break;
      default: break;
    }
    return sorted.filter((e) =>
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="expenses-table-container">
      <div className="expenses-header">
        <h2>All Expenses 🧾</h2>
        {expenses.length > 0 && (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Search by title..."
              className="sort-dropdown"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="newest">Date: Newest → Oldest</option>
              <option value="oldest">Date: Oldest → Newest</option>
              <option value="high">Amount: High → Low</option>
              <option value="low">Amount: Low → High</option>
            </select>
          </div>
        )}
      </div>

      {getFilteredSortedExpenses().length === 0 ? (
        <div className="expenses-empty">
          No expense added, go and add expenses quick and save like a king 👑
        </div>
      ) : (
        <>
          <table className="expenses-table">
            <thead>
              <tr>
                <th className="expenses-th">#</th>
                <th className="expenses-th">Description</th>
                <th className="expenses-th">Amount</th>
                <th className="expenses-th">Category</th>
                <th className="expenses-th">Date</th>
                <th className="expenses-th">Delete</th>
                <th className="expenses-th">Edit</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredSortedExpenses().map((ex, idx) => (
                <tr key={ex.id}>
                  <td className="expenses-td">{idx + 1}</td>
                  <td className="expenses-td">{ex.description}</td>
                  <td className="expenses-td">₹{ex.amount}</td>
                  <td className="expenses-td">{ex.category}</td>
                  <td className="expenses-td">{ex.date}</td>
                  <td className="expenses-td">
                    <button onClick={() => confirmDelete(ex.id)} className="delete-btn">🗑️</button>
                  </td>
                  <td className="expenses-td">
                    <button onClick={() => openEditModal(ex)} className="edit-btn">✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="actions-container">
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="delete-btn"
              style={{ backgroundColor: "#111", padding: "10px 18px" }}
            >
              🧹 Delete All Expenses
            </button>

            <button
              className="analytics-btn"
              onClick={() => window.location.href = "/analytics"}
            >
              📊 View Analytics
            </button>
          </div>
        </>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this expense? ⚠️</p>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="confirm-btn">Yes</button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteAllModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete <b>all expenses</b>? 🧨</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteAll} className="confirm-btn">Yes</button>
              <button onClick={() => setShowDeleteAllModal(false)} className="cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Edit Expense ✍️</p>
            <input
              placeholder="Description"
              value={editedExpense.description}
              onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
            />
            <input
              placeholder="Amount"
              type="number"
              value={editedExpense.amount}
              onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
            />
            <input
              placeholder="Category"
              value={editedExpense.category}
              onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleEditSubmit} className="confirm-btn">Update</button>
              <button onClick={() => setShowEditModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpensesList;
