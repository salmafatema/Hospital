const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  testDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  results: {
    type: Map,
    of: String,
    default: null
  },
  referenceRanges: {
    type: Map,
    of: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Laboratory', laboratorySchema);
