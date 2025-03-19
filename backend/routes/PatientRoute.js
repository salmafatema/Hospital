const express = require('express');
const router = express.Router(); 
const Patient = require('../models/PatientModel'); 

const app = express();

// POST 
router.post('/patients', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully', data: newPatient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET 
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
