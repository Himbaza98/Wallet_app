const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  accountType: { type: String, required: true }, // Bank, Mobile Money, Cash, etc.
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
