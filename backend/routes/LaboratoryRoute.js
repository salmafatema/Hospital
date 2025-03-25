const express = require('express');
const router = express.Router();
const Laboratory = require('../models/LaboratoryModel');

// Get all laboratory tests
router.get('/', async (req, res) => {
  try {
    const tests = await Laboratory.find().sort({ testDate: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new laboratory test
router.post('/', async (req, res) => {
  const test = new Laboratory({
    testName: req.body.testName,
    patientName: req.body.patientName,
    testDate: req.body.testDate,
    status: req.body.status,
    results: req.body.results,
    referenceRanges: req.body.referenceRanges
  });

  try {
    const newTest = await test.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
