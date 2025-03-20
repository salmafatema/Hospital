const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Card', 'Insurance', 'Bank Transfer'],
    default: 'Cash'
  },
  paymentDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
