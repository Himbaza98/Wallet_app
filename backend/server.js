const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Transaction = require('./models/transactions'); // Import the Transaction schema

const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from environment variables

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.mongoURI; // MongoDB Atlas URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB locally'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Transactions API!');
});

// API Routes

// 1. Add a new transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = new Transaction(req.body); // Create a new transaction document
    await transaction.save(); // Save the transaction to MongoDB
    res.status(201).send(transaction); // Respond with the saved transaction
  } catch (err) {
    console.error('Error saving transaction:', err); // Log error details
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

// 3. Get transactions by account type
app.get('/api/transactions/account/:type', async (req, res) => {
  try {
    const accountType = req.params.type; // Get account type from URL params
    const transactions = await Transaction.find({ accountType }); // Filter by account type
    res.status(200).send(transactions);
  } catch (err) {
    res.status(400).send({ error: 'Failed to fetch transactions by account type', details: err });
  }
});

// 4. Fetch transactions within a date range
app.get('/api/transactions/range', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    res.status(200).send(transactions);
  } catch (err) {
    res.status(400).send({ error: 'Failed to fetch transactions', details: err });
  }
});

// Start the server
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
});
