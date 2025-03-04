// Import React and useState from the 'react' library.
import React, { useState, useEffect } from 'react';

// Import axios for making HTTP requests to the backend.
import axios from 'axios';

// Define the TransactionHistory component as a function.
function TransactionHistory() {
  // Use useState to store transaction data.
  const [transactions, setTransactions] = useState([]);

  // Use useEffect to fetch transactions when the component mounts.
  useEffect(() => {
    axios.get('http://localhost:3000/api/transactions')
      .then(response => {
        // Update the transactions state with the fetched data.
        setTransactions(response.data);
      })
      .catch(error => {
        // Log any errors to the console.
        console.error(error);
      });
  }, []);

  // Return the JSX for displaying transaction history.
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <span>{transaction.amount}</span>
            <span>{transaction.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export the TransactionHistory component.
export default TransactionHistory;
