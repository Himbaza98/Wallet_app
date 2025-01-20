const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: { type: String, required: true },
  category: {
    type: String,
    required: function () { return this.type === 'Expense'; } // Conditionally required
  },
  subcategory: {
    type: String,
    required: function () { return this.type === 'Expense'; } // Conditionally required
  },
  accountType: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
