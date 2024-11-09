import React, { useState } from 'react';
import backgroundImage from '../assets/4.jpg'; // Import the image

const Wallets = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState({ food: 0, accommodation: 0, transport: 0 });
  const [totalSpent, setTotalSpent] = useState(0);

  const colors = ['#FFEBEE', '#E8F5E9', '#FFF3E0', '#E3F2FD', '#F3E5F5', '#FFECB3'];

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = { amount: parseFloat(amount), category, description, date: new Date().toLocaleDateString() };
    setExpenses([...expenses, newExpense]);
    setTotalSpent(totalSpent + parseFloat(amount));
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const handleBudgetChange = (category) => (e) => {
    setBudget({ ...budget, [category]: parseFloat(e.target.value) });
  };

  const calculateBudgetUsed = (category) => {
    return expenses.filter(exp => exp.category === category).reduce((acc, exp) => acc + exp.amount, 0);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        color: '#00008B',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h1>Travel Wallet</h1>
        <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'row',color: '#00008B', gap: '10px', marginBottom: '10px' }}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ flex: 1, padding: '15px',color: '#00008B', fontSize: '16px', minWidth: '150px' }} // Increased padding and font size
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required style={{ padding: '10px', fontSize: '16px' }}>
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="accommodation">Accommodation</option>
              <option value="transport">Transport</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ flex: 1, padding: '15px',color: '#B0E0E6', fontSize: '16px', minWidth: '150px' }} // Increased padding and font size
            />
            <button type="submit" style={{
              backgroundColor: '#007BFF',
              color: '#00008B',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Add Expense</button>
          </div>
        </form>
      </div>

      <div style={{ marginBottom: '20px',color: '#00008B', width: '100%', maxWidth: '600px' }}>
        <h2>Budgeting Tool</h2>
        <div style={{ display: 'flex',color: '#00008B', flexDirection: 'column', gap: '10px' }}>
          {['food', 'accommodation', 'transport'].map((cat) => (
            <div key={cat} style={{ display: 'flex', flexDirection: 'row',color: '#00008B', justifyContent: 'space-between', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px' }}>
              <label>{cat.charAt(0).toUpperCase() + cat.slice(1)} Budget:</label>
              <input
                type="number"
                onChange={handleBudgetChange(cat)}
                placeholder="Set Budget"
                style={{ padding: '5px',color: '#00008B', fontSize: '16px' }} // Adjusted font size for consistency
              />
              <p>Spent: {calculateBudgetUsed(cat)} / {budget[cat]}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2>Expense Summary</h2>
        <p>Total Spent: ${totalSpent.toFixed(2)}</p>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
          {expenses.map((exp, index) => (
            <div key={index} style={{
              backgroundColor: colors[index % colors.length],
              padding: '10px',
              borderRadius: '5px',
              minWidth: '150px',
              textAlign: 'center',
              flex: '1 1 150px'
            }}>
              <p>Date: {exp.date}</p>
              <p>Amount: ${exp.amount}</p>
              <p>Category: {exp.category}</p>
              <p>Description: {exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallets;
