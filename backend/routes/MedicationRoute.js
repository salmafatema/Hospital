const express = require('express');
const MedicationModel = require('../models/MedicationModel');

const router = express.Router();

// GET all medications
router.get('/medications', async (req, res) => {
  try {
    const medications = await MedicationModel.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications', error });
  }
});

// POST a new medication
router.post('/medications', async (req, res) => {
  const { name, dosage, quantity, category, price, expiryDate } = req.body;

  const newMedication = new MedicationModel({
    name,
    dosage,
    quantity,
    category,
    price,
    expiryDate,
  });

  try {
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(400).json({ message: 'Error saving medication', error });
  }
});

module.exports = router;
