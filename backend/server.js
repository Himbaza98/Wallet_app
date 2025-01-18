// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Transaction = require('./models/Transaction'); // Import the Transaction schema

// Initialize the Express app
const app = express();
const PORT = 5000; // Port number for the server

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Allow cross-origin requests

// MongoDB connection string (update <your_connection_string> with your MongoDB URI)
const mongoURI = 'mongodb://127.0.0.1:27017/wallet-app'; // Local MongoDB database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes

// 1. Add a new transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = new Transaction(req.body); // Create a new transaction document
    await transaction.save(); // Save the transaction to MongoDB
    res.status(201).send(transaction); // Respond with the saved transaction
  } catch (err) {
    res.status(400).send({ error: 'Failed to save transaction', details: err });
  }
});

// 2. Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Fetch all transactions from MongoDB
    res.status(200).send(transactions); // Respond with the transactions
  } catch (err) {
    res.status(400).send({ error: 'Failed to fetch transactions', details: err });
  }
});

// 3. Get transactions by account type (optional filter)
app.get('/api/transactions/account/:type', async (req, res) => {
  try {
    const accountType = req.params.type; // Get account type from URL params
    const transactions = await Transaction.find({ accountType }); // Filter by account type
    res.status(200).send(transactions);
  } catch (err) {
    res.status(400).send({ error: 'Failed to fetch transactions by account type', details: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
