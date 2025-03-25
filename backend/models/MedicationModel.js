const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
});

const MedicationModel = mongoose.model('Medication', MedicationSchema);

module.exports = MedicationModel;
