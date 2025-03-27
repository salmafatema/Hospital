const express = require('express');
const router = express.Router();
const Emergency = require('../models/EmergencyModel');

// Get all emergency patients
router.get('/emergency', async (req, res) => {
    try {
        const patients = await Emergency.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new emergency patient
router.post('/emergency', async (req, res) => {
    const patient = new Emergency({
        patientId: req.body.patientId,
        name: req.body.name,
        age: req.body.age,
        diagnosis: req.body.diagnosis,
        status: req.body.status,
        bedNumber: req.body.bedNumber,
        admissionDate: req.body.admissionDate
    });

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
