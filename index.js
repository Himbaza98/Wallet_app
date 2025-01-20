const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  accountType: String,
  amount: Number,
  date: Date
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Endpoint to add transaction
app.post('/api/transactions', (req, res) => {
  const { category, subcategory, accountType, amount, date } = req.body;

  const newTransaction = new Transaction({
    category,
    subcategory,
    accountType,
    amount,
    date
  });

  newTransaction.save()
    .then(() => res.status(201).json({ message: 'Transaction saved successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
